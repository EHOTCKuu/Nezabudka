import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MovieStatus, useMovieStore } from '../../store';
import { statusBadgeStyles as styles } from './MovieStatusBadge.styles';
import * as Haptics from 'expo-haptics'; // 🎯 Импортируем haptics для тактильного отклика

interface MovieStatusBadgeProps {
  status: MovieStatus;
  onPress: () => void;
  isDark: boolean;
}

export const MovieStatusBadge = ({ status, onPress, isDark }: MovieStatusBadgeProps) => {
  // 🎯 Достаем цвета статусов и глобальный флаг активности вибрации из стора
  const { statusColors, isVibrationEnabled } = useMovieStore();
  
  const activeColor = statusColors[status] || 
    (status === 'watched' ? '#2ecc71' : status === 'watching' ? '#f39c12' : '#95a5a6');

  const getStatusData = () => {
    switch (status) {
      case 'watched': return { label: 'ГОТОВО', icon: 'checkmark-circle' as const };
      case 'watching': return { label: 'СМОТРЮ', icon: 'play-circle' as const };
      default: return { label: 'В ОЧЕРЕДИ', icon: 'time' as const };
    }
  };

  const { label, icon } = getStatusData();

  // 🎯 Обработчик нажатия с интеграцией виброотклика средней силы
  const handlePress = async () => {
    if (isVibrationEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress(); // Вызываем переданную родительскую функцию (например, открытие модалки выбора)
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      style={styles.interactiveRow} 
      onPress={handlePress} // 🎯 Заменили onPress на нашу новую функцию
    >
      <View style={[
        styles.statusBadgeLarge,
        { 
          // Используем 80% насыщенности цвета для фона
          backgroundColor: activeColor + 'CC', 
          borderColor: activeColor,
        }
      ]}>
        <Ionicons 
          name={icon} 
          size={26} 
          color={isDark ? '#fff' : '#000'} 
        />
        <Text style={[styles.statusTextLarge, { color: isDark ? '#fff' : '#000'}]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
