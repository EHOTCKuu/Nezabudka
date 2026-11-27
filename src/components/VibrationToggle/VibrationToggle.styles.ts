import { StyleSheet } from 'react-native';

export const getVibrationToggleStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      width: '100%',
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: 12,
      opacity: 0.8,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
    },
    switchOuter: {
      width: 46,
      height: 26,
      borderRadius: 13,
      padding: 3,
      justifyContent: 'center',
    },
    switchDisabled: {
      backgroundColor: '#cccccc',
    },
    switchInner: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2.5,
      elevation: 1.5,
    },
    switchInnerActive: {
      alignSelf: 'flex-end',
    },
    switchInnerInactive: {
      alignSelf: 'flex-start',
    },
  });
};