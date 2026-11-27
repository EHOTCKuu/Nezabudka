import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MovieStatus, useMovieStore } from '../../store';
import { statusButtonStyles as styles } from './MovieStatusButton.styles';
import * as Haptics from 'expo-haptics'; // 🎯 Импортируем haptics для тактильного отклика

interface MovieStatusButtonProps {
  status: MovieStatus;
  onPress: () => void;
  isDark: boolean;
}

export const MovieStatusButton = ({ status, onPress, isDark }: MovieStatusButtonProps) => {
  // 🎯 Извлекаем цвета статусов и глобальный флаг активности вибрации из нашего Zustand-стора
  const { statusColors, isVibrationEnabled } = useMovieStore();
  const activeColor = statusColors[status];

  const getStatusLabel = () => {
    switch (status) {
      case 'watched': return 'СМОТРЕЛ';
      case 'watching': return 'СМОТРЮ';
      default: return 'В ОЧЕРЕДИ';
    }
  };

  // 🎯 Обработчик нажатия с интеграцией аккуратной легкой вибрации
  const handlePress = async () => {
    if (isVibrationEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress(); // Вызываем переданную родительскую функцию переключения
  };

  return (
    <TouchableOpacity 
      onPress={handlePress} // 🎯 Заменили onPress на нашу новую функцию с вибрацией
      activeOpacity={0.8} 
      style={{ height: '100%' }}
    >
      <View style={[
        styles.statusBadge, 
        { backgroundColor: activeColor + 'CC' } // Сочный полупрозрачный цвет
      ]}>
        <Text 
          numberOfLines={1}
          style={[styles.statusText, { color: isDark ? '#fff' : '#000' }]}
        >
          {getStatusLabel()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
