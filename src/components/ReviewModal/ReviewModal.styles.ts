import { StyleSheet } from 'react-native';

export const getReviewModalStyles = (isDark: boolean) => {
  return StyleSheet.create({
    modalOverlay: { 
      flex: 1, 
      backgroundColor: 'rgba(0, 0, 0, 0.7)', 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    modalContent: { 
      width: '85%', 
      borderRadius: 20, 
      padding: 20,
      backgroundColor: isDark ? '#1c1c1e' : '#fff'
    },
    modalTitle: { 
      fontSize: 18, 
      fontWeight: 'bold', 
      textAlign: 'center', 
      marginBottom: 20,
      color: isDark ? '#fff' : '#000'
    },
    label: { 
      fontSize: 14, 
      fontWeight: '600', 
      marginBottom: 8,
      color: isDark ? 'rgba(255,255,255,0.6)' : '#666'
    },
    starsRow: { 
      flexDirection: 'row', 
      justifyContent: 'center', 
      gap: 10, 
      marginBottom: 10 
    },
    textInput: { 
      width: '100%', 
      minHeight: 100, 
      borderRadius: 12, 
      borderWidth: 1, 
      padding: 12, 
      fontSize: 14,
      backgroundColor: isDark ? '#2c2c2e' : '#f2f2f7', 
      color: isDark ? '#fff' : '#000',
      borderColor: isDark ? '#444' : '#e5e5ea'
    },
    buttonsRow: { 
      flexDirection: 'row', 
      justifyContent: 'flex-end', 
      gap: 10, 
      marginTop: 20 
    },
    btn: { 
      paddingVertical: 10, 
      paddingHorizontal: 20, 
      borderRadius: 10 
    },
    btnText: {
      fontWeight: 'bold'
    }
  });
};
