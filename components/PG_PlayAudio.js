import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { Audio } from "expo-av";

export default PG_PlayAudio = () => {
  // let [playbackInstance] = useState(null);
  let playbackInstance = null;

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingsIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });
    //  This function will be called
    _loadNewPlaybackInstance(true);
    return () => {
      playbackInstance.unloadAsync();
      //  Check Your Console To verify that the above line is working
      // console.log("unmount");
    }
  }, []);



  const _loadNewPlaybackInstance = async playing => {
    if (playbackInstance != null) {
      await playbackInstance.unloadAsync();
      playbackInstance.setOnPlaybackStatusUpdate(null);
      playbackInstance = null;
    }
    const source = require("../assets/sounds/ding.mp3");
    const initialStatus = {
      //        Play by default
      shouldPlay: true,
      //        Control the speed
      rate: 1.0,
      //        Correct the pitch
      shouldCorrectPitch: true,
      //        Control the Volume
      volume: 1.0,
      //        mute the Audio
      isMuted: false
    };
    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialStatus
    );
    //  Save the response of sound in playbackInstance
    playbackInstance = sound;
    //  Make the loop of Audio
    playbackInstance.setIsLoopingAsync(false);
    //  Play the Music
    playbackInstance.playAsync();
  };

  return null;
};
