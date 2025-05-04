import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import SettingsIcon from '../../assets/icons/settings-icon.svg';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, Kacper 👋</Text>
      <Text style={styles.subtext}>Choose a category to start learning</Text>
    </View>
  );
};

export const homeScreenOptions: NativeStackNavigationOptions = {
  title: 'Home',
  headerRight: () => (
    <TouchableOpacity onPress={() => console.log('Settings pressed')} style={{ marginRight: 16 }}>
      <SettingsIcon width={24} height={24} />
    </TouchableOpacity>
  ),
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
});
