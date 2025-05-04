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
import PersonIcon from '../../assets/icons/person-icon.svg';
import HomeIcon from '../../assets/icons/home-icon.svg';
import NotificationIcon from '../../assets/icons/notification-icon.svg';
import LikesIcon from '../../assets/icons/likes-icon.svg';
import ViewsIcon from '../../assets/icons/views-icon.svg';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <PersonIcon width={28} height={28} />
        <Text style={styles.welcome}>Welcome, Kacper 👋</Text>
      </View>
      <Text style={styles.subtext}>Choose a category to start learning</Text>

      <View style={styles.iconRow}>
        <HomeIcon width={28} height={28} />
        <NotificationIcon width={28} height={28} style={{ marginLeft: 16 }} />
        <LikesIcon width={28} height={28} style={{ marginLeft: 16 }} />
        <ViewsIcon width={28} height={28} style={{ marginLeft: 16 }} />
      </View>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subtext: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  iconRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
});
