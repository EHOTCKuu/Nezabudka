import React, { useEffect, useRef, useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { modalStyles as styles } from './DeleteModal.styles';

interface DeleteMovieModalProps {
  movieId: string | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
  isDark: boolean;
  themeColors: { text: string };
}

export function DeleteModal({
  movieId,
  onClose,
  onConfirm,
  isDark,
  themeColors,
}: DeleteMovieModalProps) {
  const [countdown, setCountdown] = useState(10);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Запуск таймеров при появлении movieId
  useEffect(() => {
    if (movieId) {
      setCountdown(9);

      // Таймер автоматического удаления
      timerRef.current = setTimeout(() => {
        onConfirm(movieId);
      }, 10000);

      // Интервал обновления цифр
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
    }

    // Очистка при закрытии или смене ID
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [movieId]);

  if (!movieId) return null;

  const handleManualDelete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onConfirm(movieId);
  };

  return (
    <Modal visible={!!movieId} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.content, { backgroundColor: isDark ? '#1c1c1e' : '#fff' }]}>
          
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} hitSlop={10}>
            <Ionicons 
              name="close" 
              size={24} 
              color={isDark ? 'rgba(255,255,255,0.5)' : '#999'} 
            />
          </TouchableOpacity>

          <Text style={[styles.title, { color: themeColors.text }]}>Удаление фильма</Text>
          
          <Text style={[styles.subtitle, { color: isDark ? 'rgba(255,255,255,0.7)' : '#666' }]}>
            Фильм будет удален через {countdown} сек.
          </Text>

          <TouchableOpacity style={styles.deleteBtn} onPress={handleManualDelete} activeOpacity={0.7}>
            <Text style={styles.deleteBtnText}>ДА, УДАЛИТЬ</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </Modal>
  );
}
