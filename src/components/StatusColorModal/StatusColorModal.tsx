import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMovieStore } from '../../store';
import { statusColorStyles as styles } from './StatusColorModal.styles';

interface StatusColorModalProps {
  visible: boolean;
  onClose: () => void;
  isDark: boolean;
  themeColors: { text: string; accent: string };
}

const PALETTE = ['#2ecc71', '#3498db', '#9b59b6', '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6', '#007AFF', '#ff4757', '#1abc9c'];

export const StatusColorModal = ({ visible, onClose, isDark, themeColors }: StatusColorModalProps) => {
  const { statusColors, setStatusColor, resetStatusColors } = useMovieStore();

  const statuses = [
    { key: 'watched', label: 'Просмотрено', icon: 'checkmark-circle' },
    { key: 'watching', label: 'В процессе', icon: 'play-circle' },
    { key: 'unwatched', label: 'В планах', icon: 'time' },
  ] as const;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.content, { backgroundColor: isDark ? '#1c1c1e' : '#fff' }]}>
          
          <View style={styles.headerRow}>
            <Text style={[styles.title, { color: themeColors.text }]}>Цвета статусов</Text>
            <TouchableOpacity onPress={resetStatusColors} hitSlop={15}>
              <Ionicons name="refresh-outline" size={24} color={themeColors.accent} />
            </TouchableOpacity>
          </View>

          {statuses.map((status) => {
              const currentStatusColor = statusColors[status.key];
              return (
                <View key={status.key} style={styles.section}>
                  <View style={styles.sectionHeader}>
                     <Ionicons name={status.icon as any} size={20} color={currentStatusColor} />
                     <Text style={[styles.label, { color: currentStatusColor }]}>{status.label}</Text>
                  </View>
            
                  <View style={styles.palette}>
                    {PALETTE.map((color) => {
                      const isActive = statusColors[status.key] === color;
                      return (
                        <TouchableOpacity
                          key={color}
                          activeOpacity={0.6}
                          style={[
                            styles.swatch,
                            { backgroundColor: color },
                            isActive && [styles.activeSwatch, { borderColor: isDark ? '#fff' : '#000' }]
                          ]}
                          onPress={() => setStatusColor(status.key, color)}
                        />
                      );
                    })}
                  </View>
                </View>
              );
            })}

          <TouchableOpacity 
            style={[styles.closeBtn, { backgroundColor: themeColors.accent }]} 
            onPress={onClose}
          >
             <Text style={[styles.closeBtnText, { color: isDark ? '#000' : '#fff' }]}>ГОТОВО</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
