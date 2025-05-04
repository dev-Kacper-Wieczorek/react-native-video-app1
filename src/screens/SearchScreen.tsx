import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { searchVideos } from '../api/youtube';

interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: { medium: { url: string } };
  };
}

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);

  const handleSearch = async () => {
    const results = await searchVideos(query);
    setVideos(results);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for videos..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.videoId}
        renderItem={({ item }) => (
          <View style={styles.videoCard}>
            <Image
              source={{ uri: item.snippet.thumbnails.medium.url }}
              style={styles.thumbnail}
            />
            <Text style={styles.title}>{item.snippet.title}</Text>
            <Text style={styles.channel}>{item.snippet.channelTitle}</Text>
          </View>
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
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
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
  channel: {
    color: '#555',
  },
});
