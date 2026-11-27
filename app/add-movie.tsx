import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  View, TextInput, FlatList, Text, TouchableOpacity, 
  Image, ActivityIndicator, Alert, Keyboard, StyleSheet, useColorScheme, Modal, ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useMovieStore, Movie, ThemeMode } from '../src/store';
import { s } from '../src/styles/add-movie.styles';
import { styles as mainStyles } from '../src/styles/styles';
import { Colors } from '../src/styles/colors';
import { ThemeModal } from '../src/components/ThemeModal/ThemeModal';
import { SegmentedFilter } from '../src/components/SegmentedFilter/SegmentedFilter';
import { DropdownSelector } from '../src/components/DropdownSelector/DropdownSelector';
import { SearchBar } from '../src/components/SearchBar/SearchBar';
import { AddMovieButton } from '../src/components/AddMovieButton/AddMovieButton';
import { useHaptics } from '../src/components/VibrationToggle/useHaptics';

const API_KEY = '31G33ZE-HJ74C2S-GCB9SME-QMZCXZ0'; 
const BASE_URL = 'https://api.poiskkino.dev/';

const searchCache = new Map<string, any[]>();
export default function AddMovieScreen() {
  const router = useRouter();
  const systemColorScheme = useColorScheme();
  const { movies, addMovie, apiLimits, useToken, resetTokens, theme, setTheme } = useMovieStore();

  const isVibrationEnabled = useMovieStore((state) => state.isVibrationEnabled);
  const { triggerLight } = useHaptics(isVibrationEnabled);

  const handleBack = async () => {
    await triggerLight(); // Легкий тактильный клик
    router.back();        // Возврат на предыдущий экран
  };
  
  // ОПРЕДЕЛЕНИЕ ТЕМЫ
  const currentMode = theme === 'system' ? (systemColorScheme || 'dark') : theme;
  const isDark = currentMode === 'dark';
  const themeColors = isDark ? Colors.dark : Colors.light;

  const [query, setQuery] = useState('');
  const [type, setType] = useState<'all' | 'movie' | 'series'>('all');
  const [searchMode, setSearchMode] = useState<'auto' | 'manual'>('manual');
  const [rawResults, setRawResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  


  
  const abortController = useRef<AbortController | null>(null);

  const checkAndGetTokens = () => {
    const now = new Date();
    const mskDateStr = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Moscow', year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(now);

    if (mskDateStr !== apiLimits.lastResetDate.split('T')[0]) {
      resetTokens();
      return 200;
    }
    return apiLimits.remaining;
  };

  useEffect(() => {
    if (query.trim().length < 3) {
      setRawResults([]);
      setHasSearched(false);
      return;
    }
    if (searchMode === 'auto') {
      const timer = setTimeout(() => performSearch(query), 1000);
      return () => clearTimeout(timer);
    }
  }, [query, searchMode]);

  useEffect(() => {
    // Сработает один раз при открытии экрана поиска
    checkAndGetTokens();
  }, []); 

  const performSearch = async (text: string) => {
    const queryKey = text.trim().toLowerCase(); // Приводим к нижнему регистру для точности
    if (queryKey.length < 3) return;

    // 🎯 1. ПРОВЕРЯЕМ КЭШ: если уже искали это слово, берем из памяти
    if (searchCache.has(queryKey)) {
      setRawResults(searchCache.get(queryKey) || []);
      setHasSearched(true);
      setError(null);
      Keyboard.dismiss();
      return; // Прерываем функцию, запрос на сервер не пойдет
    }

    const remaining = checkAndGetTokens();
    if (remaining <= 0) {
      setError('Лимит запросов исчерпан');
      return;
    }

    if (abortController.current) abortController.current.abort();
    abortController.current = new AbortController();

    setLoading(true);
    setError(null);
    setHasSearched(true);
    Keyboard.dismiss();

    try {
      const url = `${BASE_URL}v1.4/movie/search?query=${encodeURIComponent(text)}&limit=200`;
      const response = await fetch(url, {
        method: 'GET',
        signal: abortController.current.signal,
        headers: { 'Accept': 'application/json', 'X-API-KEY': API_KEY },
      });

      if (!response.ok) throw new Error('Ошибка API');
      const data = await response.json();
      
      const docs = data.docs || [];
      
      // 🎯 2. СОХРАНЯЕМ В КЭШ: записываем результат для этого поискового слова
      searchCache.set(queryKey, docs);
      
      setRawResults(docs);
      useToken();
    } catch (e: any) {
      if (e.name !== 'AbortError') setError('Сетевая ошибка');
    } finally {
      setLoading(false);
    }
  };


  const displayResults = useMemo(() => {
    return rawResults.filter((item: any) => {
      // 1. Фильтр "Все/Фильмы/Сериалы"
      if (type !== 'all') {
        const t = item.type?.toLowerCase() || '';
        const isSeries = t.includes('series') || t.includes('show') || t === 'anime';
        const matchesType = type === 'series' ? isSeries : !isSeries;
        if (!matchesType) return false;
      }

      // 2. Фильтр по жанрам
      if (selectedGenre !== '') {
        const hasGenre = item.genres?.some((g: any) => g.name?.toLowerCase() === selectedGenre.toLowerCase());
        if (!hasGenre) return false;
      }

      // 3. Фильтр по странам
      if (selectedCountry !== '') {
        const hasCountry = item.countries?.some((c: any) => c.name?.toLowerCase() === selectedCountry.toLowerCase());
        if (!hasCountry) return false;
      }

      return true;
    });
  }, [rawResults, type, selectedGenre, selectedCountry]);


  return (
    <View style={[s.container, { backgroundColor: themeColors.background }]}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={[s.headerWrapper, { backgroundColor: themeColors.background, borderBottomColor: themeColors.border }]}>
          <View style={[s.header, { marginBottom: 15 }]} > 
            <TouchableOpacity 
              onPress={handleBack} // 🎯 Заменили на функцию с виброоткликом
              activeOpacity={0.7}   // Добавили для более приятного визуального отклика
              style={[
                s.wideBackBtn, 
                { 
                  backgroundColor: themeColors.accent,
                  shadowColor: themeColors.accent,
                }
              ]}
            >
              <Ionicons 
                name="arrow-back" 
                size={18} 
                color={isDark ? '#000' : '#fff'} 
                style={{ marginRight: 4 }}
              />
              <Text style={[s.wideBackBtnText, { color: isDark ? '#000' : '#fff' }]}>
                Назад
              </Text>
            </TouchableOpacity>
            <Text style={[s.headerTitle, { color: themeColors.text }]}>Поиск кино</Text>
            <View style={{ width: 50 }} />
            <TouchableOpacity onPress={() => setSettingsVisible(true)} style={{ padding: 5 }}>
              <Ionicons name="settings-outline" size={24} color={themeColors.text} />
            </TouchableOpacity>
            </View>

          {/* Переключатель на странице поиска */}
          <View style={{ marginBottom: 10 }}> 
            <SegmentedFilter
              options={[
                { value: 'all', label: 'Все' },
                { value: 'movie', label: 'Фильмы' },
                { value: 'series', label: 'Сериалы' },
              ]}
              selectedValue={type}
              onSelect={(val) => setType(val)}
              isDark={isDark}
            />
          </View>

          <View style={{ marginBottom: 15 }}>
            <SegmentedFilter
              options={[
                { value: 'manual', label: 'По кнопке' },
                { value: 'auto', label: 'Авто' },
              ]}
              selectedValue={searchMode}
              onSelect={(val) => setSearchMode(val)}
              isDark={isDark}
            />
          </View>

          <View style={s.inputWrapper}>
            {/* СТРОКА ПОИСКА */}
              <SearchBar
                value={query}
                onChangeText={setQuery}
                onSubmit={() => performSearch(query)}
                isDark={isDark}
              />
            {/* КНОПКИ ВЫБОРА ЖАНРА И СТРАНЫ */}
              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 15, paddingHorizontal: 15, marginTop: 15, }}>
                <DropdownSelector
                  type="genre"
                  selectedValue={selectedGenre}
                  onSelect={setSelectedGenre}
                  isDark={isDark}
                />

                <DropdownSelector
                  type="country"
                  selectedValue={selectedCountry}
                  onSelect={setSelectedCountry}
                  isDark={isDark}
                />
              </View>

            <View style={s.limitContainer}>
              <Text style={[s.limitText, { color: isDark ? '#444' : '#8E8E93' }]}>
                Лимит запросов на поиск в бесплатной версии: <Text style={{fontWeight: 'bold', color: themeColors.accent}}>{apiLimits.remaining}</Text> <Text style={{color: isDark ? '#FFF' : '#000'}}>/ 200</Text>
              </Text>
              <View style={[s.limitBarBg, { backgroundColor: isDark ? '#1c1c1e' : '#E5E5EA' }]}>
                <View style={[
                  s.limitBarFill, 
                  { 
                    width: `${(apiLimits.remaining / 200) * 100}%`,
                    backgroundColor: themeColors.accent, // 🎯 Полоска теперь зеленая или синяя
                    // Тень для легкого свечения в темной теме
                    shadowColor: themeColors.accent,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: isDark ? 0.4 : 0,
                    shadowRadius: 4,
                  }
                ]} />
              </View>
            </View>

          </View>
        </View>

        {loading && <ActivityIndicator style={{marginTop: 20}} color="#007AFF" />}
        {error && <Text style={s.errorText}>{error}</Text>}

        <FlatList
          data={displayResults}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => {
            const isExist = movies.some(m => m.id === item.id.toString());
            
            const movieData = {
              id: item.id.toString(), 
              title: item.name || item.alternativeName, 
              year: item.year, 
              type, 
              status: 'unwatched', 
              poster: item.poster?.previewUrl, 
              createdAt: Date.now(),
              description: item.description, 
              ratingKP: item.rating?.kp, 
              ratingIMDb: item.rating?.imdb, 
              country: item.countries?.[0]?.name || '—', 
              genres: item.genres?.map((g: any) => g.name),
              duration: item.movieLength || item.seriesLength, 
              season: type === 'series' ? 1 : undefined, 
              episode: type === 'series' ? 1 : undefined,
            };

            return (
              <TouchableOpacity 
                style={[mainStyles.movieItem, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]} 
                onPress={() => {
                  router.push({ pathname: "/movie/[id]", params: { id: movieData.id, previewData: JSON.stringify(movieData) } } as any);
                }}
              >
                {item.poster?.previewUrl ? (
                  <Image source={{ uri: item.poster.previewUrl }} style={StyleSheet.absoluteFillObject} blurRadius={15} />
                ) : (
                  <View style={type === 'series' ? mainStyles.gradientSeries : mainStyles.gradientMovie} />
                )}
                
                <View style={[mainStyles.cardContent, { backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)' }]}>
                  <Image source={{ uri: item.poster?.previewUrl || 'https://placeholder.com' }} style={mainStyles.miniPoster} />
                  
                  <View style={mainStyles.movieInfo}>
                    <Text style={[mainStyles.movieTitle, { color: themeColors.text }]} numberOfLines={2}>{item.name || item.alternativeName}</Text>
                    <Text style={[mainStyles.movieYearText, { color: isDark ? '#aaa' : '#666' }]}>{item.year} год</Text>
                    <Text style={{ 
                      color: isDark ? '#f1c40f' : '#d69e00', // 🎯 Темный желтый для светлой темы
                      fontWeight: 'bold', 
                      marginTop: 4 
                    }}>
                      ★ {item.rating?.kp?.toFixed(1) || '0.0'}
                    </Text>
                  </View>
                  <View style={{ width: 10 }} />
                  <AddMovieButton
                    isExist={isExist}
                    isDark={isDark}
                    accentColor={themeColors.accent}
                    movieTitle={movieData.title} // 🎯 ДОБАВЬ ЭТУ СТРОКУ
                    onPress={() => addMovie(movieData as any)}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => {
            if (loading || !hasSearched) return null;
            return <Text style={s.errorText}>Ничего не нашли</Text>;
          }}
        />

        <ThemeModal
          isVisible={settingsVisible}
          onClose={() => setSettingsVisible(false)}
          currentTheme={theme}
          onThemeChange={(newTheme) => setTheme(newTheme)}
          themeColors={themeColors}
          isDark={isDark}
        />
      </SafeAreaView>
    </View>
  );
}
