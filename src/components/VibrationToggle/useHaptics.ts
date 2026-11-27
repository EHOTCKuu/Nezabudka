import * as Haptics from 'expo-haptics';

export const useHaptics = (isVibrationEnabled: boolean) => {
  // Легкий щелчок для переключателей и смены радио-кнопок
  const triggerLight = async () => {
    if (isVibrationEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  // Виброотклик успеха для кнопки "ГОТОВО"
  const triggerSuccess = async () => {
    if (isVibrationEnabled) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  return { triggerLight, triggerSuccess };
};
