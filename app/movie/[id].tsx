import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  TextInput,
  Alert,
  useColorScheme
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useMovieStore, Movie, MovieStatus, ThemeMode } from '../../src/store';
import { s } from '../../src/styles/movie-details.styles';
import { Colors } from '../../src/styles/colors';
import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';
import { MovieStatusBadge } from '../../src/components/MovieStatusBadge/MovieStatusBadge'; 
import { ProgressModal } from '../../src/components/ProgressModal/ProgressModal'; 
import { ThemeModal } from '../../src/components/ThemeModal/ThemeModal';
import { ReviewModal } from '../../src/components/ReviewModal/ReviewModal';
import { SuccessModal } from '../../src/components/SuccessModal/SuccessModal';
import { DeleteModal } from '../../src/components/DeleteModal/DeleteModal';

export default function MovieDetailsScreen() {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [previewStatus, setPreviewStatus] = useState<MovieStatus>('unwatched');
  const [previewSeason, setPreviewSeason] = useState(1);
  const [previewEpisode, setPreviewEpisode] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { id, previewData } = useLocalSearchParams();
  const router = useRouter();
  const systemColorScheme = useColorScheme();
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  // Достаем всё нужное из стора
  const { movies, addMovie, updateStatus, updateProgress, theme, updateWatchUrl, setTheme, removeMovie, updateUserReview } = useMovieStore();
  const [urlModalVisible, setUrlModalVisible] = useState(false);
  
  // Стейты для модалки
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 🎯 ПЕРЕНЕСЛИ СЮДА К ОСТАЛЬНЫМ ХУКАМ. Значение по умолчанию — пустая строка.
  const [tempUrl, setTempUrl] = useState(''); 

  // 1. Ищем в сохраненных
  const storedMovie = movies.find((m) => m.id === id);
  // 2. Либо парсим из превью
  const previewMovie = useMemo(() => {
    if (previewData) {
      try {
        return JSON.parse(previewData as string) as Movie;
      } catch (e) {
        return null;
      }
    }
    return null;
  }, [previewData]);

  const movie = storedMovie || previewMovie;

  // Эффект для заполнения данных при загрузке movie
  useMemo(() => {
    if (movie) {
      setPreviewStatus(movie.status || 'unwatched');
      setPreviewSeason(movie.season || 1);
      setPreviewEpisode(movie.episode || 1);
      setTempUrl(movie.watchUrl || ''); // 🎯 Заполняем tempUrl здесь
    }
  }, [movie?.id]);


  // 🛑 ОДИН ЕДИНСТВЕННЫЙ РАННИЙ ВЫХОД ДЛЯ ВСЕГО КОДА НИЖЕ
  if (!movie) return null;


  const isPreview = !storedMovie;

  const handleConfirmDelete = () => {
    removeMovie(movie.id);
    setIsDeleting(false);
    // Здесь можно либо сразу router.replace('/(tabs)'), 
    // либо сначала показать SuccessModal с текстом "Удалено"
    router.replace('/(tabs)');
  };

  // 1. ПЕРЕЙТИ
  const handleOpenLink = () => {
    if (movie.watchUrl) {
      Linking.openURL(movie.watchUrl).catch(() => Alert.alert("Ошибка", "Некорректная ссылка"));
    }
  };

  // 2. КОПИРОВАТЬ
  const handleCopy = async () => {
    await Clipboard.setStringAsync(movie.watchUrl || '');
    Alert.alert("Скопировано", "Ссылка сохранена в буфер обмена");
  };

  // 3. СОХРАНИТЬ
  const handleSaveUrl = () => {
    updateWatchUrl(movie.id, tempUrl);
    setUrlModalVisible(false);
  };
  
  // ОПРЕДЕЛЕНИЕ ТЕМЫ
  const currentMode = theme === 'system' ? (systemColorScheme || 'dark') : theme;
  const isDark = currentMode === 'dark';
  const themeColors = isDark ? Colors.dark : Colors.light;

  const handleStatusChange = () => {
    const nextStatus: MovieStatus = 
      previewStatus === 'unwatched' ? 'watching' : 
      previewStatus === 'watching' ? 'watched' : 'unwatched';

    if (isPreview) {
      setPreviewStatus(nextStatus);
    } else if (storedMovie) {
      updateStatus(storedMovie.id, nextStatus);
      setPreviewStatus(nextStatus); 
    }
  };

  const openEdit = () => {
    setIsModalVisible(true);
  };

  const handleAddAction = () => {
    if (isPreview && movie) {
      const movieToSave: Movie = {
        ...movie,
        status: previewStatus,
        season: previewSeason,
        episode: previewEpisode,
      };
      
      addMovie(movieToSave);
      
      // 🎯 Вместо Alert показываем нашу модалку
      setShowSuccess(true);

      // ⏱ Даем пользователю 1.5 секунды порадоваться и потом редиректим
      setTimeout(() => {
        setShowSuccess(false);
        router.replace('/(tabs)');
      }, 1500);
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* ФОНОВЫЙ БЛЮР */}
      <Image
        source={{ uri: movie.poster || 'https://placeholder.com' }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={Platform.OS === 'ios' ? 30 : 15}
      />
      
      {/* СЛОЙ ТЕМЫ ПОВЕРХ БЛЮРА */}
      <View style={[
        StyleSheet.absoluteFillObject, 
        { backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.5)' }
      ]} />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* ШАПКА */}
        <View style={s.header}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={[s.backBtn, !isDark && { backgroundColor: 'rgba(0,0,0,0.1)' }]}
          >
            <Ionicons name="arrow-back" size={24} color={isDark ? "#FFF" : "#000"} />
          </TouchableOpacity>
          <View style={{ width: 10 }} />
          <Text style={[s.headerTitle, { color: themeColors.text }]} numberOfLines={1}>
            {movie.title}
          </Text>
          
          <View style={{ width: 40 }} />
          <TouchableOpacity onPress={() => setSettingsVisible(true)} style={{ padding: 5 }}>
            <Ionicons name="settings-outline" size={24} color={themeColors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
          {/* ПОСТЕР */}
          <View style={s.posterShadow}>
            <Image source={{ uri: movie.poster }} style={s.bigPoster} />
          </View>
          
          <View style={[
            s.infoSection, 
            { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)' }
          ]}>
            <Text style={[s.title, { color: themeColors.text }]}>{movie.title}</Text>
            <Text style={[s.year, { color: isDark ? 'rgba(255,255,255,0.6)' : '#666' }]}>
              {movie.year} • {movie.country || 'Страна не указана'}
            </Text>
            <Text style={[s.subInfo, { color: isDark ? 'rgba(255,255,255,0.7)' : '#555' }]}>
              {movie.genres?.join(' • ')}
            </Text>
            {/* ОТОБРАЖЕНИЕ ВАШЕГО ОТЗЫВА */}
            {!isPreview && (
              <View style={{ marginTop: 15 }}>
                
                {/* ГЛАВНАЯ КНОПКА (В СТИЛЕ "УПРАВЛЯТЬ ССЫЛКОЙ") */}
                <TouchableOpacity 
                  style={[s.urlMainButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f2f2f7' }]}
                  onPress={() => setReviewModalVisible(true)}
                >
                  <Ionicons name="star" size={20} color="#f1c40f" />
                  <Text style={[s.urlMainText, { color: themeColors.text }]}>
                    {movie.userNotes || movie.userRating ? "УПРАВЛЯТЬ ОТЗЫВОМ" : "ДОБАВИТЬ ОТЗЫВ"}
                  </Text>
                </TouchableOpacity>

                {/* КАРТОЧКА С ТЕКСТОМ И ЗВЕЗДАМИ (показывается, если есть хоть какие-то данные) */}
                {(movie.userNotes || movie.userRating) ? (
                  <View style={{ 
                    marginTop: 12,
                    padding: 16, 
                    borderRadius: 16, 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#FFF',
                    borderWidth: 1,
                    borderColor: isDark ? '#2c2c2e' : '#e5e5ea',
                    // Тень для светлой темы
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: isDark ? 0 : 0.05,
                    shadowRadius: 5,
                    elevation: 2,
                  }}>
                    
                    {/* Верхняя часть карточки: Иконка кавычек и Звёзды */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <Ionicons name="book-outline" size={24} color={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} />
                      
                      {movie.userRating !== undefined && movie.userRating > 0 ? (
                        <View style={{ flexDirection: 'row', gap: 2 }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Ionicons 
                              key={star} 
                              name="star" 
                              size={16} 
                              color={star <= movie.userRating! ? '#f1c40f' : (isDark ? '#333' : '#e5e5ea')} 
                            />
                          ))}
                        </View>
                      ) : null}
                    </View>

                    {/* Текст отзыва */}
                    {movie.userNotes ? (
                      <Text style={{ 
                        color: themeColors.text, 
                        fontSize: 14, 
                        lineHeight: 22,
                        fontStyle: 'italic' 
                      }}>
                        «{movie.userNotes}»
                      </Text>
                    ) : (
                      <Text style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#999', fontSize: 14, fontStyle: 'italic' }}>
                        Оценка поставлена, но текст заметки не добавлен.
                      </Text>
                    )}
                  </View>
                ) : null}
                
              </View>
            )}

            {/* КНОПКА ВЫЗОВА МОДАЛКИ (в infoSection) */}
            <TouchableOpacity 
              style={[s.urlMainButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f2f2f7' }]}
              onPress={() => { setTempUrl(movie.watchUrl || ''); setUrlModalVisible(true); }}
            >
              <Ionicons 
                name="link" 
                size={20} 
                color={themeColors.accent} 
              />
              
              <Text 
                style={[s.urlMainText, { color: themeColors.text }]}
                numberOfLines={1} // 🎯 Обрезает длинную ссылку троеточием
              >
                {movie.watchUrl ? movie.watchUrl : "ДОБАВИТЬ ССЫЛКУ"}
              </Text>
            </TouchableOpacity>
            {/* СТАТИСТИКА / РЕЙТИНГИ */}
            <View style={s.rowStats}>
              <View style={s.statItem}>
                <Text style={[s.statLabel, { color: isDark ? 'rgba(255,255,255,0.5)' : '#999' }]}>КП</Text>
                <Text style={[s.statValue, { color: themeColors.text }]}>{movie.ratingKP?.toFixed(1) || '—'}</Text>
              </View>
              <View style={s.statItem}>
                <Text style={[s.statLabel, { color: isDark ? 'rgba(255,255,255,0.5)' : '#999' }]}>IMDb</Text>
                <Text style={[s.statValue, { color: themeColors.text }]}>{movie.ratingIMDb?.toFixed(1) || '—'}</Text>
              </View>
              {movie.type === 'movie' && movie.duration && (
                <View style={s.statItem}>
                  <Text style={[s.statLabel, { color: isDark ? 'rgba(255,255,255,0.5)' : '#999' }]}>ВРЕМЯ</Text>
                  <Text style={[s.statValue, { color: themeColors.text }]}>{movie.duration}м</Text>
                </View>
              )}
            </View>

              {/* СТАТУС */}
              <MovieStatusBadge 
                status={previewStatus} 
                onPress={handleStatusChange} 
                isDark={isDark} 
              />


                        {/* СЕРИИ */}
                        {movie.type === 'series' && (
              <TouchableOpacity 
                style={[
                  s.seriesEditBox, 
                  !isDark && { backgroundColor: '#f2f2f7', borderColor: '#ccc' }
                  // 🔓 Убрали полупрозрачность
                ]} 
                onPress={openEdit}
                // 🔓 Больше не блокируем нажатие
              >
                <View>
                  <Text style={[s.seriesLabel, { color: isDark ? 'rgba(255,255,255,0.5)' : '#999' }]}>ПРОГРЕСС:</Text>
                  <Text style={[s.seriesValue, { color: themeColors.text }]}>
                    Сезон {previewSeason}, Серия {previewEpisode}
                  </Text>
                </View>
                {/* 🔓 Иконка редактирования теперь видна всегда, когда можно менять данные */}
                <Ionicons name="create-outline" size={24} color={themeColors.accent} />
              </TouchableOpacity>
            )}

            {/* ОПИСАНИЕ */}
            {movie.description && (
              <View style={s.descriptionSection}>
                <Text style={[s.descriptionTitle, { color: themeColors.text }]}>О чем фильм</Text>
                <Text style={[s.descriptionText, { color: isDark ? 'rgba(255,255,255,0.8)' : '#333' }]}>
                  {movie.description}
                </Text>
              </View>
            )}
          </View>
          {/* РАЗДЕЛИТЕЛЬ */}
          {!isPreview && <View style={s.divider} />}

            {/* КНОПКА УДАЛЕНИЯ */}
              {!isPreview && (
                <>
                  <TouchableOpacity 
                    style={{ paddingVertical: 15, width: '100%', alignItems: 'center' }}
                    onPress={() => setIsDeleting(true)} // 🎯 Просто открываем нашу модалку
                  >
                    <Text style={{ color: '#ff4757', fontWeight: 'bold', fontSize: 16 }}>
                      Удалить из списка
                    </Text>
                  </TouchableOpacity>
              
                  <DeleteModal
                    movieId={isDeleting ? movie.id : null} // Передаем ID только если открыто
                    onClose={() => setIsDeleting(false)}
                    onConfirm={handleConfirmDelete}
                    isDark={isDark}
                    themeColors={themeColors}
                  />
                </>
              )}
        </ScrollView>

        {/* ПАНЕЛЬ ДОБАВЛЕНИЯ */}
        {isPreview && (
          <View style={[s.bottomActions, { backgroundColor: isDark ? 'rgba(15,15,15,0.9)' : 'rgba(255,255,255,0.9)' }]}>
            {storedMovie ? (
               <View style={[s.addButton, { backgroundColor: 'rgba(128,128,128,0.2)' }]} pointerEvents="none">
                 <Text style={[s.addButtonText, { color: '#888' }]}>УЖЕ В ВАШЕМ СПИСКЕ</Text>
               </View>
            ) : (
              <TouchableOpacity style={s.addButton} onPress={handleAddAction}>
                <Text style={s.addButtonText}>ДОБАВИТЬ В МОЙ СПИСОК</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {/* МОДАЛКА РЕЦЕНЗИИ И ОЦЕНКИ */}
        <ReviewModal
          isVisible={reviewModalVisible}
          onClose={() => setReviewModalVisible(false)}
          onSave={(updatedRating, updatedNotes) => {
            updateUserReview(movie.id, updatedRating, updatedNotes);
            setReviewModalVisible(false);
          }}
          initialRating={movie.userRating || 0}
          initialNotes={movie.userNotes || ''}
          isDark={isDark}
        />

        {/* 4. САМА МОДАЛКА ТЕМЫ */}
        <ThemeModal
          isVisible={settingsVisible}
          onClose={() => setSettingsVisible(false)}
          currentTheme={theme}
          onThemeChange={(newTheme) => setTheme(newTheme)}
          themeColors={themeColors}
          isDark={isDark}
        />

        {/* МОДАЛКА ИЗМЕНЕНИЯ СЕРИЙ */}
        {isModalVisible && movie && (
          <ProgressModal
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSave={(movieId, updatedSeason, updatedEpisode) => {
              if (isPreview) {
                // Если это превью из поиска — обновляем только локальный стейт
                setPreviewSeason(updatedSeason);
                setPreviewEpisode(updatedEpisode);
              } else if (storedMovie) {
                // 🔓 Если фильм открыт из вашего списка:
                // 1. Сохраняем в базу данных
                updateProgress(movieId, updatedSeason, updatedEpisode);
                // 2. 🎯 СИНХРОНИЗИРУЕМ стейты на экране, чтобы цифры сразу поменялись!
                setPreviewSeason(updatedSeason);
                setPreviewEpisode(updatedEpisode);
              }
            }}
            movieId={movie.id}
            initialSeason={previewSeason}
            initialEpisode={previewEpisode}
            themeColors={{ text: themeColors.text }}
            isDark={isDark}
          />
        )}

        {urlModalVisible && (
          <View style={s.modalOverlay}>
            <View style={[s.modalContent, { backgroundColor: isDark ? '#1c1c1e' : '#fff' }]}>

              {/* Центрированный заголовок */}
              <Text style={[s.modalTitle, { color: themeColors.text, textAlign: 'center' }]}>
                Ссылка на просмотр
              </Text>

              {/* Центрированный инпут */}
              <TextInput
                style={[
                  s.modalInputFull, 
                  { 
                    backgroundColor: isDark ? '#2c2c2e' : '#f2f2f7', 
                    color: themeColors.text, 
                    textAlign: 'center', // Текст будет писаться ровно по центру
                    fontSize: 15,
                    height: 50, // Немного увеличим высоту для удобства
                    marginBottom: 20,
                    width: '100%', // Растягиваем на всю ширину модалки
                    paddingHorizontal: 15,
                  }
                ]}
                value={tempUrl}
                onChangeText={setTempUrl}
                placeholder="https://example.com"
                placeholderTextColor="#666"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url" // Специальная клавиатура для ссылок
              />

              {/* Кнопки действий (Перейти и Копировать) */}
              {(movie?.watchUrl || tempUrl) ? (
                <View style={s.linkActionRow}>
                  <TouchableOpacity 
                    style={[s.linkActionBtn, { backgroundColor: '#5856D6' }]} 
                    onPress={handleOpenLink}
                  >
                    <Ionicons name="earth" size={18} color="#fff" />
                    <Text style={s.linkActionText}>Перейти</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[s.linkActionBtn, { backgroundColor: '#34c759' }]} 
                    onPress={handleCopy}
                  >
                    <Ionicons name="copy" size={18} color="#fff" />
                    <Text style={s.linkActionText}>Копировать</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {/* Кнопки управления (Отмена и Сохранить) */}
              <View style={[s.modalButtons, { marginTop: 20, justifyContent: 'center' }]}>
                <TouchableOpacity 
                  onPress={() => setUrlModalVisible(false)} 
                  style={[s.modalBtn, { flex: 1 }]}
                >
                  <Text style={{ color: '#fff', textAlign: 'center' }}>Отмена</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={handleSaveUrl} 
                  style={[s.modalBtn, { backgroundColor: '#007AFF', flex: 1 }]}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Сохранить</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          </View>
        )}
        {/* Наша новая стильная модалка */}
        <SuccessModal 
          visible={showSuccess}
          onClose={() => setShowSuccess(false)}
          title={movie?.title || ''}
          isDark={isDark}
          themeColors={themeColors} // <-- Добавь эту строку
        />
      </SafeAreaView>
    </View>
  );
}
