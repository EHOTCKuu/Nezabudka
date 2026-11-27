import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { ThemeMode, useMovieStore } from '../../store'; 
import { getThemeModalStyles } from './ThemeModal.styles'; 
import { Colors } from '../../styles/colors'; 
import { Ionicons } from '@expo/vector-icons';
import { StatusColorModal } from '../StatusColorModal/StatusColorModal';
import { VibrationToggle } from '../VibrationToggle/VibrationToggle'; 
import { useHaptics } from '../VibrationToggle/useHaptics';

interface ThemeModalProps {
  isVisible: boolean;
  onClose: () => void;
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  themeColors: {
    text: string;
  };
  isDark: boolean;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isVisible,
  onClose,
  currentTheme,
  onThemeChange,
  themeColors,
  isDark,
}) => {
  const styles = useMemo(() => getThemeModalStyles(isDark), [isDark]);
  const [colorModalVisible, setColorModalVisible] = useState(false);
  
  // Состояние тумблера
  const { isVibrationEnabled, toggleVibration } = useMovieStore();

  // Инициализация хука тактильной отдачи
  const { triggerLight, triggerSuccess } = useHaptics(isVibrationEnabled);

  const activeColor = isDark ? Colors.dark.accent : Colors.light.accent;

  const themeOptions: { key: ThemeMode; label: string }[] = [
    { key: 'light', label: 'Светлая' },
    { key: 'dark', label: 'Темная' },
    { key: 'system', label: 'Системная' },
  ];

  // Обработчик смены темы с вибрацией
  const handleThemeChange = async (theme: ThemeMode) => {
    await triggerLight();
    onThemeChange(theme);
  };

  // Обработчик закрытия с вибрацией успеха
  const handleClose = async () => {
    await triggerSuccess();
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={[styles.modalTitle, { color: themeColors.text }]}>
            Тема приложения
          </Text>

          {themeOptions.map((option) => {
            const isActive = currentTheme === option.key;
            
            return (
              <TouchableOpacity 
                key={option.key} 
                style={styles.settingsOption} 
                onPress={() => handleThemeChange(option.key)} // Изменено
              >
                <Text style={[styles.modalInputLabel, { color: themeColors.text }]}>
                  {option.label}
                </Text>
                
                <View style={[
                  styles.radioOuter, 
                  isActive && { borderColor: activeColor }
                ]}>
                  {isActive && <View style={[styles.radioInner, { backgroundColor: activeColor }]} />}
                </View>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity 
            style={styles.settingsOption} 
            onPress={async () => {
              await triggerLight();
              setColorModalVisible(true);
            }}
          >
            <Text style={[styles.modalInputLabel, { color: themeColors.text }]}>
              Настроить цвета статусов
            </Text>
            <Ionicons name="chevron-forward" size={20} color={themeColors.text} opacity={0.5} />
          </TouchableOpacity>

          {/* Компонент переключателя вибрации */}
          <VibrationToggle 
            isEnabled={isVibrationEnabled}
            onToggle={toggleVibration}
            textColor={themeColors.text}
            activeColor={activeColor}
          />

          <StatusColorModal 
            visible={colorModalVisible}
            onClose={() => setColorModalVisible(false)}
            isDark={isDark}
            themeColors={{ 
              text: themeColors.text, 
              accent: isDark ? Colors.dark.accent : Colors.light.accent 
            }}
          />

          <TouchableOpacity 
            onPress={handleClose} // Изменено
            style={[styles.modalBtn, { backgroundColor: activeColor }]}
          >
            <Text style={[styles.btnText, { color: isDark ? '#000' : '#fff' }]}>
              ГОТОВО
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
