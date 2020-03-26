import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { Audio } from "expo-av";

export default class PlayAudio extends React.Component {
  constructor(props) {
    super();
    this.playbackInstance = null;
  }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  UNSAFE_componentWillMount() {}
  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingsIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });
    //  This function will be called
    this._loadNewPlaybackInstance(true);
  }

  componentWillUnmount() {
    this.playbackInstance.unloadAsync();
    //  Check Your Console To verify that the above line is working
    console.log("unmount");
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
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
    this.playbackInstance = sound;
    //  Make the loop of Audio
    this.playbackInstance.setIsLoopingAsync(false);
    //  Play the Music
    this.playbackInstance.playAsync();
  }

  render() {
    return null;
  }
}

const styles = StyleSheet.create({});
