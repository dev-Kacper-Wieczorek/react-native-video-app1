import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import HomeScreen, { homeScreenOptions } from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import DetailScreen from './src/screens/DetailScreen';
import { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={homeScreenOptions} 
        />
        <Stack.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{ title: 'Search' }}
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
