import { Feather as Icon } from '@expo/vector-icons'
import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import Video from 'react-native-video'

const { width, height } = Dimensions.get('screen')
const VIDEO_HEIGHT = height * 0.7
const VIDEO_WIDTH = width * 0.7

const Page = ({
    backgroundColor,
    color,
    title,
    videoLink,
    imageLink,
    description,
}) => {
    const videoRef = React.useRef(null)
    // const videoToPlay = require('../../../assets/videos/onboarding/1_SelectUnits.mp4');

    return (
        // <View
        //   style={{
        //     flex: 1,
        //     justifyContent: "center",
        //     alignItems: "center",
        //     backgroundColor,
        //   }}
        // >
        <View
            style={[
                styles.slideContainer,
                { backgroundColor: backgroundColor },
            ]}
        >
            {!!imageLink && <Image style={styles.video} source={imageLink} />}
            {!!videoLink && (
                <Video
                    ref={videoRef}
                    muted={true}
                    rate={0.8}
                    repeat={true}
                    shouldPlay
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
        // backgroundColor: "#ffc93c",
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

        // fontFamily: 'San Francisco',

        // fontFamily: 'Roboto',
        fontFamily: 'Helvetica Neue',
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
    // previous
    innerContainer: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
    },
    innerBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
    },
    backgroundViewWrapper: {
        // ...StyleSheet.absoluteFillObject,
    },
})

export default Page
