import { StyleSheet, Platform } from 'react-native';

export const tabStyles = StyleSheet.create({
  // 📱 РАЗДЕЛ 1: СТИЛИ ДЛЯ САМОЙ ПАНЕЛИ МЕНЮ (TAB BAR)
  tabBar: {
    position: 'absolute', // Делает панель плавающей поверх контента
    borderTopWidth: 1,    // Оставляем ширину рамки (цвет задается в JSX)
    
    // Адаптивная высота под разные операционные системы
    height: Platform.OS === 'ios' ? 88 : 65,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    paddingTop: 10,
    
    elevation: 0, // Убирает стандартную тень на Android
  },
  
  // 🔤 РАЗДЕЛ 2: СТИЛИ ДЛЯ ПОДПИСЕЙ КНОПОК
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2, // Небольшой отступ от иконки до текста
  }
});
