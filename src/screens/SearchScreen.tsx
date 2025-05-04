import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { searchVideos } from '../api/youtube';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: { medium: { url: string } };
  };
}

const SearchScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'Search'>>();

  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    if (route.params?.query) {
      setQuery(route.params.query);
      handleSearch(route.params.query);
    }
  }, [route.params?.query]);

  const handleSearch = async (customQuery?: string) => {
    const finalQuery = customQuery || query;
    if (!finalQuery.trim()) return;

    try {
      const results = await searchVideos(finalQuery);
      setVideos(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handlePress = (videoId: string) => {
    navigation.navigate('Detail', { videoId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image source={require('../../assets/icons/search-icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search for videos..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => handleSearch()}
        />
      </View>

      <TouchableOpacity style={styles.sortContainer}>
        <Image source={require('../../assets/icons/clock-icon.png')} style={styles.iconSmall} />
        <Text style={styles.sortText}>Sort by: Latest</Text>
      </TouchableOpacity>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.videoId}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id.videoId)}>
            <View style={styles.videoCard}>
              <Image
                source={{ uri: item.snippet.thumbnails.medium.url }}
                style={styles.thumbnail}
              />
              <Text style={styles.title}>{item.snippet.title}</Text>
              <View style={styles.metaRow}>
                <Image source={require('../../assets/icons/person-icon.png')} style={styles.metaIcon} />
                <Text style={styles.channel}>{item.snippet.channelTitle}</Text>
              </View>
              <View style={styles.metaRow}>
                <Image source={require('../../assets/icons/views-icon.png')} style={styles.metaIcon} />
                <Text style={styles.metaText}>12K views</Text>
                <Image source={require('../../assets/icons/likes-icon.png')} style={[styles.metaIcon, styles.likeIcon]} />
                <Text style={styles.metaText}>1.5K likes</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  iconSmall: {
    width: 18,
    height: 18,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sortText: {
    marginLeft: 6,
    color: '#555',
  },
  videoCard: {
    marginBottom: 20,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontWeight: '600',
    marginTop: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  metaIcon: {
    width: 16,
    height: 16,
  },
  metaText: {
    marginLeft: 4,
    marginRight: 10,
    color: '#777',
    fontSize: 12,
  },
  channel: {
    marginLeft: 4,
    color: '#333',
    fontSize: 13,
  },
  likeIcon: {
    marginLeft: 10,
  },
});
