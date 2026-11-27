import { StyleSheet } from 'react-native';

export const getCounterStyles = (isDark: boolean) => {
  return StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: '92%', // 🎯 Шире
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around', // Распределяем элементы равномерно
      paddingVertical: 14, // 🎯 Выше
      paddingHorizontal: 20,
      borderRadius: 25, // Закругление больше для "жирности"
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#fff',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : '#e5e5ea',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
      marginVertical: 15,
    },
    indicatorItem: {
      flexDirection: 'column', // Элементы друг под другом для солидности
      alignItems: 'center',
      gap: 6,
    },
    circle: {
      width: 18, // 🎯 Крупнее кружки
      height: 18,
      borderRadius: 9,
    },
    number: {
      fontSize: 16, // 🎯 Крупнее шрифт
      fontWeight: '800',
    },
    separator: {
      width: 1,
      height: 25, // Выше разделитель
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : '#e5e5ea',
    }
  });
};
