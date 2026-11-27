import { StyleSheet } from 'react-native';

export const getSegmentedFilterStyles = (isDark: boolean) => {
  return StyleSheet.create({
    radioGroup: { 
      flexDirection: 'row', 
      gap: 8, 
      flexWrap: 'wrap',
      justifyContent: 'center', 
      alignItems: 'center',     
      width: '100%',
    },
    radioButton: { 
      paddingVertical: 5, 
      paddingHorizontal: 12, 
      borderRadius: 15, 
      borderWidth: 1,
      backgroundColor: isDark ? '#1c1c1e' : '#e5e5ea',
      borderColor: isDark ? '#333' : '#ccc',
    },
    // Убрали отсюда фиксированный фон
    radioText: { 
      fontSize: 12,
      color: isDark ? '#8e8e93' : '#666',
      fontWeight: '600',
    },
    radioTextActive: { 
      color: isDark ? '#000' : '#fff',
    },
  });
};
