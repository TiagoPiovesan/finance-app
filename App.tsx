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
import SignIn from './src/screens/SignIn';
import { AuthProvider, useAuth } from './src/hook/auth';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  const { userStorageLoadding } = useAuth()

  if(!fontsLoaded || userStorageLoadding) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={ theme }>
        <SafeAreaProvider >
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </SafeAreaProvider>
    </ThemeProvider>
  )
}
