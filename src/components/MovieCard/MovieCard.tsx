import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Movie, MovieStatus, useMovieStore } from '../../store'; // 🎯 Импортируем useMovieStore
import { MovieStatusButton } from '../MovieStatusButton/MovieStatusButton';
import { styles as globalStyles } from '../../styles/styles';
import { SeriesProgress } from '../SeriesProgress/SeriesProgress';
import * as Haptics from 'expo-haptics'; // 🎯 Импортируем haptics для вибрации

interface MovieCardProps {
  item: Movie;
  isDark: boolean;
  themeColors: any;
  onPress: () => void;
  onDelete: (id: string) => void;
  onEditProgress: (item: Movie) => void;
  onIncrement: (id: string) => void;
  onStatusChange: (id: string, currentStatus: MovieStatus) => void;
}

export const MovieCard = ({
  item,
  isDark,
  themeColors,
  onPress,
  onDelete,
  onEditProgress,
  onIncrement,
  onStatusChange,
}: MovieCardProps) => {
  // 🎯 Извлекаем флаг активности вибрации из глобального Zustand-стора
  const isVibrationEnabled = useMovieStore((state) => state.isVibrationEnabled);

  // 🎯 Обработчик удаления с сильной вибрацией
  const handleDeletePress = async () => {
    if (isVibrationEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); // Мощный отклик при деструктивном действии
    }
    onDelete(item.id);
  };

  // 🎯 Обработчик тапа по карточке с легкой вибрацией
  const handleCardPress = async () => {
    if (isVibrationEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Аккуратный клик при открытии
    }
    onPress();
  };
  
  const renderRightActions = () => (
    <TouchableOpacity 
      style={globalStyles.deleteAction} 
      onPress={handleDeletePress} // 🎯 Заменили на обработчик с мощным вибро
      activeOpacity={0.8}
    >
      <Text style={globalStyles.deleteActionText}>Удалить</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions} friction={2} rightThreshold={40}>
      <TouchableOpacity 
        activeOpacity={0.95}
        style={[globalStyles.movieItem, { 
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
          backgroundColor: isDark ? '#1a1a1a' : '#fff',
          overflow: 'hidden'
        }]} 
        onPress={handleCardPress} // 🎯 Заменили на обработчик с легким вибро
      >
        {/* ФОН КАРТОЧКИ */}
        {item.poster ? (
          <Image source={{ uri: item.poster }} style={StyleSheet.absoluteFillObject} blurRadius={15} />
        ) : (
          <View style={item.type === 'series' ? globalStyles.gradientSeries : globalStyles.gradientMovie} />
        )}

        {/* КОНТЕНТ */}
        <View style={[globalStyles.cardContent, { 
          backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.75)',
          paddingRight: 0,   
          paddingTop: 0,     
          paddingBottom: 0,  
          flexDirection: 'row',
          alignItems: 'stretch' 
        }]}>
          
          {/* ИНФОРМАЦИЯ (ПОСТЕР + ТЕКСТ) */}
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 12 }}>
            <Image source={{ uri: item.poster }} style={globalStyles.miniPoster} />
            
            <View style={[globalStyles.movieInfo, { marginLeft: 12 }]}>
              <Text style={[globalStyles.movieTitle, { color: themeColors.text }]} numberOfLines={2}>
                {item.title}
              </Text>
              
              <Text style={[globalStyles.movieYearText, { color: isDark ? '#aaa' : '#666' }]}>
                {item.year} год
              </Text>

              {item.type === 'series' && (
                  <SeriesProgress
                    item={item}
                    isDark={isDark}
                    onEdit={onEditProgress}
                    onIncrement={onIncrement}
                  />
                )}

              <Text style={[globalStyles.dateText, { color: isDark ? '#aaa' : '#999', marginTop: 8 }]}>
                {`Добавлено: ${new Date(item.createdAt).toLocaleDateString('ru-RU')}`}
              </Text>
            </View>
          </View>

          {/* КНОПКА СТАТУСА (ВЕРТИКАЛЬНАЯ) */}
          <MovieStatusButton
            status={item.status}
            isDark={isDark}
            onPress={() => onStatusChange(item.id, item.status)}
          />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
