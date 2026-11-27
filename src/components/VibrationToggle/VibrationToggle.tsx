import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { getVibrationToggleStyles } from './VibrationToggle.styles';
import * as Haptics from 'expo-haptics'; // Использование установленного пакета

interface VibrationToggleProps {
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
  textColor: string;
  activeColor: string;
}

export const VibrationToggle: React.FC<VibrationToggleProps> = ({
  isEnabled,
  onToggle,
  textColor,
  activeColor,
}) => {
  const styles = getVibrationToggleStyles();

  const handlePress = async () => {
    const newValue = !isEnabled;
    onToggle(newValue);
    
    // Если переключатель включают, даем мгновенный легкий отклик
    if (newValue) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContainer}>
        <MaterialCommunityIcons  
          name={isEnabled ? "vibrate" : "vibrate-off"} 
          size={22} 
          color={textColor} 
          style={styles.icon}
        />
        <Text style={[styles.label, { color: textColor }]}>
          Вибрация при нажатии
        </Text>
      </View>
      <View style={{ width: 5 }} />
      <View style={[
        styles.switchOuter, 
        isEnabled ? { backgroundColor: activeColor } : styles.switchDisabled
      ]}>
        <View style={[
          styles.switchInner, 
          isEnabled ? styles.switchInnerActive : styles.switchInnerInactive
        ]} />
      </View>
    </TouchableOpacity>
  );
};
