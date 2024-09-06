import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../assests/Logo.png';
import {BASE_URL} from '../API/api';
import axios from 'axios';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState();
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const handleSignUp = async () => {
    console.log(BASE_URL);

    try {
      const response = await axios.post(`http://${BASE_URL}/user/signup`, {
        email,
        password,
        name,
        contact,
        city,
        area,
      });

      const token = response.data;
      console.log('this is the token', token);
      await AsyncStorage.setItem('token', token.user);
      Alert.alert('Sign Up Successful!', 'Welcome to your account.');
      navigation.navigate('Profile'); // Navigate to profile after successful login
    } catch (error) {
      Alert.alert(
        'Login Failed',
        'Please check your credentials and try again.',
      );
      console.error('Login Error:', error);
    }
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.heading}>Sign Up</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="ENTER YOUR EMAIL"
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="ENTER YOUR PASSWORD"
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="ENTER YOUR NAME"
          value={name}
          onChangeText={setName}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="CONTACT NO"
          value={contact}
          onChangeText={setContact}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="CITY YOU LIVE IN"
          value={city}
          onChangeText={setCity}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="AREA YOU LOVE IN"
          value={area}
          onChangeText={setArea}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    marginVertical: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    width: '100%',
    textAlign: 'center',
  },
  evacuationBlock: {
    marginBottom: 20,
  },
  disasterHeading: {
    fontSize: 16,
    marginBottom: 10,
  },
  evacuationDetails: {
    padding: 10,
    backgroundColor: 'orange',
    marginBottom: 10,
    alignItems: 'center',
  },
  evacuationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  location: {
    fontSize: 14,
    color: 'white',
  },
  inputView: {
    gap: 15,
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: '#f5c754',
    borderWidth: 1,
    borderRadius: 7,
  },
  button: {
    backgroundColor: '#f5c754',
    height: 45,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    width: '100%',
    paddingHorizontal: 50,
    marginBottom: 20,
  },
});
