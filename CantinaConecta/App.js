import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { setupDatabase } from './src/database';

import Login from './src/screens/login';
import HomeTabs from './src/routes/homeTabs';
import HomeOwnerTabs from './src/routes/homeOwnerTabs';

const Stack = createStackNavigator();

export default function App() {
  const [isDbReady, setIsDbReady] = useState(false); // State to track DB readiness

  useEffect(() => {
    // Initialize database
    const initDatabase = async () => {
      try {
        await setupDatabase(); // Setup the database
        setIsDbReady(true); // Once ready, set state to true
      } catch (error) {
        console.error('Database setup error:', error);
      }
    };

    initDatabase(); 
  }, []);

  if (!isDbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="HomeOwnerTabs" component={HomeOwnerTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}