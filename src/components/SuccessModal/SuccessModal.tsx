import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { successModalStyles as styles } from './SuccessModal.styles';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  isDark: boolean;
  themeColors: { text: string; accent: string };
}

export const SuccessModal = ({ visible, onClose, title, isDark, themeColors }: SuccessModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[
          styles.content, 
          { backgroundColor: isDark ? '#1c1c1e' : '#fff' }
        ]}>
          <View style={styles.iconCircle}>
            {/* Используем accent для иконки подтверждения */}
            <Ionicons name="checkmark" size={40} color={themeColors.accent} />
          </View>
          
          <Text style={[styles.title, { color: themeColors.text }]}>
            Успешно!
          </Text>
          
          <Text style={[
            styles.message, 
            { color: isDark ? '#aaa' : '#666' } // Второстепенный текст чуть приглушаем
          ]}>
            Фильм «<Text style={{ color: themeColors.text, fontWeight: '700' }}>{title}</Text>» добавлен в список
          </Text>

          <TouchableOpacity 
            style={[styles.btn, { backgroundColor: themeColors.accent }]} 
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={[styles.btnText, { color: isDark ? '#000' : '#fff' }]}>
              ОТЛИЧНО
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
