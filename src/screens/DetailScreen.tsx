import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

const DetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const { videoId } = route.params || {};
  const playerRef = useRef<VideoRef>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const videoSource = videoId
    ? { uri: `https://www.youtube.com/watch?v=${videoId}` }
    : require('../../assets/video/broadchurch.mp4');

  const togglePlayPause = () => setIsPlaying(prev => !prev);
  const toggleMute = () => setIsMuted(prev => !prev);

  return (
    <View style={styles.container}>
      <Video
        ref={playerRef}
        source={videoSource}
        style={styles.video}
        controls
        paused={!isPlaying}
        muted={isMuted}
        resizeMode="contain"
      />

      <View style={styles.controls}>
        <ControlButton onPress={togglePlayPause}>
          <Image
            source={
              isPlaying
                ? require('../../assets/icons/pause-icon.png')
                : require('../../assets/icons/play-icon.png')
            }
            style={styles.icon}
          />
        </ControlButton>

        <ControlButton onPress={toggleMute}>
          <Image
            source={require('../../assets/icons/volume-icon.png')}
            style={styles.icon}
          />
        </ControlButton>

        <ControlButton onPress={() => playerRef.current?.seek(0)}>
          <Image
            source={require('../../assets/icons/backward-icon.png')}
            style={styles.icon}
          />
        </ControlButton>

        <ControlButton onPress={() => playerRef.current?.seek(60)}>
          <Image
            source={require('../../assets/icons/forward-icon.png')}
            style={styles.icon}
          />
        </ControlButton>

        <ControlButton onPress={() => playerRef.current?.presentFullscreenPlayer()}>
          <Image
            source={require('../../assets/icons/fullscreen-icon.png')}
            style={styles.icon}
          />
        </ControlButton>

        <ControlButton onPress={() => console.log('AirPlay')}>
          <Image
            source={require('../../assets/icons/airplay-icon.png')}
            style={styles.icon}
          />
        </ControlButton>
      </View>
    </View>
  );
};

const ControlButton = ({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

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
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
    gap: 16,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#1c1c1e',
    padding: 12,
    borderRadius: 10,
    margin: 6,
    elevation: 3,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
