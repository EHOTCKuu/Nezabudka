import { StyleSheet, Platform, StatusBar } from 'react-native';

export const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  headerWrapper: { backgroundColor: '#000', paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 10, borderBottomWidth: 1, borderBottomColor: '#1c1c1e', paddingBottom: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  cancelBtn: { color: '#007AFF', fontSize: 16 },
  typeSelector: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 12, gap: 10 },
  typeBtn: { paddingVertical: 6, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#1c1c1e' },
  activeBtn: { backgroundColor: '#007AFF' },
  activeText: { color: '#FFF', fontWeight: 'bold' },
  inactiveText: { color: '#8E8E93' },
  modeSelector: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingBottom: 12 },
  modeBtn: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#1c1c1e', borderWidth: 1, borderColor: '#333' },
  activeModeBtn: { backgroundColor: '#5856D6', borderColor: '#5856D6' },
  modeText: { fontSize: 11, color: '#FFF', fontWeight: '600' },
  inputWrapper: { paddingHorizontal: 16 },
  input: { backgroundColor: '#1c1c1e', borderRadius: 12, paddingHorizontal: 15, height: 46, fontSize: 16, color: '#FFF' },
  limitContainer: { marginTop: 8 },
  limitText: { fontSize: 10, color: '#444', marginBottom: 4 },
  limitBarBg: { height: 2, backgroundColor: '#1c1c1e' },
  limitBarFill: { height: '100%', backgroundColor: '#007AFF' },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
    fontSize: 14,
    lineHeight: 20,
  },
  bottomActions: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 54,
    // Тень для iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    // Тень для Android
    elevation: 2,
  },
  inputInline: {
    flex: 1,
    height: '100%',
    fontSize: 17,
  },
  searchIconBtn: {
    paddingLeft: 10,
    justifyContent: 'center',
  },
  headerBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // Тень в стиле FAB
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  headerBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  backIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18, // Идеальный круг
    justifyContent: 'center',
    alignItems: 'center',
    // Тень в стиле FAB
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  wideBackBtn: {
    flexDirection: 'row', // Ставим стрелку и текст в один ряд
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12, // Дает ширину кнопке
    borderRadius: 12, // Скругленные углы капсулы
    // Тень в стиле FAB
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  wideBackBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  
});
