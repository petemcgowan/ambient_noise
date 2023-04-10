import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import Video from 'react-native-video'

const { width, height } = Dimensions.get('screen')
const VIDEO_HEIGHT = height * 0.7
const VIDEO_WIDTH = width * 0.7

interface PageProps {
  backgroundColor: string
  // pageNumber: number
  color: string
  title: string
  videoLink: string | null
  imageLink: string | null
  description: string
}

const Page = ({
  backgroundColor,
  // pageNumber,
  color,
  title,
  videoLink,
  imageLink,
  description,
}: PageProps) => {
  const videoRef = React.useRef(null)
  // console.log('pageNumber:' + pageNumber)
  // console.log(
  //   'videoPlaying should be:' + (pageNumber === 3 || pageNumber === 4)
  // )
  return (
    <View style={[styles.slideContainer, { backgroundColor: backgroundColor }]}>
      {!!imageLink && <Image style={styles.video} source={imageLink} />}
      {!!videoLink && (
        <Video
          ref={videoRef}
          muted={false}
          rate={0.8}
          repeat={true}
          // shouldPlay={false}
          paused={false}
          style={styles.video}
          source={videoLink}
          resizeMode="contain"
        />
      )}
      <View style={styles.textBoxes}>
        <Text>
          <Text style={[styles.basicFunctionText, { color: color }]}>
            {title} -{' '}
          </Text>
          <Text style={[styles.description, { color: color }]}>
            {description}
          </Text>
        </Text>
      </View>
    </View>
    // </View>
  )
}

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  basicFunctionText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  description: {
    padding: 5,
    fontSize: 18,
    // fontFamily: 'Effra Bold',
    // fontWeight: '400',
    // fontFamily: 'Effra Std Rg',
  },
  video: {
    alignSelf: 'center',
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    marginBottom: 5,
    borderRadius: 40,
  },
  textBoxes: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
  },
})

export default Page
