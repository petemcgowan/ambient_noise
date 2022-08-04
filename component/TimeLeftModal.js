import React from 'react';

import {
  Modal,
  Pressable,
  Alert,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import {TimePicker} from 'react-native-simple-time-picker';

const TimeLeftModal = (
  setModalVisible,
  modalVisible,
  hours,
  minutes,
  setHours,
  setMinutes,
) => {
  const handleChange = (value: {hours: number, minutes: number}) => {
    setHours(value.hours);
    setMinutes(value.minutes);
    console.log(
      'value.hours' + value.hours + ', value.minutes:' + value.minutes,
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Countdown Timer (on)</Text>
          <TimePicker
            textColor={'black'}
            value={{hours, minutes}}
            onChange={handleChange}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.textStyle}>Back</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Set Timer</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default TimeLeftModal;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});
