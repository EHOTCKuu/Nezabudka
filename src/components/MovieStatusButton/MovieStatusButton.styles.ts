import { StyleSheet } from 'react-native';

export const statusButtonStyles = StyleSheet.create({
  statusBadge: {
    width: 75,            // Узкая полоска
    height: '100%',       // На всю высоту
    alignItems: 'center',
    justifyContent: 'center',
    // Скругляем только внешние углы (правые)
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.5,
    transform: [{ rotate: '-90deg' }], // Поворот текста
    width: 140, 
    textAlign: 'center',
    position: 'absolute', // Чтобы вращение не раздувало ширину контейнера
  },
});
