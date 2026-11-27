import { StyleSheet } from 'react-native';

export const getSearchStyles = (isDark: boolean) => {
  return StyleSheet.create({
    searchBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 1,
      height: 44,
      paddingHorizontal: 12,
      backgroundColor: isDark ? '#1c1c1e' : '#FFFFFF',
      borderColor: isDark ? '#333' : '#E5E5EA',
    },
    inputInline: {
      flex: 1,
      height: '100%',
      fontSize: 15,
      color: isDark ? '#FFF' : '#000',
    },
    searchIconBtn: {
      padding: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
