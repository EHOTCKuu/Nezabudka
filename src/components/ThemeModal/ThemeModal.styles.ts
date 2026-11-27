import { StyleSheet } from 'react-native';

export const getThemeModalStyles = (isDark: boolean) => {
  return StyleSheet.create({
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.85)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999, 
      elevation: 100, // Для Android
    },
    modalContent: { 
      width: '85%', 
      backgroundColor: isDark ? '#1c1c1e' : '#fff', 
      borderRadius: 20, 
      padding: 25, 
      borderWidth: 1, 
      borderColor: isDark ? '#333' : '#e5e5e5',
    },
    modalTitle: { 
      fontSize: 18, 
      fontWeight: 'bold', 
      textAlign: 'center', 
      marginBottom: 20 
    },
    settingsOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#2c2c2e' : '#f2f2f7',
      width: '100%', 
    },
    modalInputLabel: {
      fontSize: 16,
      fontWeight: '600',
      flex: 1,
      marginRight: 10,
    },
    radioOuter: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: isDark ? '#555' : '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioActive: { 
      borderColor: '#007AFF' 
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#007AFF',
    },
    modalBtn: { 
      paddingVertical: 12, 
      paddingHorizontal: 20, 
      borderRadius: 10, 
      backgroundColor: '#007AFF',
      alignItems: 'center',
      marginTop: 20,
    },
    btnText: { 
      color: '#fff', 
      fontWeight: 'bold',
      fontSize: 14,
      letterSpacing: 1,
    },
  });
};
