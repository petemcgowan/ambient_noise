import React, { useState } from 'react'
import {
  SafeAreaView,
  Platform,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { TouchableOpacity, Modal, Pressable, Alert } from 'react-native'
import { TimePicker } from 'react-native-simple-time-picker'
import { Picker, PickerColumn, PickerItem } from 'react-native-picky'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Utils from './Utils'
import rainSounds from '../model/data'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')

const secondOptions = Utils.selectionDropDownRange(0, 59).map(
  (second) => second.value
)

const minuteOptions = Utils.selectionDropDownRange(0, 59).map(
  (minute) => minute.value
)
const hourOptions = Utils.selectionDropDownRange(0, 23).map(
  (hour) => hour.value
)

interface TimerControlsProps {
  setTimerVisible: (timerVisible: boolean) => void
  hours: number
  setHours: (hours: number) => void
  minutes: number
  setMinutes: (minutes: number) => void
  seconds: number
  setSeconds: (seconds: number) => void
  playing: boolean
  togglePlayback: () => void
  intentionalVideoPlay: boolean
  setIntentionalVideoPlay: (intentionalVideoPlay: boolean) => void
  timerDialogBackgroundColor: string
  timerDialogFontColor: string
  songIndex: number
}

export default function TimerControls({
  setTimerVisible,
  hours,
  setHours,
  minutes,
  setMinutes,
  seconds,
  setSeconds,
  playing,
  togglePlayback,
  intentionalVideoPlay,
  setIntentionalVideoPlay,
  timerDialogBackgroundColor,
  timerDialogFontColor,
  songIndex,
}: TimerControlsProps) {
  const [modalVisible, setModalVisible] = useState(false)

  const handleChange = (value: {
    hours: number | string
    minutes: number | string
    seconds: number | string
  }) => {
    // TimePicker changes the type depending on whether it was last used or not 😳
    setHours(
      typeof value.hours === 'string' ? parseInt(value.hours, 10) : value.hours
    )
    setMinutes(
      typeof value.minutes === 'string'
        ? parseInt(value.minutes, 10)
        : value.minutes
    )
    setSeconds(
      typeof value.seconds === 'string'
        ? parseInt(value.seconds, 10)
        : value.seconds
    )
  }

  return (
    <View>
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
            setModalVisible(!modalVisible)
          }}
        >
          <View>
            <View
              style={[
                styles.modalView,
                { backgroundColor: timerDialogBackgroundColor },
              ]}
            >
              {Platform.OS === 'ios' && (
                <TimePicker
                  textColor={timerDialogFontColor}
                  value={{ hours, minutes, seconds }}
                  onChange={handleChange}
                  // hoursUnit="hr"
                  // minutesUnit="min"
                  // secondsUnit="sec"
                  pickerShows={['hours', 'minutes', 'seconds']}
                />
              )}
              {Platform.OS === 'android' && (
                <Picker
                  textColor={timerDialogFontColor}
                  textSize={width * 0.09}
                >
                  <PickerColumn
                    selectedValue={hours}
                    onChange={(event) => setHours(+event.value.toString())}
                  >
                    {hourOptions.map((hourValue) => (
                      <PickerItem
                        label={hourValue.toString()}
                        value={hourValue.toString()}
                        key={hourValue}
                      />
                    ))}
                  </PickerColumn>
                  <PickerColumn
                    selectedValue={minutes}
                    onChange={(event) => setMinutes(+event.value.toString())}
                  >
                    {minuteOptions.map((minuteValue) => (
                      <PickerItem
                        label={minuteValue.toString()}
                        value={minuteValue.toString()}
                        key={minuteValue}
                      />
                    ))}
                  </PickerColumn>
                  <PickerColumn
                    selectedValue={seconds}
                    onChange={(event) => setSeconds(+event.value.toString())}
                  >
                    {secondOptions.map((secondValue) => (
                      <PickerItem
                        label={secondValue.toString()}
                        value={secondValue.toString()}
                        key={secondValue}
                      />
                    ))}
                  </PickerColumn>
                </Picker>
              )}
              <View style={styles.modalBottomButtons}>
                <Pressable
                  style={[
                    styles.button,
                    {
                      backgroundColor: timerDialogFontColor,
                    },
                  ]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Back</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    {
                      backgroundColor: timerDialogFontColor,
                    },
                  ]}
                  onPress={() => {
                    if (hours === 0 && minutes === 0 && seconds === 0) {
                      setModalVisible(false)
                      return
                    }
                    setModalVisible(!modalVisible)
                    setTimerVisible(true)
                    if (!playing) {
                      togglePlayback()
                    }
                  }}
                >
                  <Text style={styles.textStyle}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
      <View style={styles.bottomContainer}>
        <View style={styles.pagination}>
          {rainSounds.map((_, index) => (
            <Text
              key={index}
              style={index === songIndex ? styles.activeDot : styles.dot}
            >
              •
            </Text>
          ))}
        </View>
        <View style={styles.bottomControls}>
          <View style={{ width: width * 0.1 }}></View>
          <View
            style={{
              width: width * 0.4,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="timer-outline" size={90} color="#777777" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: width * 0.4,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => setIntentionalVideoPlay(!intentionalVideoPlay)}
            >
              <Ionicons
                name="videocam-outline"
                size={90}
                color={
                  intentionalVideoPlay
                    ? 'rgba(134, 168, 115, 0.75)'
                    : 'rgba(119, 119, 119, 0.75)'
                }
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: width * 0.1 }}></View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    borderTopColor: '#393E46',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    // paddingVertical: 15,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
  },
  dot: {
    fontSize: RFPercentage(6.8),
    color: '#888',
    marginHorizontal: width * 0.02,
  },
  activeDot: {
    fontSize: RFPercentage(6.8),
    color: '#FFF',
    marginHorizontal: width * 0.02,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '50%',
    borderRadius: 10,
    padding: width * 0.03,
    elevation: 2,
  },
  modalView: {
    marginTop: height * 0.1,
    borderRadius: 20,
    padding: width * 0.02,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBottomButtons: {
    flexDirection: 'row',
    width: '100%',
  },
  textStyle: {
    color: '#777777',
    textAlign: 'center',
    fontSize: RFPercentage(2.85),
  },
})
