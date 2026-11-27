import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useMovieStore, MovieStatus } from '../../../src/store'; 
import { getCounterStyles } from './MovieCounter.styles';
import * as Haptics from 'expo-haptics'; // 🎯 Импортируем haptics для отдачи

interface MovieCounterProps {
  isDark: boolean;
  onStatusSelect: (status: MovieStatus | 'all') => void;
}

export const MovieCounter: React.FC<MovieCounterProps> = ({ isDark, onStatusSelect }) => {
  // 🎯 Вытаскиваем movies, statusColors и состояние вибрации из нашего Zustand стора
  const { movies, statusColors, isVibrationEnabled } = useMovieStore();
  const styles = useMemo(() => getCounterStyles(isDark), [isDark]); 
  
  const totalCount = movies.length;
  const watchedCount = movies.filter(m => m.status === 'watched').length;
  const watchingCount = movies.filter(m => m.status === 'watching').length;
  const unwatchedCount = movies.filter(m => m.status === 'unwatched').length;

  // 🎯 Единая функция для обработки клика и вызова легкого виброотклика
  const handlePress = async (status: MovieStatus | 'all') => {
    if (isVibrationEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onStatusSelect(status);
  };

  return (
    <View style={styles.container}>
      {/* 1. Общее количество (Сброс на "Любые") */}
      <TouchableOpacity 
        style={styles.indicatorItem} 
        onPress={() => handlePress('all')} // 🎯 Заменили прямые вызовы на handlePress
        activeOpacity={0.7}
      >
        <Text style={[styles.number, { color: isDark ? '#fff' : '#000' }]}>Всего в списке: {totalCount}</Text>
      </TouchableOpacity>

      <View style={styles.separator} />

      {/* 2. Просмотрено (Зеленый) */}
      <TouchableOpacity 
        style={styles.indicatorItem} 
        onPress={() => handlePress('watched')} 
        activeOpacity={0.7}
      >
        <View style={[styles.circle, { backgroundColor: statusColors.watched }]} />
        <Text style={[styles.number, { color: isDark ? '#fff' : '#000' }]}>{watchedCount}</Text>
      </TouchableOpacity>

      <View style={styles.separator} />

      {/* 3. Смотрю (Оранжевый) */}
      <TouchableOpacity 
        style={styles.indicatorItem} 
        onPress={() => handlePress('watching')} 
        activeOpacity={0.7}
      >
        <View style={[styles.circle, { backgroundColor: statusColors.watching }]} />
        <Text style={[styles.number, { color: isDark ? '#fff' : '#000' }]}>{watchingCount}</Text>
      </TouchableOpacity>

      <View style={styles.separator} />

      {/* 4. В очереди / Буду (Серый) */}
      <TouchableOpacity 
        style={styles.indicatorItem} 
        onPress={() => handlePress('unwatched')} 
        activeOpacity={0.7}
      >
        <View style={[styles.circle, { backgroundColor: statusColors.unwatched }]} />
        <Text style={[styles.number, { color: isDark ? '#fff' : '#000' }]}>{unwatchedCount}</Text>
      </TouchableOpacity>
    </View>
  );
};
