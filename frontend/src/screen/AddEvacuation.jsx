import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import logo from '../assests/Logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decode as atob, encode as btoa} from 'base-64';
import {BASE_URL} from '../API/api';

global.atob = atob;
global.btoa = btoa;
const AddEvacuation = () => {
  const [evacuationName, setEvacuationName] = useState('');
  const [evacuationLocation, setEvacuationLocation] = useState('');
  const [selectedDisaster, setSelectedDisaster] = useState('');
  const [evacuationLocations, setEvacuationLocations] = useState([]);
  const [token, setToken] = useState('');
  useEffect(() => {
    // Function to load token from AsyncStorage when component mounts
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken !== null) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Failed to load token from AsyncStorage:', error);
      }
    };

    loadToken(); // Call the function
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .post(`http://${BASE_URL}/evacuation/findevacuation`)
      .then(function (response) {
        const locations = response.data.map(e => ({
          label: `${e.disaster}, ${e.disasterLocation}`,
          value: e._id,
        }));
        setEvacuationLocations(locations);
      })
      .catch(function (error) {
        console.log('Error fetching data:', error);
      });
  };

  const handleSubmit = () => {
    // Prepare data to send to API
    const formData = {
      evacuationName: evacuationName,
      location: evacuationLocation,
      id: selectedDisaster,
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(
        `http://${BASE_URL}/evacuation/addevacuation`,
        formData,
        {headers},
      )
      .then(function (response) {
        Alert.alert(
          'Evacuation Center Submitted',
          'Evacuation Center Have Been Submitted',
        ); // Optionally, you can reset the form fields after successful submission
        setEvacuationName('');
        setEvacuationLocation('');
        setSelectedDisaster('');
      })
      .catch(function (error) {
        console.log('Error adding evacuation center:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Add Evacuation Center</Text>
      <View style={styles.formContainer}>
        <Text style={styles.labelTitle}>
          Enter the name of the evacuation center
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Evacuation Name"
          value={evacuationName}
          onChangeText={setEvacuationName}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Text style={styles.labelTitle}>
          Enter the location of the evacuation center
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Evacuation Location"
          value={evacuationLocation}
          onChangeText={setEvacuationLocation}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Text style={styles.labelTitle}>
          Select the disaster for this evacuation center
        </Text>
        <Picker
          selectedValue={selectedDisaster}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedDisaster(itemValue)
          }>
          {evacuationLocations.map((location, index) => (
            <Picker.Item
              key={index}
              label={location.label}
              value={location.value}
            />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={{color: 'white'}}>Submit Evacuation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 14,
  },
  labelTitle: {
    marginBottom: 5,
    marginTop: 10,
    color: 'orange',
  },
  submitButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default AddEvacuation;
