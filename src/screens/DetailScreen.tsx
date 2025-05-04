import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

import PlayIcon from '../../assets/icons/play-icon.svg';
import PauseIcon from '../../assets/icons/pause-icon.svg';
import VolumeIcon from '../../assets/icons/volume-icon.svg';
import AirplayIcon from '../../assets/icons/airplay-icon.svg';
import ForwardIcon from '../../assets/icons/forward-icon.svg';
import BackwardIcon from '../../assets/icons/backward-icon.svg';
import FullscreenIcon from '../../assets/icons/fullscreen-icon.svg';

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
          {isPlaying ? <PauseIcon width={24} height={24} /> : <PlayIcon width={24} height={24} />}
        </ControlButton>

        <ControlButton onPress={toggleMute}>
          <VolumeIcon width={24} height={24} />
        </ControlButton>

        <ControlButton onPress={() => playerRef.current?.seek(0)}>
          <BackwardIcon width={24} height={24} />
        </ControlButton>

        <ControlButton onPress={() => playerRef.current?.seek(60)}>
          <ForwardIcon width={24} height={24} />
        </ControlButton>

        <ControlButton onPress={() => playerRef.current?.presentFullscreenPlayer()}>
          <FullscreenIcon width={24} height={24} />
        </ControlButton>

        <ControlButton onPress={() => console.log('AirPlay')}>
          <AirplayIcon width={24} height={24} />
        </ControlButton>
      </View>
    </View>
  );
};

const ControlButton = ({ children, onPress }: { children: React.ReactNode; onPress: () => void }) => (
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
});
