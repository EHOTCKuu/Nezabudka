import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getSegmentedFilterStyles } from './SegmentedFilter.styles';
import { Colors } from '../../../src/styles/colors'; // Импортируем ваш файл цветов

interface SegmentedFilterProps<T extends string> {
  options: { value: T; label: string }[];
  selectedValue: T;
  onSelect: (value: T) => void;
  isDark: boolean;
}

export const SegmentedFilter = <T extends string>({
  options,
  selectedValue,
  onSelect,
  isDark,
}: SegmentedFilterProps<T>) => {
  const styles = useMemo(() => getSegmentedFilterStyles(isDark), [isDark]);

  // 🎯 Автоматически берем нужный акцентный цвет из вашей структуры
  const activeColor = isDark ? Colors.dark.accent : Colors.light.accent;

  return (
    <View style={styles.radioGroup}>
      {options.map((option) => {
        const isActive = selectedValue === option.value;

        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.radioButton,
              isActive && { backgroundColor: activeColor, borderColor: activeColor }
            ]}
            onPress={() => onSelect(option.value)}
          >
            <Text style={[styles.radioText, isActive && styles.radioTextActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
