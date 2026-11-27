import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="add-movie" 
        options={{ 
          presentation: 'modal', // Магия шторки тут
          headerShown: false,
          title: 'Поиск фильма'
        }} 
      />
    </Stack>
  );
}