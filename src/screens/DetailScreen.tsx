import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

const DetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const { videoId } = route.params || {};

  const videoSource = videoId
    ? { uri: `https://www.youtube.com/watch?v=${videoId}` } 
    : require('../../assets/video/broadchurch.mp4');

  return (
    <View style={styles.container}>
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
  },
  video: {
    width: Dimensions.get('window').width,
    height: 250,
  },
});
