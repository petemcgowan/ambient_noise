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
import Utils from '../components/Utils'

const { width } = Dimensions.get('window')

const secondOptions = Utils.selectionDropDownRange(0, 59).map(
    (second) => second.value
)

const minuteOptions = Utils.selectionDropDownRange(0, 59).map(
    (minute) => minute.value
)
const hourOptions = Utils.selectionDropDownRange(0, 23).map(
    (hour) => hour.value
)

export default function TimerControls({
    timerVisible,
    setTimerVisible,
    hours,
    setHours,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    playing,
    togglePlayback,
    timerDialogBackgroundColor,
    timerDialogFontColor,
}) {
    const [modalVisible, setModalVisible] = useState(false)

    const handleChange = (value: {
        hours: number,
        minutes: number,
        seconds: number,
    }) => {
        console.log('value:' + JSON.stringify(value))
        setHours(value.hours)
        setMinutes(value.minutes)
        setSeconds(value.seconds)
        console.log(
            'value.hours' +
                value.hours +
                ', value.minutes:' +
                value.minutes +
                ', value.seconds:' +
                value.seconds
        )
    }

    // console.log(
    //     'hours:' + hours,
    //     ', minutes:' + minutes + ', seconds:' + seconds
    // )

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
                    <View style={styles.centeredView}>
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
                                    pickerShows={[
                                        'hours',
                                        'minutes',
                                        'seconds',
                                    ]}
                                />
                            )}
                            {Platform.OS === 'android' && (
                                <Picker
                                    textColor={timerDialogFontColor}
                                    textSize={60}
                                >
                                    <PickerColumn
                                        selectedValue={hours}
                                        onChange={(event) =>
                                            setHours(event.value.toString())
                                        }
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
                                        onChange={(event) =>
                                            setMinutes(event.value.toString())
                                        }
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
                                        onChange={(event) =>
                                            setSeconds(event.value.toString())
                                        }
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
                                        styles.buttonClose,
                                        {
                                            backgroundColor:
                                                timerDialogFontColor,
                                        },
                                    ]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.textStyle}>Back</Text>
                                </Pressable>
                                <Pressable
                                    style={[
                                        styles.button,
                                        styles.buttonClose,
                                        {
                                            backgroundColor:
                                                timerDialogFontColor,
                                        },
                                    ]}
                                    onPress={() => {
                                        if (
                                            hours === 0 &&
                                            minutes === 0 &&
                                            seconds === 0
                                        ) {
                                            console.log(
                                                "They haven't selected a time aka do nothing"
                                            )
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
                                    <Text style={styles.textStyle}>
                                        Confirm
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomControls}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Ionicons
                            name="timer-outline"
                            size={90}
                            color="#777777"
                        />
                    </TouchableOpacity>
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
        paddingVertical: 15,
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%',
    },
    button: {
        width: '50%',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        // backgroundColor: 'rgba(122, 158, 199, 1)',
        // backgroundColor: "rgba(255, 255, 255, 1)",
        // backgroundColor: '#393E46',
        // borderWidth: 1,
    },
    modalView: {
        marginTop: 80,
        // backgroundColor: 'rgba(122, 158, 199, 1)',
        // backgroundColor: "rgba(255, 255, 255, 1)",
        // width: '80%',
        borderRadius: 20,
        padding: 20,
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
        fontSize: 22,
    },
})
