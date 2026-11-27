import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  // 📱 РАЗДЕЛ 1: ОСНОВНОЙ КОНТЕЙНЕР ЭКРАНА
  container: {
    flex: 1,
    backgroundColor: '#000', // Тёмный фон по умолчанию
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120, // Большой отступ внизу, чтобы контент не перекрывался таб-баром
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 25,
    marginTop: 10,
  },

  // 📊 РАЗДЕЛ 2: ГЛАВНАЯ КАРТОЧКА ПРОГРЕССА (ВЕРХНЯЯ)
  mainCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    marginBottom: 10,
    textTransform: 'uppercase', // Автоматический перевод в верхний регистр
    letterSpacing: 1,
  },
  progressValue: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden', // Чтобы заполнение не вылезало за скругленные углы
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF', // Синий индикатор (можно перебивать инлайново под тему)
    borderRadius: 4,
  },

  // 🔲 РАЗДЕЛ 3: СЕТКА МАЛЕНЬКИХ КАРТОЧЕК СТАТИСТИКИ
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Разрешает перенос карточек на новую строку
    justifyContent: 'space-between',
  },
  statBox: {
    width: '48%', // Две колонки с небольшим зазором
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center', // Центрирование цифр и текста
  },
  statNum: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '600',
  },

  // 🏆 РАЗДЕЛ 4: БЛОК ТЕКУЩЕГО РАНГА КИНОМАНА
  rankCard: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 18,
    padding: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.2)',
  },
  rankIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  rankTitle: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  rankName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // 📥 РАЗДЕЛ 5: КНОПКА ЭКСПОРТА В .TXT
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 25,
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
    gap: 12,
  },
  exportBtnText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },

  // 🗑️ РАЗДЕЛ 6: КНОПКА СБРОСА БАЗЫ ДАННЫХ
  resetBtn: {
    marginTop: 40,
    alignItems: 'center',
    padding: 15,
  },
  resetBtnText: {
    color: '#ff4757', // Фирменный красный цвет ошибки
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.8,
  },
});
