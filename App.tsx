import React from 'react';
import theme from './src/global/styles/theme';
import AppLoading from 'expo-app-loading';

import { Dashboard } from './src/screens/Dashboard';
import { Register } from './src/screens/Register';
import { CategorySelect } from './src/screens/CategorySelect';

import { ThemeProvider } from 'styled-components';
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

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
      <SafeAreaProvider >
        <CategorySelect />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
