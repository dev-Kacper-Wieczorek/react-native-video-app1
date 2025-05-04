import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CategoryList from '../components/CategoryList';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Kacper 👋</Text>
      <Text style={styles.subtitle}>Choose a category to start learning</Text>
      <CategoryList />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
});
