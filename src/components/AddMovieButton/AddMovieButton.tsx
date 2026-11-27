import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { addBtnStyles as styles } from './AddMovieButton.styles';
import { SuccessModal } from '../SuccessModal/SuccessModal'; // Импортируем нашу новую модалку
import { Colors } from '../../../src/styles/colors';

interface AddMovieButtonProps {
  isExist: boolean;
  onPress: () => void;
  isDark: boolean;
  accentColor: string;
  movieTitle: string; // Добавили, чтобы показать название в модалке
}

export const AddMovieButton = ({ isExist, onPress, isDark, accentColor, movieTitle }: AddMovieButtonProps) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePress = () => {
    if (!isExist) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onPress();
      setShowSuccess(true); // Показываем стильное окно вместо Alert
    }
  };

  const themeColors = isDark ? Colors.dark : Colors.light;
  const disabledBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const disabledBorder = isDark ? '#333' : '#ddd';

  const activeBg = isDark ? 'rgba(46, 204, 113, 0.15)' : 'rgba(0, 122, 255, 0.1)';
  const activeBorder = isDark ? '#2ecc71' : accentColor;
  const activeText = isDark ? '#2ecc71' : accentColor;

  return (
    <>
      <TouchableOpacity 
        onPress={handlePress}
        disabled={isExist}
        activeOpacity={0.7}
        style={[
          styles.button,
          { 
            backgroundColor: isExist ? disabledBg : activeBg,
            borderColor: isExist ? disabledBorder : activeBorder,
          }
        ]}
      >
        <Text style={[
          styles.text, 
          { color: activeText, opacity: isExist ? 0.5 : 1 }
        ]}>
          {isExist ? 'В СПИСКЕ' : 'ДОБАВИТЬ'}
        </Text>
      </TouchableOpacity>

      <SuccessModal 
          visible={showSuccess}
          onClose={() => setShowSuccess(false)}
          title={movieTitle}
          isDark={isDark}
          themeColors={themeColors} // <-- Добавь эту строку
        />
    </>
  );
};
