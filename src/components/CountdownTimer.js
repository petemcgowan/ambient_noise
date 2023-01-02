import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {Animated} from 'react-native';

const formatRemainingTime = countDownInSeconds => {
  // const minutes = Math.floor((time % 3600) / 60);
  // const seconds = time % 60;
  if (countDownInSeconds === 0) {
    return '0:00';
  }
  // const days = Math.floor(countDownInSeconds / (1000 * 60 * 60 * 24));
  // const hours = Math.floor(
  //   (countDownInSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  // );
  const minutes = Math.floor(
    (countDownInSeconds % (1000 * 60 * 60)) / (1000 * 60),
  );
  console.log('countDownInSeconds:' + countDownInSeconds);
  const seconds = Math.floor((countDownInSeconds % (1000 * 60)) / 1000);
  console.log('seconds:' + seconds);

  const minutesMethod2 = Math.floor((countDownInSeconds % 3600) / 60);
  console.log('minutesMethod2:' + minutesMethod2);
  const secondsMethod2 = countDownInSeconds % 60;
  console.log('secondsMethod2:' + secondsMethod2);

  // const result = time.toLocaleDateString('en-GB', {
  //   // you can use undefined as first argument
  //   // year: "numeric",
  //   // month: "2-digit",
  //   // day: "2-digit",
  //   minimumIntegerDigits: 2,
  //   useGrouping: false,
  // });
  // console.log('paddingResult:' + result); // outputs “01/03/2018”

  let secondString = seconds;
  if (seconds < 10) {
    secondString = 0 + seconds;
  } else {
    secondString = seconds;
  }
  console.log('secondString:' + secondString);

  // return `${minutes}:${seconds}`;
  return `${minutesMethod2}:${secondsMethod2}`;
};

// const renderTime = ({remainingTime}) => {
//   if (remainingTime === 0) {
//     return <View style={styles.timer}>Too late...</View>;
//   }

//   return (
//     <View style={styles.timer}>
//       {/* <View style={styles.text}>Remaining time</View> */}
//       <View style={styles.value}>{formatRemainingTime(remainingTime)}</View>
//     </View>
//   );
// };

export default function CountdownTimer({
  hours,
  setHours,
  minutes,
  setMinutes,
  togglePlayback,
  setTimerVisible,
}) {
  const duration = hours * 60 + minutes;
  console.log('CountdownTimer, duration:' + duration);

  return (
    <CountdownCircleTimer
      isPlaying
      duration={duration}
      size={190}
      updateInterval={1}
      strokeWidth={18}
      colors={[
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
        duration,
        (duration / 9) * 8,
        (duration / 9) * 7,
        (duration / 9) * 6,
        (duration / 9) * 5,
        (duration / 9) * 4,
        (duration / 9) * 3,
        (duration / 9) * 2,
        (duration / 9) * 1,
        0,
      ]}
      onComplete={() => {
        console.log('ON_COMPLETE BEFORE RETURN');
        togglePlayback();
        setTimerVisible(false);
        return [true, 0];
      }}>
      {({remainingTime, animatedColor}) => (
        <Animated.Text style={{color: animatedColor}}>
          {/* <View style={styles.timer}> */}
          {/* <View style={styles.timerTextContainer}>
              <Text style={styles.text}>Remaining</Text>
              <Text style={styles.text}>time</Text>
            </View> */}
          {/* <View style={styles.value}> */}
          <Text style={styles.text}>{formatRemainingTime(remainingTime)}</Text>
          {/* <Text style={styles.text}>{renderTime}</Text> */}
          {/* </View> */}
          {/* </View> */}
        </Animated.Text>
      )}
    </CountdownCircleTimer>
  );
}

const styles = StyleSheet.create({
  timerTextContainer: {
    // color: '#ccc',
    // fontSize: 18,
    // alignItems: 'center',
    // justifyContent: 'center',
    margin: 3,
  },
  timer: {
    // fontFamily: "Montserrat";
    // flexDirection: column;
    alignItems: 'center',
  },
  text: {
    color: '#ccc',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // value: {
  //   fontSize: 30,
  // },
});
