import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Telas
import Parent from '../screens/parentprofile';
import Dependente from '../screens/childprofile';
import Limitchange from '../screens/childchange';
import AddChild from '../screens/addchild';
import ExtratoChild from '../screens/extratochild';

// Headers
import HeaderBack from '../components/headerBack';

const PerfilStack = createStackNavigator();

const PerfilStackScreen = () => {
    return (
        <PerfilStack.Navigator>
            <PerfilStack.Screen
                name="Parent"
                component={Parent}
                options={{
                    header: () => <HeaderBack />,
                }}
            />
            <PerfilStack.Screen
                name="Dependente"
                component={Dependente}
                options={{
                    header: () => <HeaderBack />,
                }}
            />
            <PerfilStack.Screen
                name="LimitChange"
                component={Limitchange}
                options={{
                    header: () => <HeaderBack />,
                }}
            />
            <PerfilStack.Screen
                name="AddChild"
                component={AddChild}
                options={{
                    header: () => <HeaderBack />,
                }}
            />
            <PerfilStack.Screen
                name="ExtratoChild"
                component={ExtratoChild}
                options={{
                    header: () => <HeaderBack />,
                }}
            />
        </PerfilStack.Navigator>
    );
}

export default PerfilStackScreen;