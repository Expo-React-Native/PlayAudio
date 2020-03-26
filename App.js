import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlayAudio from './components/PlayAudio';
import PG_PlayAudio from './components/PG_PlayAudio';

export default function App() {
  return (
    <View style={styles.container}>
     {/* <PlayAudio /> */}
     <PG_PlayAudio />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
