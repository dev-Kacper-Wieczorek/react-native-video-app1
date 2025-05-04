import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const categories = [
  { id: '1', label: 'React Native', icon: require('../../assets/icons/home-icon.png'), query: 'react native' },
  { id: '2', label: 'React', icon: require('../../assets/icons/person-icon.png'), query: 'react' },
  { id: '3', label: 'JavaScript', icon: require('../../assets/icons/views-icon.png'), query: 'javascript' },
  { id: '4', label: 'TypeScript', icon: require('../../assets/icons/play-icon.png'), query: 'typescript' },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleShowMore = () => {
    navigation.navigate('Search', { query: '' });
  };

  const handleCategoryPress = (query: string) => {
    navigation.navigate('Search', { query });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.subtext}>Choose a category to start learning</Text>

      <Text style={styles.sectionTitle}>Popular Categories</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(item.query)}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text>{item.label}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity onPress={handleShowMore}>
        <Text style={styles.showMore}>Show more →</Text>
      </TouchableOpacity>
    </View>
  );
};

export const homeScreenOptions: NativeStackNavigationOptions = {
  title: 'Home',
  headerRight: () => (
    <TouchableOpacity onPress={() => console.log('Settings pressed')} style={{ marginRight: 16 }}>
      <Image
        source={require('../../assets/icons/settings-icon.png')}
        style={{ width: 24, height: 24 }}
      />
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 10,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: 6,
  },
  showMore: {
    color: '#007AFF',
    marginTop: 16,
    fontWeight: '500',
  },
});
