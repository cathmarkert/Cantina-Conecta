import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// Telas
import Extrato from '../screens/extrato';
import PaymentScreen from '../screens/pagamento';
import ListaPedidos from '../screens/listaPedidos';
import Estoque from '../screens/estoque';

// Rotas
import HomeOwnerStack from './homeOwnerStack';

// Headers
import Header from '../components/header';

const Tab = createBottomTabNavigator();

const HomeOwnerTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={({ route }) => ({
                tabBarShowLabel: true,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Inicio') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Estoque') {
                        iconName = focused ? 'layers' : 'layers-outline';
                    } else if (route.name === 'Programados') {
                        iconName = focused ? 'list' : 'list-outline';
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
                name="Estoque"
                component={Estoque}
                options={{
                    tabBarLabel: 'Estoque',
                    header: () => <Header />,
                }}
            />
            <Tab.Screen
                name="Inicio"
                component={HomeOwnerStack}
                options={{
                    tabBarLabel: 'Inicio',
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Programados"
                component={ListaPedidos}
                options={{
                    tabBarLabel: 'Programados',
                    header: () => <Header />,
                }}
            />
        </Tab.Navigator>
    );
}

export default HomeOwnerTabs;