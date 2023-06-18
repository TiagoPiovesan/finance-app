import React from 'react';
import theme from './src/global/styles/theme';
import AppLoading from 'expo-app-loading';
// import 'intl'
// import 'intl/locale-data-jsonp/pt-BR'

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
          < SignIn />
        </SafeAreaProvider>
      </NavigationContainer>
    </ThemeProvider>
  )
}
