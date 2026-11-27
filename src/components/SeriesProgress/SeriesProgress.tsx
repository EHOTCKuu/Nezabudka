import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Movie, useMovieStore } from '../../store'; // 🎯 Импортируем useMovieStore из вашего стора
import { seriesStyles as styles } from './SeriesProgress.styles';

interface SeriesProgressProps {
  item: Movie;
  isDark: boolean;
  onEdit: (item: Movie) => void;
  onIncrement: (id: string) => void;
}

export const SeriesProgress = ({ item, isDark, onEdit, onIncrement }: SeriesProgressProps) => {
  // 🎯 Достаем флаг активности вибрации из глобального Zustand-стора
  const isVibrationEnabled = useMovieStore((state) => state.isVibrationEnabled);

  // Определяем цвета в зависимости от темы
  const activeColor = isDark ? '#2ecc71' : '#007AFF';
  const bgColor = isDark ? 'rgba(46, 204, 113, 0.2)' : 'rgba(0, 122, 255, 0.1)';
  const borderColor = isDark ? 'rgba(46, 204, 113, 0.4)' : 'rgba(0, 122, 255, 0.2)';

  // 🎯 Обработчик увеличения серии с проверкой глобального флага
  const handleIncrement = async () => {
    if (isVibrationEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Легкий щелчок при быстром действии
    }
    onIncrement(item.id);
  };

  // 🎯 Обработчик открытия редактирования с весомым откликом
  const handleEditPress = async () => {
    if (isVibrationEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // Средний отклик перед открытием модалки/окна
    }
    onEdit(item);
  };

  return (
    <View style={styles.container}>
      {/* Кнопка открытия редактирования серии/сезона */}
      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={handleEditPress} // 🎯 Заменили на обработчик с вибрацией
      >
        <Text style={[
          styles.badge, 
          { backgroundColor: bgColor, borderColor, color: activeColor }
        ]}>
          S{item.season} E{item.episode} ✎
        </Text>
      </TouchableOpacity>
      
      {/* Кнопка +1 серия */}
      <TouchableOpacity 
        style={[
          styles.plusBtn,
          { backgroundColor: isDark ? 'rgba(46, 204, 113, 0.1)' : 'transparent', borderColor: activeColor }
        ]} 
        onPress={handleIncrement}
      >
        <Text style={[styles.plusText, { color: activeColor }]}>
          +1 Epi
        </Text>
      </TouchableOpacity>
    </View>
  );
};
