import { StyleSheet, Text,} from 'react-native';
import Login from './src/screens/login';
import Home from './src/screens/home';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Pass = () => {
  return (
    <Text>PASS</Text>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Buscar" 
        component={Pass}  
        options={{ 
          tabBarLabel: 'Buscar',
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
          <Icon name="search" size={size} color="#000" />)   
        }}
      />
      <Tab.Screen
        name="Inicio" 
        component={Home}  
        options={{ 
          tabBarLabel: 'Inicio',
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />),  
        }}
      />
      <Tab.Screen 
        name="Pagamento" 
        component={Pass}  
        options={{ 
          tabBarLabel: 'Pagamento',
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
          <Icon name="credit-card" color={color} size={size} />),  
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
            <Stack.Screen name="HomeTab" component={HomeTabs}  options={{ headerShown: false  }}/>
          </Stack.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
