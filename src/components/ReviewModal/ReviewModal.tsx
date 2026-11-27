import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/colors'; // Проверьте путь
import { getReviewModalStyles } from './ReviewModal.styles';

interface ReviewModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (rating: number, notes: string) => void;
  initialRating: number;
  initialNotes: string;
  isDark: boolean;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isVisible,
  onClose,
  onSave,
  initialRating,
  initialNotes,
  isDark,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [notes, setNotes] = useState(initialNotes);

  // Вычисляем стили на основе темы
  const styles = useMemo(() => getReviewModalStyles(isDark), [isDark]);
  const activeColor = isDark ? Colors.dark.accent : Colors.light.accent;

  // Сбрасываем стейты при открытии под актуальные данные фильма
  useEffect(() => {
    if (isVisible) {
      setRating(initialRating);
      setNotes(initialNotes);
    }
  }, [isVisible, initialRating, initialNotes]);

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          
          <Text style={styles.modalTitle}>
            Ваш отзыв
          </Text>

          {/* СИСТЕМА ОЦЕНКИ ЗВЕЗДАМИ */}
          <Text style={styles.label}>
            Ваша оценка:
          </Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Ionicons 
                  name={star <= rating ? "star" : "star-outline"} 
                  size={32} 
                  color={star <= rating ? '#f1c40f' : (isDark ? '#444' : '#ccc')} 
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* ПОЛЕ ДЛЯ ЗАМЕТКИ */}
          <Text style={[styles.label, { marginTop: 15 }]}>
            Заметка или рецензия:
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Напишите здесь свои впечатления от просмотра..."
            placeholderTextColor={isDark ? '#666' : '#999'}
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
            textAlignVertical="top"
          />

          {/* КНОПКИ */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity onPress={onClose} style={[styles.btn, { backgroundColor: 'rgba(150,150,150,0.2)' }]}>
              <Text style={{ color: isDark ? '#fff' : '#000' }}>Отмена</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => onSave(rating, notes)} 
              style={[styles.btn, { backgroundColor: activeColor }]}
            >
              <Text style={[styles.btnText, { color: isDark ? '#000' : '#fff' }]}>
                Сохранить
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};
