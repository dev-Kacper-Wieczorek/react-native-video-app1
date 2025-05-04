import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const categories = ['React Native', 'React', 'TypeScript', 'JavaScript'];

const CategoryList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCategoryPress = (query: string) => {
    navigation.navigate('Search', { query });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Categories</Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleCategoryPress(item)}>
            <Text style={styles.cardText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.showMoreBtn}
        onPress={() => navigation.navigate('Search', { query: '' })}
      >
        <Text style={styles.showMoreText}>Show more →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: { marginTop: 30 },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#eee',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
  showMoreBtn: {
    marginTop: 10,
  },
  showMoreText: {
    color: '#007bff',
    fontWeight: '500',
    fontSize: 16,
  },
});
