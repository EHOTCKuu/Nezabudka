import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../src/styles/colors'; 
import { getDropdownStyles } from './DropdownSelector.styles'; 

// 📚 ПЕРЕНЕСЕННЫЕ ДАННЫЕ
const GENRES = [
  { value: '', label: 'Все жанры' },
  { value: 'драма', label: 'Драма' },
  { value: 'комедия', label: 'Комедия' },
  { value: 'боевик', label: 'Боевик' },
  { value: 'фантастика', label: 'Фантастика' },
  { value: 'триллер', label: 'Триллер' },
  { value: 'ужасы', label: 'Ужасы' },
  { value: 'мультфильм', label: 'Мультфильм' },
  { value: 'мелодрама', label: 'Мелодрама' },
  { value: 'детектив', label: 'Детектив' }
];

const COUNTRIES = [
  { value: '', label: 'Все страны' },
  { value: 'США', label: 'США' },
  { value: 'Россия', label: 'Россия' },
  { value: 'Франция', label: 'Франция' },
  { value: 'Великобритания', label: 'Великобритания' },
  { value: 'Япония', label: 'Япония' },
  { value: 'Южная Корея', label: 'Корея' },
  { value: 'Испания', label: 'Испания' },
  { value: 'Германия', label: 'Германия' }
];

interface DropdownSelectorProps {
  type: 'genre' | 'country'; // 🎯 Новый пропс для определения типа данных
  selectedValue: string; 
  onSelect: (value: string) => void; 
  isDark: boolean;
}

export const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  type,
  selectedValue,
  onSelect,
  isDark,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const styles = useMemo(() => getDropdownStyles(isDark), [isDark]);
  const activeColor = isDark ? Colors.dark.accent : Colors.light.accent;

  // 🎯 Выбираем нужные данные и лейбл на основе пропса type
  const isGenre = type === 'genre';
  const label = isGenre ? 'Жанр' : 'Страна';
  const options = isGenre ? GENRES : COUNTRIES;

  const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || label;

  return (
    <>
      <TouchableOpacity style={styles.triggerBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.triggerText} numberOfLines={1}>
          {selectedLabel}
        </Text>
        <Ionicons name="chevron-down" size={16} color={isDark ? 'rgba(255,255,255,0.4)' : '#999'} />
      </TouchableOpacity>

      <Modal 
        visible={modalVisible} 
        transparent 
        animationType="fade" 
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={isDark ? 'rgba(255,255,255,0.5)' : '#999'} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 350 }} showsVerticalScrollIndicator={false}>
              {options.map((option) => {
                const isActive = selectedValue === option.value;
                return (
                  <TouchableOpacity 
                    key={option.value} 
                    style={styles.optionItem}
                    onPress={() => {
                      onSelect(option.value);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={[
                      styles.optionText, 
                      { color: isActive ? activeColor : (isDark ? '#fff' : '#333') },
                      isActive && { fontWeight: 'bold' }
                    ]}>
                      {option.label}
                    </Text>
                    {isActive && (
                      <Ionicons name="checkmark" size={18} color={activeColor} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};
