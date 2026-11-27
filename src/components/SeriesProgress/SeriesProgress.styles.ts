import { StyleSheet } from 'react-native';

export const seriesStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
    textAlign: 'center',
  },
  plusBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});
