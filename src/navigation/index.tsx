import React from 'react'
import Login from 'pages/Login';
import Home from 'pages/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'utils/RootStackParams';

const Stack = createNativeStackNavigator<RootStackParamList>();

const routes: Array<React.ComponentProps<typeof Stack.Screen>> = [
  {
    name: "Login",
    component: Login,
  },
  {
    name: "Home",
    component: Home
  }
]

function Navigation() {

  return (
    <Stack.Navigator>
      {routes.map((routeConfig) => (
        <Stack.Screen key={routeConfig.name} {...routeConfig} options={{headerShown: false}} />
      ))}
    </Stack.Navigator>
  )
}

export default Navigation