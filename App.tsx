import React from 'react';
import theme from './src/global/styles/theme';
import AppLoading from 'expo-app-loading';

import { ThemeProvider } from 'styled-components';
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import { AppRoutes } from './src/routes/app.routes';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from './src/screens/SignIn';
import { AuthProvider } from './src/hook/auth';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={ theme }>
      <NavigationContainer>
        <SafeAreaProvider >
          <AuthProvider>
            <SignIn />
          </AuthProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </ThemeProvider>
  )
}
