import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { errorModalStyles as styles } from './ErrorModal.styles';
import { useMovieStore } from '../../store'; // Путь к вашему стору
import * as Haptics from 'expo-haptics';

interface ErrorModalProps {
  visible: boolean;
  onClose: () => void;
  message: string; // "Ваш список пуст" или любая другая ошибка
  isDark: boolean;
  themeColors: { text: string };
}

export const ErrorModal = ({ visible, onClose, message, isDark, themeColors }: ErrorModalProps) => {
  const isVibrationEnabled = useMovieStore((state) => state.isVibrationEnabled);

  // Вызываем виброотклик ошибки при открытии модального окна
  useEffect(() => {
    if (visible && isVibrationEnabled) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, [visible, isVibrationEnabled]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[
          styles.content, 
          { backgroundColor: isDark ? '#1c1c1e' : '#fff' }
        ]}>
          {/* Круг с предупреждающей иконкой */}
          <View style={styles.iconCircle}>
            <Ionicons name="alert-circle" size={42} color="#e74c3c" />
          </View>
          
          <Text style={[styles.title, { color: themeColors.text }]}>
            Ошибка
          </Text>
          
          <Text style={[
            styles.message, 
            { color: isDark ? '#aaa' : '#666' }
          ]}>
            {message}
          </Text>

          {/* Кнопка закрытия */}
          <TouchableOpacity 
            style={styles.btn} 
            onPress={async () => {
              if (isVibrationEnabled) {
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
              onClose();
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>
              ПОНЯТНО
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
