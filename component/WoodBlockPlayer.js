import React, {useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';

const setupPlayer = async () => {
  // Set up the player
  await TrackPlayer.setupPlayer();

  // Add a track to the queue
  await TrackPlayer.add({
    id: 'trackId',
    url: require('../assets/sounds/track.mp3'),
    title: 'Track Title',
    artist: 'Track Artist',
    artwork: require('track.png'),
  });

  // Start playing it
  await TrackPlayer.play();
};

const WoodBlockPlayer = () => {
  useEffect(() => {
    setupPlayer();
  }, []);
};
export default WoodBlockPlayer;
