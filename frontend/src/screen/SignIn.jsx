import React, {useEffect, useState} from 'react';

import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import logo from '../assests/Logo.png';
import {BASE_URL} from '../API/api';

console.log(process.env.API_URL);
const SignIn = ({navigation}) => {
  const [click, setClick] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function switchScreen(location) {
    navigation.navigate(location);
  }

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        navigation.navigate('Profile'); // Navigate to profile if token exists
      }
    };

    checkToken();
  }, []);
  const handleLogin = async () => {
    console.log(BASE_URL);

    try {
      const response = await axios.post(`http://${BASE_URL}/user/signin`, {
        email,
        password,
      });
      const token = response.data;
      await AsyncStorage.setItem('token', token);
      Alert.alert('Login Successful!', 'Welcome to your account.');
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
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Login</Text>
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
          placeholder="PASSWORD"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch
            value={click}
            onValueChange={setClick}
            trackColor={{true: 'blue', false: 'gray'}}
          />
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
        <View>
          <Pressable onPress={() => Alert.alert('Forget Password!')}>
            <Text style={styles.forgetText}>Forgot Password?</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          switchScreen('SignUp');
        }}>
        <Text style={styles.footerText}>
          Don't Have Account?<Text style={styles.signup}> Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 70,
    backgroundColor: 'white',
    height: '100vh',
  },
  image: {
    width: 170,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingVertical: 20,
    color: '#f5c754',
  },
  inputView: {
    gap: 15,
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: '#f5c754',
    borderWidth: 1,
    borderRadius: 7,
  },
  rememberView: {
    width: '100%',
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  switch: {
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 13,
  },
  forgetText: {
    fontSize: 11,
    color: '#f5c754',
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
  footerText: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 200,
  },
  signup: {
    color: '#f5c754',
    fontSize: 13,
  },
});

export default SignIn;
