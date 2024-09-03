import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Telas
import Extrato from '../screens/extrato';
import PaymentScreen from '../screens/pagamento';

// Rotas
import HomeStackScreen from './homeStack';

// Headers
import HeaderPerfil from '../components/headerPerfil';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
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
                tabBarActiveTintColor: '#0000FF',
                tabBarInactiveTintColor: '#8285CD',
            })}
        >
            <Tab.Screen
                name="Selecionar"
                component={Extrato}
                options={{
                    tabBarLabel: 'Selecionar',
                    header: () => <HeaderPerfil />,
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
                    header: () => <HeaderPerfil />,
                }}
            />
        </Tab.Navigator>
    );
}

export default HomeTabs;