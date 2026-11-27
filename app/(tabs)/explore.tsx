import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  useColorScheme 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { useMovieStore } from '../../src/store';
import { styles } from '../../src/styles/explore.styles';
import { Colors } from '../../src/styles/colors';
import { ThemeModal } from '../../src/components/ThemeModal/ThemeModal';
import { ErrorModal } from '../../src/components/ErrorModal/ErrorModal';

export default function ExploreScreen() {
  // 📥 РАЗДЕЛ 1: СИСТЕМНЫЕ И СТЕЙТ-ДАННЫЕ
  const systemColorScheme = useColorScheme();
  const { movies, removeMovie, theme, setTheme } = useMovieStore();
  const [settingsVisible, setSettingsVisible] = useState(false); // Модалка смены темы
  const [errorVisible, setErrorVisible] = useState(false);

  // 🎨 РАЗДЕЛ 2: РАСЧЁТ ЦВЕТОВОЙ ГАММЫ (ТЕМЫ)
  const isDark = theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark';
  const themeColors = isDark ? Colors.dark : Colors.light;

  // 📊 РАЗДЕЛ 3: ВЫЧИСЛЕНИЯ СТАТИСТИКИ
  const total = movies.length;
  const watched = movies.filter(m => m.status === 'watched').length;
  const watching = movies.filter(m => m.status === 'watching').length;
  const unwatched = movies.filter(m => m.status === 'unwatched').length;
  const progress = total > 0 ? Math.round((watched / total) * 100) : 0;

  // 🏆 РАЗДЕЛ 4: ГЕНЕРАЦИЯ РАНГА КИНОМАНА
  const getRankData = (count: number) => {
    if (count >= 50) return { name: 'Властелин Кино', icon: '👑' };
    if (count >= 20) return { name: 'Киноман-Эксперт', icon: '🍿' };
    if (count >= 5) return { name: 'Зритель-Любитель', icon: '🎬' };
    return { name: 'Новичок', icon: '👶' };
  };
  const rank = getRankData(watched);

  // 📄 РАЗДЕЛ 5: ФУНКЦИЯ ФОРМИРОВАНИЯ И ВЫГРУЗКИ В .TXT
  const exportToTxt = async () => {
    if (movies.length === 0) {
      setErrorVisible(true);
      return;
    }
  
    // Генерация тела текстового документа
    let fileContent = `--- МОЙ КИНОСПИСОК (Выгрузка от ${new Date().toLocaleDateString()}) ---\n`;
    fileContent += `Всего позиций: ${movies.length}\n`;
    fileContent += `------------------------------------------\n\n`;
  
    movies.forEach((m, i) => {
      const statusText = m.status === 'watched' ? 'ПРОСМОТРЕНО [✓]' : 
                         m.status === 'watching' ? 'СМОТРЮ [> ]' : 'В ОЧЕРЕДИ [  ]';
  
      fileContent += `${i + 1}. ${m.title.toUpperCase()} (${m.year})\n`;
      fileContent += `   Статус: ${statusText}\n`;
      
      if (m.type === 'series') {
        fileContent += `   Прогресс: Сезон ${m.season}, Серия ${m.episode}\n`;
      }
  
      if (m.watchUrl && m.watchUrl.trim() !== '') {
        fileContent += `   Где смотреть: ${m.watchUrl}\n`;
      } else {
        fileContent += `   Ссылка: не указана\n`;
      }
  
      fileContent += `\n------------------------------------------\n\n`;
    });
  
    // Процесс сохранения и шеринга на устройстве
    try {
      const baseDir = (FileSystem as any).cacheDirectory || (FileSystem as any).documentDirectory;
      const filePath = `${baseDir}my_movie_collection.txt`;
  
      await FileSystem.writeAsStringAsync(filePath, fileContent, { encoding: 'utf8' });
  
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(filePath, {
          mimeType: 'text/plain',
          dialogTitle: 'Мой список кино',
          UTI: 'public.plain-text'
        });
      } else {
        Alert.alert("Ошибка", "Обмен файлами недоступен");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Ошибка", "Не удалось сформировать файл");
    }
  };
  
  // 🗑️ РАЗДЕЛ 6: ФУНКЦИЯ ОЧИСТКИ БАЗЫ ДАННЫХ
  const handleReset = () => {
    Alert.alert(
      "Сброс данных",
      "Это безвозвратно удалит все фильмы. Вы уверены?",
      [
        { text: "Отмена", style: "cancel" },
        { text: "Удалить всё", style: "destructive", onPress: () => {
          movies.forEach(m => removeMovie(m.id));
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 🔝 РАЗДЕЛ 1: ВЕРХНЯЯ СТРОКА (ЗАГОЛОВОК И ИКОНКА НАСТРОЕК) */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
          <Text style={[styles.pageTitle, { color: themeColors.text, marginBottom: 0 }]}>Статистика</Text>
          {/* Кнопка вызова модалки смены темы */}
          <TouchableOpacity onPress={() => setSettingsVisible(true)} style={{ padding: 5 }}>
            <Ionicons name="settings-outline" size={24} color={themeColors.text} />
          </TouchableOpacity>
        </View>

        {/* 📊 РАЗДЕЛ 2: ГЛАВНАЯ КАРТОЧКА (ПРОГРЕСС-БАР) */}
        <View style={[
          styles.mainCard, 
          { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFF' },
          !isDark && { elevation: 3, shadowOpacity: 0.1, borderColor: '#EEE' }
        ]}>
          <Text style={[styles.cardLabel, { color: isDark ? 'rgba(255,255,255,0.5)' : '#999' }]}>ЗАВЕРШЕНО</Text>
          <Text style={[styles.progressValue, { color: themeColors.text }]}>{progress}%</Text>
          
          {/* Полоска прогресса */}
          <View style={[styles.progressBarBg, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#EEE' }]}>
            <View style={[
              styles.progressBarFill, 
              { 
                width: `${progress}%`,
                backgroundColor: themeColors.accent, // Динамический цвет полоски
                // Тень для сочного неонового эффекта в темной теме
                shadowColor: themeColors.accent,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: isDark ? 0.5 : 0,
                shadowRadius: 5,
              }
            ]} />
          </View>
        </View>

        {/* 🔲 РАЗДЕЛ 3: СЕТКА СТАТИСТИКИ (ПЛИТКИ С ЦИФРАМИ) */}
        <View style={styles.statsGrid}>
          {[
            { label: 'ВСЕГО', val: total, color: themeColors.text },
            { label: 'ГОТОВО', val: watched, color: '#2ecc71' },
            { label: 'СМОТРЮ', val: watching, color: '#f39c12' },
            { label: 'В ОЧЕРЕДИ', val: unwatched, color: '#95a5a6' }
          ].map((item, idx) => (
            <View key={idx} style={[
              styles.statBox, 
              { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFF' },
              !isDark && { elevation: 2, shadowOpacity: 0.05, borderColor: '#EEE' }
            ]}>
              <Text style={[styles.statNum, { color: item.color }]}>{item.val}</Text>
              <Text style={[styles.statLabel, { color: isDark ? 'rgba(255,255,255,0.4)' : '#AAA' }]}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* 🏆 РАЗДЕЛ 4: КАРТОЧКА ТЕКУЩЕГО РАНГА */}
        <View style={[
          styles.rankCard, 
          { 
            // Полупрозрачный фон в цвет акцента (зеленый или синий)
            backgroundColor: isDark ? 'rgba(10, 255, 116, 0.1)' : 'rgba(0, 122, 255, 0.05)',
            borderWidth: 1,
            borderColor: isDark ? 'rgba(10, 255, 116, 0.2)' : 'rgba(0, 122, 255, 0.1)',
          }
        ]}>
          <Text style={styles.rankIcon}>{rank.icon}</Text>
          <View>
            <Text style={[styles.rankTitle, { color: isDark ? 'rgba(255, 255, 255, 0.5)' : '#666' }]}>ВАШ РАНГ:</Text>
            <Text style={[styles.rankName, { color: themeColors.accent }]}>{rank.name}</Text>
          </View>
        </View>

        {/* 📥 РАЗДЕЛ 5: КНОПКА ВЫГРУЗКИ В TXT */}
        <TouchableOpacity 
          style={[
            styles.exportBtn, 
            { 
              borderColor: isDark ? 'rgba(10, 255, 116, 0.3)' : 'rgba(0, 122, 255, 0.3)',
              backgroundColor: isDark ? 'rgba(10, 255, 116, 0.05)' : 'rgba(0, 122, 255, 0.05)',
            }
          ]} 
          onPress={exportToTxt}
        >
          <Ionicons 
            name="download-outline" 
            size={22} 
            color={themeColors.accent} 
          />
          <Text style={[styles.exportBtnText, { color: themeColors.accent }]}>
            ВЫГРУЗИТЬ СПИСОК (.TXT)
          </Text>
        </TouchableOpacity>

        {/* 🗑️ РАЗДЕЛ 6: КНОПКА ПОЛНОЙ ОЧИСТКИ БАЗЫ ДАННЫХ */}
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetBtnText}>Очистить базу данных</Text>
        </TouchableOpacity>

        {/* 🎨 РАЗДЕЛ 7: МОДАЛКА ВЫБОРА ТЕМЫ */}
        <ThemeModal
          isVisible={settingsVisible}
          onClose={() => setSettingsVisible(false)}
          currentTheme={theme}
          onThemeChange={(newTheme) => setTheme(newTheme)}
          themeColors={themeColors}
          isDark={isDark}
        />

      <ErrorModal 
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
        message="Ваш список пуст"
        isDark={isDark}
        themeColors={themeColors}
      />

      </ScrollView>
    </SafeAreaView>
  );
}
