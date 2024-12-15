import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Убирает верхний заголовок
        tabBarStyle: { display: 'none' }, // Убирает нижнюю таб-бар
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Главная' }} />
      <Tabs.Screen name="quiz" options={{ title: 'Викторина' }} />
    </Tabs>
  );
}
