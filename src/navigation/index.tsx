import React from 'react'
import Login from 'pages/Login';
import Home from 'pages/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'utils/RootStackParams';
import DetailMovie from 'pages/DetailMovie';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="DetailMovie"
        component={DetailMovie}
        initialParams={{ id: 804150 }}
      />
    </Stack.Navigator>
  )
}

export default Navigation