import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { useTheme } from 'styled-components';
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){
  const theme = useTheme();

  return (
    <Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          flexDirection: "row",
          paddingVertical: Platform.OS === 'ios' ? 10 : 0,
          height: 88,
        }
      }} >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarLabelStyle: {
            fontFamily: theme.fonts.medium
          },
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ))
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarLabelStyle: {
            fontFamily: theme.fonts.medium
          },
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="attach-money"
              size={size}
              color={color}
            />
          ))
        }}
      />
      <Screen
        name="Resumo"
        component={Register}
        options={{
          tabBarLabelStyle: {
            fontFamily: theme.fonts.medium
          },
          tabBarBadge: 0,
          tabBarBadgeStyle: {
            backgroundColor: theme.colors.success
          },
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="pie-chart"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </Navigator>
  );
}
