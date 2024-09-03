import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Telas
import HomeOwner from '../screens/homeowner';
import ExtratoCompras from '../screens/extratoCompras';
import ListaPedidos from '../screens/listaPedidos';
import AddAviso from '../screens/addaviso';


// Headers
import HeaderOwner from '../components/headerOwner';
import HeaderBack from '../components/headerBack';

const HomeStack = createStackNavigator();

const HomeOwnerStack = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="HomeOwner"
                component={HomeOwner}
                options={{
                    header: () => <HeaderOwner />,
                }}
            />
            <HomeStack.Screen
                name="ExtratoCompras"
                component={ExtratoCompras}
                options={{
                    header: () => <HeaderBack />,
                }}
            />

            {/* ADICIONAR EXTRATO PAI AQUI */}

            <HomeStack.Screen
                name="ListaPedidos"
                component={ListaPedidos}
                options={{
                    header: () => <HeaderBack />,
                }}
            />
            <HomeStack.Screen
                name="Aviso"
                component={AddAviso}
                options={{
                    header: () => <HeaderBack />,
                }}
            />
        </HomeStack.Navigator>
    );
}

export default HomeOwnerStack;