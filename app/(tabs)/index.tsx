import React, { useState, useMemo } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, useColorScheme, Keyboard 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { useMovieStore, Movie, MovieStatus } from '../../src/store';
import { styles } from '../../src/styles/styles';
import { Colors } from '../../src/styles/colors'; 

import { ProgressModal } from '../../src/components/ProgressModal/ProgressModal'; 
import { ThemeModal } from '../../src/components/ThemeModal/ThemeModal'; 
import { SegmentedFilter } from '../../src/components/SegmentedFilter/SegmentedFilter'; 
import { MovieCounter } from '../../src/components/MovieCounter/MovieCounter';
import { DropdownSelector } from '../../src/components/DropdownSelector/DropdownSelector';
import { SearchBar } from '../../src/components/SearchBar/SearchBar';
import { DeleteModal } from '../../src/components/DeleteModal/DeleteModal';
import { MovieCard } from '../../src/components/MovieCard/MovieCard';

export default function MovieListScreen() {
  const router = useRouter();
  const systemColorScheme = useColorScheme();

  // Состояния
  const [deletingMovieId, setDeletingMovieId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'movie' | 'series'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | MovieStatus>('all');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [editItem, setEditItem] = useState<Movie | null>(null);
  const [settingsVisible, setSettingsVisible] = useState(false);

  // Стор
  const { 
    movies, removeMovie, updateStatus, updateProgress, 
    incrementEpisode, theme, setTheme, isVibrationEnabled 
  } = useMovieStore();

  // Определение темы
  const currentMode = theme === 'system' ? (systemColorScheme || 'dark') : theme;
  const isDark = currentMode === 'dark';
  const themeColors = isDark ? Colors.dark : Colors.light;

  // Логика фильтрации
  const filtered = useMemo(() => {
    return movies
      .filter(m => {
        const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
        const matchesType = typeFilter === 'all' || m.type === typeFilter;
        const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
        const matchesGenre = selectedGenre === '' || m.genres?.some(g => g.toLowerCase() === selectedGenre.toLowerCase());
        const matchesCountry = selectedCountry === '' || m.country?.toLowerCase() === selectedCountry.toLowerCase();
        return matchesSearch && matchesType && matchesStatus && matchesGenre && matchesCountry;
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [search, movies, typeFilter, statusFilter, selectedGenre, selectedCountry]);

  // Вспомогательные функции
  const getNextStatus = (current: MovieStatus): MovieStatus => {
    if (current === 'unwatched') return 'watching';
    if (current === 'watching') return 'watched';
    return 'unwatched';
  };

  const handleRemove = (id: string) => {
    removeMovie(id);
    setDeletingMovieId(null);
  };

  // Обработчики кликов с вибрацией
  const handleToggleFilters = async () => {
    if (isVibrationEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowFilters(!showFilters);
  };

  const handleOpenSettings = async () => {
    if (isVibrationEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSettingsVisible(true);
  };

  const handleAddMoviePress = async () => {
    if (isVibrationEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push('/add-movie');
  };

  const handleTypeSelect = async (type: 'all' | 'movie' | 'series') => {
    if (isVibrationEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setTypeFilter(type);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
        
        {/* ХЕДЕР И ПОИСК */}
        <View style={[styles.searchContainer, { backgroundColor: themeColors.background }]}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            onSubmit={() => Keyboard.dismiss()}
            placeholder="Поиск по названию..."
            isDark={isDark}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: themeColors.text }}>Фильтры</Text>
          <TouchableOpacity style={{ padding: 8 }} onPress={handleToggleFilters}>
            <Ionicons 
              name={showFilters ? "funnel" : "funnel-outline"} 
              size={24} 
              color={showFilters ? themeColors.accent : (isDark ? '#666' : '#999')} 
            />
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View style={{ paddingBottom: 10 }}>
            <View style={[styles.filterWrapper, { backgroundColor: themeColors.background }]}>
              <SegmentedFilter
                options={[
                  { value: 'all', label: 'Все' },
                  { value: 'movie', label: 'Фильмы' },
                  { value: 'series', label: 'Сериалы' },
                ]}
                selectedValue={typeFilter}
                onSelect={handleTypeSelect}
                isDark={isDark}
              />
            </View>

            <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 15, marginTop: 10 }}>
              <DropdownSelector type="genre" selectedValue={selectedGenre} onSelect={setSelectedGenre} isDark={isDark} />
              <DropdownSelector type="country" selectedValue={selectedCountry} onSelect={setSelectedCountry} isDark={isDark} />
            </View>

            <MovieCounter isDark={isDark} onStatusSelect={setStatusFilter} />
          </View>
        )}

        {/* СПИСОК ФИЛЬМОВ */}
        <FlatList
          data={filtered}
          contentContainerStyle={{ paddingBottom: 160 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MovieCard
              item={item}
              isDark={isDark}
              themeColors={themeColors}
              onPress={() => router.push(`/movie/${item.id}` as any)}
              onDelete={(id) => setDeletingMovieId(id)}
              onEditProgress={setEditItem}
              onIncrement={incrementEpisode}
              onStatusChange={(id, current) => updateStatus(id, getNextStatus(current))}
            />
          )}
        />

        {/* КНОПКИ УПРАВЛЕНИЯ */}
        <TouchableOpacity style={styles.settingsFab} onPress={handleOpenSettings}>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.fab, { 
            backgroundColor: themeColors.accent, 
            shadowColor: themeColors.accent,
            borderColor: isDark ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.4)' 
          }]} 
          onPress={handleAddMoviePress}
        >
          <Ionicons name="add" size={35} color={isDark ? '#000' : '#fff'} />
        </TouchableOpacity>

        {/* МОДАЛКИ */}
        <ThemeModal
          isVisible={settingsVisible}
          onClose={() => setSettingsVisible(false)}
          currentTheme={theme}
          onThemeChange={(m) => setTheme(m)}
          themeColors={themeColors}
          isDark={isDark}                
        />

        <ProgressModal
          isVisible={Boolean(editItem)}
          onClose={() => setEditItem(null)}
          onSave={(movieId, updatedSeason, updatedEpisode) => {
            updateProgress(movieId, updatedSeason, updatedEpisode);
            setEditItem(null);
          }}
          movieId={editItem?.id || ''}
          initialSeason={editItem?.season || 1} 
          initialEpisode={editItem?.episode || 1}
          themeColors={{ text: themeColors.text }}
          isDark={isDark}
        />

        <DeleteModal
          movieId={deletingMovieId}
          onClose={() => setDeletingMovieId(null)}
          onConfirm={handleRemove}
          isDark={isDark}
          themeColors={themeColors}
        />

      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
