import React, { useEffect } from 'react'
import { Text, StyleSheet } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Animated } from 'react-native'

export default function CountdownTimer({
    hours,
    setHours,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    togglePlayback,
    setTimerVisible,
    timerControlsBackgroundColor,
    timerControlsFontColor,
}) {
    const countDownInSecondsLocal = hours * 60 * 60 + minutes * 60 + seconds

    useEffect(() => {}, [])

    const formatRemainingTime = (countDownInSeconds) => {
        // const minutes = Math.floor((time % 3600) / 60);
        // const seconds = time % 60;
        if (countDownInSecondsLocal === countDownInSeconds) {
            // console.log("countDownInSecondsLocal EQUAL to countDownInSeconds:");
            return // no need to reformat
        }

        if (countDownInSeconds === 0) {
            return '00:00'
        }
        // const days = Math.floor(countDownInSeconds / (1000 * 60 * 60 * 24));
        // const hours = Math.floor(
        //     (countDownInSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        // )
        // const minutes = Math.floor(
        //     (countDownInSeconds % (1000 * 60 * 60)) / (1000 * 60)
        // )

        // const seconds = Math.floor(
        //     (countDownInSeconds % (1000 * 60 * 24)) / 1000
        // )

        const hoursMethod2 = Math.floor(countDownInSeconds / 3600)
        const minutesMethod2 = Math.floor((countDownInSeconds % 3600) / 60)
        const secondsMethod2 = countDownInSeconds % 60
        // console.log(
        //     'countDownInSeconds:' +
        //         countDownInSeconds +
        //         ', hoursMethod2:' +
        //         hoursMethod2 +
        //         ', minutesMethod2:' +
        //         minutesMethod2 +
        //         ', secondsMethod2:' +
        //         secondsMethod2
        // )

        let secondString = secondsMethod2
        if (secondsMethod2 < 10) {
            secondString = `0${secondsMethod2}`
        } else {
            secondString = secondsMethod2
        }
        let minuteString = minutesMethod2
        if (minutesMethod2 < 10) {
            minuteString = `0${minutesMethod2}`
        } else {
            minuteString = minutesMethod2
        }
        // console.log("secondString:" + secondString);

        // return `${minutes}:${seconds}`;
        return `${hoursMethod2}:${minuteString}:${secondString}`
    }

    return (
        <CountdownCircleTimer
            isPlaying
            duration={countDownInSecondsLocal}
            size={165}
            updateInterval={0.1}
            strokeWidth={9}
            colors={[
                // timerControlsBackgroundColor,
                // timerControlsFontColor,
                '#9CDE9F',
                '#D1F5BE',
                '#3C91E6',
                '#9FD356',
                '#342E37',
                '#AB814A',
                '#FA824C',
                '#4B3B40',
                '#82735C',
                '#9DB17C',
            ]}
            colorsTime={[
                countDownInSecondsLocal,
                (countDownInSecondsLocal / 9) * 8,
                (countDownInSecondsLocal / 9) * 7,
                (countDownInSecondsLocal / 9) * 6,
                (countDownInSecondsLocal / 9) * 5,
                (countDownInSecondsLocal / 9) * 4,
                (countDownInSecondsLocal / 9) * 3,
                (countDownInSecondsLocal / 9) * 2,
                (countDownInSecondsLocal / 9) * 1,
                0,
            ]}
            onComplete={() => {
                console.log('ON_COMPLETE BEFORE RETURN')
                togglePlayback()
                setTimerVisible(false)
                return [true, 0]
            }}
        >
            {({ remainingTime, animatedColor }) => (
                <Animated.Text style={{ color: animatedColor }}>
                    <Text
                        style={[styles.text, { color: timerControlsFontColor }]}
                    >
                        {formatRemainingTime(remainingTime)}
                    </Text>
                </Animated.Text>
            )}
        </CountdownCircleTimer>
    )
}

const styles = StyleSheet.create({
    timerTextContainer: {
        margin: 3,
    },
    timer: {
        alignItems: 'center',
    },
    text: {
        fontSize: 31,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
