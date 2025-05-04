import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Video from 'react-native-video';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const DetailScreen = () => {
  const route = useRoute<DetailRouteProp>();
  const { videoId } = route.params || {};

  const videoSource = videoId
    ? { uri: `https://www.youtube.com/watch?v=${videoId}` }
    : require('../../assets/video/broadchurch.mp4');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Player</Text>
      <Video
        source={videoSource}
        style={styles.video}
        controls
        resizeMode="contain"
      />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  video: {
    width: '100%',
    height: 250,
  },
  title: {
    color: '#fff',
    marginBottom: 12,
    fontSize: 18,
  },
});
