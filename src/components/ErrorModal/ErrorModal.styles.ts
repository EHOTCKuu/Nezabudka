import { StyleSheet } from 'react-native';

export const errorModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    padding: 25,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(231, 76, 60, 0.15)', // Мягкий красный фон
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 25,
    lineHeight: 22,
  },
  btn: {
    backgroundColor: '#e74c3c', // Красный цвет кнопки для акцента на ошибке
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff', // Белый текст поверх красной кнопки хорошо читается везде
    fontWeight: 'bold',
    fontSize: 14,
  },
});
