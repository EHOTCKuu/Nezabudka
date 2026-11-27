import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { useMovieStore } from '../../src/store';
import { Colors } from '../../src/styles/colors';
import { tabStyles } from '../../src/styles/tab-bar.styles';

export default function TabLayout() {
  // 📥 БЛОК 1: ПОЛУЧЕНИЕ ДАННЫХ ИЗ СИСТЕМЫ И СТОРА
  const systemColorScheme = useColorScheme(); // Определяет тему самого телефона (светлая/тёмная)
  const { theme } = useMovieStore();          // Достаёт выбранную пользователем тему из хранилища

  // 🎨 БЛОК 2: РАСЧЁТ ЦВЕТОВОЙ ГАММЫ (ТЕМЫ) ПРИЛОЖЕНИЯ
  // Если выбрана "системная", смотрим на настройки телефона. Иначе берём то, что выбрал пользователь.
  const isDark = theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark';
  const themeColors = isDark ? Colors.dark : Colors.light;

  return (
    // ⚙️ БЛОК 3: НАСТРОЙКА НИЖНЕГО МЕНЮ (TAB BAR)
    <Tabs
      screenOptions={{
        headerShown: false, // Отключаем стандартную верхнюю шапку на всех экранах табов
        
        // Цвета иконок и текста в меню
        tabBarActiveTintColor: themeColors.accent,        // Цвет активной вкладки (зелёный или синий)
        tabBarInactiveTintColor: isDark ? '#555' : '#999', // Цвет неактивной вкладки (серый)
        
        // Стили самой панели меню
        tabBarStyle: [
          tabStyles.tabBar, 
          { 
            backgroundColor: themeColors.tabBar, // Динамический фон панели
            borderTopColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', // Тонкая линия сверху
          }
        ],
        tabBarLabelStyle: tabStyles.tabLabel, // Стили шрифта для подписей вкладок
      }}
    >
      
      {/* 📺 ВКЛАДКА 1: ГЛАВНЫЙ СПИСОК ФИЛЬМОВ */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Мой список',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "film" : "film-outline"} size={24} color={color} />
          ),
        }}
      />
      
      {/* 📊 ВКЛАДКА 2: СТАТИСТИКА */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Статистика',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "stats-chart" : "stats-chart-outline"} size={24} color={color} />
          ),
        }}
      />

      {/* 🛡️ БЛОК 4: СКРЫТЫЕ СЛУЖЕБНЫЕ ЭКРАНЫ */}
      {/* "href: null" скрывает эти экраны из нижнего меню, чтобы на них нельзя было случайно нажать */}
      
      {/* Экран добавления фильмов */}
      <Tabs.Screen name="add-movie" options={{ href: null }} />
      
      {/* Экран подробной карточки фильма (по ID) */}
      <Tabs.Screen name="movie/[id]" options={{ href: null }} />
      
    </Tabs>
  );
}
