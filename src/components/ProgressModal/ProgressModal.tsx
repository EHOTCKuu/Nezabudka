import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Movie } from '../../store'; // Скорректируйте путь к вашему стору, если нужно
import { getModalStyles } from './ProgressModal.styles'; 

interface ProgressModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (movieId: Movie['id'], season: number, episode: number) => void;
  movieId: Movie['id'];
  initialSeason: number;
  initialEpisode: number;
  themeColors: { 
    text: string; 
  };
  isDark: boolean;
}

export const ProgressModal: React.FC<ProgressModalProps> = ({
  isVisible,
  onClose,
  onSave,
  movieId,
  initialSeason,
  initialEpisode,
  themeColors,
  isDark,
}) => {
  const [season, setSeason] = useState<string>(String(initialSeason));
  const [episode, setEpisode] = useState<string>(String(initialEpisode));

  // Получаем стили, зависящие от темы
  const styles = useMemo(() => getModalStyles(isDark), [isDark]);

  // Сбрасываем стейт на актуальный при каждом открытии модалки
  useEffect(() => {
    if (isVisible) {
      setSeason(String(initialSeason));
      setEpisode(String(initialEpisode));
    }
  }, [isVisible, initialSeason, initialEpisode]);

  const handleDecrement = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(prev => String(Math.max(1, Number(prev) - 1)));
  };

  const handleIncrement = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(prev => String(Number(prev) + 1));
  };

  const handleSave = () => {
    onSave(movieId, Number(season), Number(episode));
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={[styles.modalTitle, { color: themeColors.text }]}>
            Изменить прогресс
          </Text>

          {/* СТЕППЕР СЕЗОНА */}
          <View style={styles.modalInputGroup}>
            <Text style={styles.modalInputLabel}>Сезон:</Text>
            <View style={styles.stepperContainer}>
              <TouchableOpacity style={styles.stepperBtn} onPress={() => handleDecrement(setSeason)}>
                <Ionicons name="remove" size={20} color={themeColors.text} />
              </TouchableOpacity>

              <TextInput 
                style={[styles.stepperInput, { color: themeColors.text }]} 
                keyboardType="numeric" 
                value={season} 
                onChangeText={setSeason} 
              />

              <TouchableOpacity style={styles.stepperBtn} onPress={() => handleIncrement(setSeason)}>
                <Ionicons name="add" size={20} color={themeColors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* СТЕППЕР СЕРИИ */}
          <View style={styles.modalInputGroup}>
            <Text style={styles.modalInputLabel}>Серия:</Text>
            <View style={styles.stepperContainer}>
              <TouchableOpacity style={styles.stepperBtn} onPress={() => handleDecrement(setEpisode)}>
                <Ionicons name="remove" size={20} color={themeColors.text} />
              </TouchableOpacity>

              <TextInput 
                style={[styles.stepperInput, { color: themeColors.text }]} 
                keyboardType="numeric" 
                value={episode} 
                onChangeText={setEpisode} 
              />

              <TouchableOpacity style={styles.stepperBtn} onPress={() => handleIncrement(setEpisode)}>
                <Ionicons name="add" size={20} color={themeColors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* КНОПКИ */}
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>ОК</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
