import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  searchContainer: { padding: 15, backgroundColor: '#000' },
  filterWrapper: { paddingHorizontal: 15, paddingBottom: 15, backgroundColor: '#000', gap: 8 },
  
  // Карточка фильма
  movieItem: { marginHorizontal: 16, marginVertical: 8, borderRadius: 16, minHeight: 140, overflow: 'hidden', backgroundColor: '#1a1a1a', elevation: 5 },
  cardContent: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: 'rgba(0,0,0,0.5)' },
  miniPoster: { width: 60, height: 90, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.1)' },
  movieInfo: { flex: 1, marginLeft: 15, paddingVertical: 10 },
  movieTitle: { fontSize: 17, fontWeight: 'bold', color: '#fff', lineHeight: 22 },
  movieYearText: { color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 4 },
  
  // Серии
  seriesRowContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  seriesBadge: { backgroundColor: 'rgba(0, 122, 255, 0.2)', color: '#007AFF', fontSize: 12, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, fontWeight: 'bold', borderWidth: 1 },
  plusOneBtn: { backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginLeft: 8, borderWidth: 1 },
  plusOneText: { color: '#007AFF', fontSize: 12, fontWeight: 'bold' },
  dateText: { fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 10, fontStyle: 'italic' },

  // Статусы
  statusBadge: { width: 100, height: 60, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  watchingGlass: { backgroundColor: 'rgba(243, 156, 18, 0.15)', borderColor: 'rgba(243, 156, 18, 0.4)' },
  unwatchedGlass: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' },
  statusText: { fontSize: 13, fontWeight: '900' },

  // Кнопки FAB
  fab: {
    position: 'absolute',
    right: 20,
    bottom: Platform.OS === 'ios' ? 100 : 85, 
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center', alignItems: 'center',
    elevation: 8, shadowColor: '#007AFF', shadowOpacity: 0.4, shadowRadius: 10, zIndex: 999,
    borderWidth: 2, borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  settingsFab: {
    position: 'absolute',
    left: 20,
    bottom: Platform.OS === 'ios' ? 100 : 85,
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#1c1c1e',
    justifyContent: 'center', alignItems: 'center',
    elevation: 8, zIndex: 999, borderWidth: 1, borderColor: '#333',
  },
  
  // Свайп и Градиенты
  deleteAction: { backgroundColor: '#ff4757', justifyContent: 'center', alignItems: 'center', width: 90 },
  deleteActionText: { color: '#fff', fontWeight: 'bold' },
  gradientMovie: { ...StyleSheet.absoluteFillObject, backgroundColor: '#1e3799' },
  gradientSeries: { ...StyleSheet.absoluteFillObject, backgroundColor: '#6c5ce7' },
});
