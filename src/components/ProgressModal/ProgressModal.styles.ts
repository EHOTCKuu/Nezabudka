import { StyleSheet, Platform } from 'react-native';

export const getModalStyles = (isDark: boolean) => {
  return StyleSheet.create({
    // Стили оверлея и самой карточки модалки
    modalOverlay: {
      position: 'absolute', // Вырываем из обычного потока
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000, // Чтобы точно быть выше всех
    },
    modalContent: {
      width: '85%',
      borderRadius: 20, // Под стиль infoSection
      padding: 20,
      backgroundColor: isDark ? '#1c1c1e' : '#fff',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 13,
      elevation: 20,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    modalInputGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    modalInputLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', // Под стиль label
    },

    // Ваши оригинальные стили степпера
    stepperContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(150,150,150,0.1)',
      borderRadius: 12,
      width: '65%', 
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

    // Стили кнопок
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      gap: 10,
    },
    cancelButton: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 12,
      backgroundColor: 'rgba(255,255,255,0.1)',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    cancelButtonText: {
      color: 'rgba(255,255,255,0.7)',
      fontWeight: 'bold',
      fontSize: 14,
    },
    
    // Ваша кнопка OK по стилю addButton
    saveButton: {
      flex: 1,
      backgroundColor: '#007AFF',
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#007AFF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    saveButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 14,
      letterSpacing: 1,
    },
  });
};
