import React, { useMemo } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../src/styles/colors'; // Проверьте путь к файлу цветов
import { getSearchStyles } from './SearchBar.styles';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  isDark: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSubmit,
  placeholder = "Название...",
  isDark,
}) => {
  const styles = useMemo(() => getSearchStyles(isDark), [isDark]);
  
  // Получаем сочный зеленый/синий цвет
  const activeColor = isDark ? Colors.dark.accent : Colors.light.accent;
  
  // В светлой теме делаем иконку контрастной (темной), в темной — фирменным цветом
  const iconColor = isDark ? activeColor : '#1C1C1E';

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.inputInline}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#666' : '#999'}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
      <TouchableOpacity style={styles.searchIconBtn} onPress={onSubmit}>
        <Ionicons name="search" size={22} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};
