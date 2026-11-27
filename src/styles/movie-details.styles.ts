import { StyleSheet, Platform } from 'react-native';

export const s = StyleSheet.create({
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16,
    height: 60,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#FFF',
    flex: 1,
    textAlign: 'center',
  },
  content: { 
    padding: 20, 
    alignItems: 'center',
    paddingBottom: 40,
  },
  posterShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 13,
    elevation: 20,
    marginBottom: 30,
  },
  bigPoster: { 
    width: 220, 
    height: 330, 
    borderRadius: 16, 
    backgroundColor: '#333' 
  },
  infoSection: { 
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#FFF', 
    marginBottom: 8,
    textAlign: 'center'
  },
  year: { 
    fontSize: 16, 
    color: 'rgba(255,255,255,0.6)', 
    textAlign: 'center'
  },
  seriesBox: { 
    backgroundColor: 'rgba(0,122,255,0.15)', 
    padding: 15, 
    borderRadius: 14, 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,122,255,0.3)',
  },
  seriesText: { 
    fontSize: 13, 
    color: '#007AFF',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  seriesValue: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginTop: 4 },
  statusRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 10 
  },
  statusText: { 
    marginLeft: 10, 
    fontWeight: '700',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 20,
  },
  date: { 
    fontSize: 12, 
    color: 'rgba(255,255,255,0.4)', 
    textAlign: 'center',
    fontStyle: 'italic' 
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 20,
  },
  ratingValue: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  ratingLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginLeft: 6,
    textTransform: 'uppercase',
  },
  descriptionSection: {
    marginTop: 25,
    paddingHorizontal: 5,
  },
  descriptionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    lineHeight: 22, // Увеличиваем межстрочный интервал для чтения
    textAlign: 'justify',
  },
  rowStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    marginVertical: 15,
  },
  statItem: { alignItems: 'center' },
  statLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 4 },
  statValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  
  subInfo: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
  },  

  // Добавь эти стили в объект s:
  interactiveRow: {
    width: '100%',
    marginVertical: 15,
  },
  statusBadgeLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
  },
  statusTextLarge: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    letterSpacing: 1,
  },
  seriesEditBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
  },
  seriesLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 13, textTransform: 'uppercase' },
  
  
  // Прокидываем цвета из главной
  watchedGlass: { backgroundColor: 'rgba(46, 204, 113, 0.1)', borderColor: 'rgba(46, 204, 113, 0.3)' },
  watchingGlass: { backgroundColor: 'rgba(243, 156, 18, 0.1)', borderColor: 'rgba(243, 156, 18, 0.3)' },
  unwatchedGlass: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' },
  bottomActions: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 10 : 20, // Учитываем отступ на iPhone
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  urlMainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    gap: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'rgba(150,150,150,0.1)',
  },
  urlMainText: {
    fontSize: 14,
    fontWeight: '600',
  },
  linkModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  linkBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  linkBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  linkActionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
  },
  linkActionBtn: {
    flex: 1, // Кнопки будут одинаковой ширины
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  linkActionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(150,150,150,0.1)',
    borderRadius: 12,
    width: '65%', // заменяет modalInputFull
    height: 48,
    paddingHorizontal: 4,
  },
  stepperBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    height: '100%',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#1c1c1e',
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInputFull: { 
    backgroundColor: '#2c2c2e', 
    borderRadius: 10, 
    padding: 12, 
    fontSize: 16, 
    width: '65%', 
    borderWidth: 1, 
    borderColor: '#333', 
    color: '#fff' 
  },
  modalInputGroup: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 15, 
    width: '100%' 
  },
  modalButtons: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    gap: 10,
    marginTop: 10
  },
  modalBtn: { 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 10, 
    backgroundColor: '#3a3a3c' 
  },
});
