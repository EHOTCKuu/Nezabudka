import { StyleSheet } from 'react-native';

export const getDropdownStyles = (isDark: boolean) => {
  return StyleSheet.create({
    triggerBtn: {
      flex: 1,
      height: 44,
      borderRadius: 12,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      backgroundColor: isDark ? '#1c1c1e' : '#FFFFFF', 
      borderColor: isDark ? '#333' : '#E5E5EA',
    },
    triggerText: {
      fontSize: 13,
      fontWeight: '600',
      flex: 1,
      marginRight: 4,
      color: isDark ? '#FFF' : '#000',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '85%',
      borderRadius: 20,
      padding: 20,
      maxHeight: '70%',
      backgroundColor: isDark ? '#1c1c1e' : '#fff',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    optionItem: {
      paddingVertical: 14,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: isDark ? '#2c2c2e' : '#f2f2f7',
    },
    optionText: {
      fontSize: 15,
    },
  });
};
