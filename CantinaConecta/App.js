import { StyleSheet, Text,} from 'react-native';
import Login from './src/screens/login';
import Home from './src/screens/home';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from "@expo/vector-icons";
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
    <Tab.Navigator

      screenOptions={({ route }) => ({
        tabBarShowLabel:true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Buscar') {
            iconName = focused 
              ? 'search'
              : 'search-outline';
          } else if (route.name === 'Pagamento') {
            iconName = focused 
              ? 'cash'
              : 'cash-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },

        tabBarIconStyle: {
          size: 10, // Tamanho do ícone
        },
        
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray'
      
      })}
  
    >
      <Tab.Screen 
        name="Buscar" 
        component={Home}  
        options={{ 
          tabBarLabel: 'Buscar',
          headerShown: false, 
          // tabBarIcon: ({ color, size }) => (
          // <Icon name={'search'} size={size} color={color} />)   
        }}
      />
      <Tab.Screen
        name="Inicio" 
        component={Home}  
        options={{ 
          tabBarLabel: 'Inicio',
          headerShown: false, 
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="home"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            );
          },
        }}
      />
      <Tab.Screen 
        name="Pagamento" 
        component={Home}  
        options={{ 
          tabBarLabel: 'Pagamento',
          headerShown: false, 
          // tabBarIcon: ({ color, size }) => (
          // <Icon name={'cash'} size={size} color={color} />)
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
