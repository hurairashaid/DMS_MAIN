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
import {useEffect, useState} from 'react';
import {BASE_URL} from '../API/api';

global.atob = atob;
global.btoa = btoa;
const AddDisaster = () => {
  const [disasterTitle, setDisasterTitle] = useState('');
  const [DisasterLocation, setDisasterLocation] = useState('');
  const [disaster, setDisaster] = useState('');
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
    console.log(BASE_URL);

    // Prepare data to send to API
    const formData = {
      title: disasterTitle,
      disasterLocation: DisasterLocation,
      disaster: disaster,
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`http://${BASE_URL}/evacuation/adddiaster`, formData, {headers})
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
      <Text style={styles.title}>Add Disaster</Text>
      <View style={styles.formContainer}>
        <Text style={styles.labelTitle}>Enter the name of the Diaster</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Disaster Name"
          value={disasterTitle}
          onChangeText={setDisasterTitle}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Text style={styles.labelTitle}>
          Enter the location of the Disaster
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Disaster Location"
          value={DisasterLocation}
          onChangeText={setDisasterLocation}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Text style={styles.labelTitle}>Enter the type of the Disaster</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Disaster Type"
          value={disaster}
          onChangeText={setDisaster}
          autoCorrect={false}
          autoCapitalize="none"
        />
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

export default AddDisaster;
