import { StyleSheet, Text, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Login from './src/screens/login';
import Home from './src/screens/home';
import Extrato from './src/screens/extrato';
import LanchesProgramados from './src/screens/lanchesProgramados'
import PaymentScreen from './src/screens/pagamento';
import Parent from './src/screens/parentprofile';
import Dependente from './src/screens/childprofile';
import Limitchange from './src/screens/childchange';
import AddChild from './src/screens/addchild';

import HeaderSaldo from './src/components/headerSaldo';
import HeaderBack from './src/components/headerBack';
import HeaderHome from './src/components/header';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => <HeaderSaldo />, // Usando HeaderSaldo como header
        }}
      />
      <HomeStack.Screen
        name="Extrato"
        component={Extrato}
        options={{
          header: () => <HeaderBack />,
        }}
      />
      <HomeStack.Screen
        name="LanchesProgramados"
        component={LanchesProgramados}
        options={{
          header: () => <HeaderBack />,
        }}
      />
    </HomeStack.Navigator>
  );
}

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
          header: () => <HeaderHome />,
        }}
      />
      <Tab.Screen
        name="Inicio"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Inicio',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Pagamento"
        component={PaymentScreen}
        options={{
          tabBarLabel: 'Pagamento',
          header: () => <HeaderHome />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTab" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Parent" component={Parent} options={{ headerShown: false }} />
        <Stack.Screen name="Dependente" component={Dependente} options={{ headerShown: false }} />
        <Stack.Screen name="LimitChange" component={Limitchange} options={{ headerShown: false }} />
        <Stack.Screen name="AddChild" component={AddChild} options={{ headerShown: false }} />
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