import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import CategorySlider from '../components/CategorySlider'
import noiseSounds from '../model/data' // Only Noise

export const MatrixPlayer = () => {
  const [globalIsPlaying, setGlobalIsPlaying] = useState(false)

  return (
    <View style={styles.container}>
      <CategorySlider
        data={noiseSounds}
        title="Ambient Noise"
        // Always active because there is only one deck
        isActiveCategory={true}
        isPlaying={globalIsPlaying}
        onTogglePlay={setGlobalIsPlaying}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'black'},
})
