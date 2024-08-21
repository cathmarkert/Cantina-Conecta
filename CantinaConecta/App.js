import { StyleSheet, Text,} from 'react-native';
import Login from './src/screens/login';
import Home from './src/screens/home';
import Extrato from './src/screens/extrato';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PaymentScreen from './src/screens/pagamento';
import Parent from './src/screens/parentprofile';
import Dependente from './src/screens/childprofile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Selecionar') {
            iconName = focused ? 'pricetags' : 'pricetags-outline';
          } else if (route.name === 'Pagamento') {
            iconName = focused ? 'cash' : 'cash-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },

        tabBarStyle: {
          height: 60,
          paddingTop: 5, 
          paddingBottom: 5,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },

        tabBarIconStyle: {
          size: 10,
        },
        
        tabBarActiveTintColor: '#0000FF',
        tabBarInactiveTintColor: '#8285CD'
      
      })}
    >
      <Tab.Screen 
        name="Selecionar" 
        component={Extrato}  
        options={{ 
          tabBarLabel: 'Selecionar',
          headerShown: false, 
          // tabBarIcon: ({ color, size }) => (
          // <Icon name={'pricetags-outline'} size={size} color={color} />)   
        }}
      />
      <Tab.Screen
        name="Inicio" 
        component={Home}  
        options={{ 
          tabBarLabel: 'Inicio',
          headerShown: false, 
          // tabBarIcon: ({ color, size }) => (
          //   <Icon name={'home'} size={size} color={color} />)
        }}
      />
      <Tab.Screen 
        name="Pagamento" 
        component={PaymentScreen}  
        options={{ 
          tabBarLabel: 'Pagamento',
          headerShown: false, 
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
            <Stack.Screen name="Parent" component={Parent} options={{ headerShown: false }} />
            <Stack.Screen name="Dependente" component={Dependente} options={{ headerShown: false }} />
            {/* <Stack.Screen name="Pagamento" component={PaymentScreen} /> */}
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