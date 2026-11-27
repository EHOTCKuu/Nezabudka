import { StyleSheet } from 'react-native';

export const statusBadgeStyles = StyleSheet.create({
  interactiveRow: {
    marginVertical: 12,
    width: '100%', // Занимает всю ширину родителя
  },
  statusBadgeLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18, // Делаем кнопку выше и солиднее
    borderRadius: 16,
    borderWidth: 2,
    gap: 12,
    width: '100%', // Растягиваем внутренний контейнер
  },
  statusTextLarge: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
