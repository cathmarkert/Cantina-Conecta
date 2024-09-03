import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Telas
import Login from './src/screens/login';

// Rotas
import HomeTabs from './src/routes/homeTabs';
import HomeOwnerTabs from './src/routes/homeOwnerTabs';

const Stack = createStackNavigator();

export default function App() {
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
