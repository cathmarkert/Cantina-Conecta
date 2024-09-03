import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Telas
import Home from '../screens/home';
import Extrato from '../screens/extrato';
import LanchesProgramados from '../screens/lanchesProgramados';


// Rotas
import PerfilStackScreen from './perfilStack';

// Headers
import HeaderSaldo from '../components/headerSaldo';
import HeaderBack from '../components/headerBack';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={Home}
                options={{
                    header: () => <HeaderSaldo />,
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
            <HomeStack.Screen
                name="PerfilStack"
                component={PerfilStackScreen}
                options={{ headerShown: false }}
            />
        </HomeStack.Navigator>
    );
}

export default HomeStackScreen;