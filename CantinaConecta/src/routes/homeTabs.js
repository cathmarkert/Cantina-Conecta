import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/home';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

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

  export default HomeTabs;