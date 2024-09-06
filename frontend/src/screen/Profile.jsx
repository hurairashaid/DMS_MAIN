import React, {useEffect, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native';
axios;
import {SafeAreaView} from 'react-native-safe-area-context';
import Avator from '../assests/avatar.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'; // Correct import statement
import {decode as atob, encode as btoa} from 'base-64';
import BottomContainer from '../components/BottomContainer';
import TopContainer from '../components/TopContainer.tsx'; // Adjust extensions as needed
import axios from 'axios';
import {BASE_URL} from '../API/api.jsx';
global.atob = atob;
global.btoa = btoa;

const Profile = ({navigation}) => {
  function switchScreen(location) {
    navigation.navigate(location);
  }

  const BecomeVolunteer = async () => {
    const id = data._id;

    try {
      const response = await axios.post(
        `http://${BASE_URL}/user/applyVolunteer`,
        {id},
      );
      console.log(response);
      Alert.alert(
        'Successfully applied for becoming volunteer',
        'you details have been sended to Admin',
      );
    } catch (error) {
      Alert.alert(
        'Attempt Failed',
        'There must be some technical error please try again',
      );
      console.error('Login Error:', error);
    }
  };
  const [token, setToken] = useState('');
  const [data, setData] = useState({});
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
    // Decode token and update highlightType
    const decodedToken = token ? jwtDecode(token) : null;
    if (decodedToken && decodedToken.response && decodedToken.response.type) {
      setData(decodedToken.response);
    } else {
      setData('');
    }
  }, [token]);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Remove token from AsyncStorage
      navigation.navigate('SignIn'); // Navigate to sign-in screen or any other screen
    } catch (error) {
      console.error('Failed to sign out:', error);
      // Handle sign out error
    }
  };
  return (
    <>
      <ScrollView style={styles.main}>
        <TopContainer screenName="Profile" />
        <View style={styles.imageContainer}>
          <Image style={{height: 110, width: 100}} source={Avator}></Image>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{data.username}</Text>
          <Text style={styles.cnic}>{data.cnic}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>{data.type}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {data.type === 'admin' && (
            <TouchableOpacity
              onPress={() => switchScreen('AddDisaster')}
              style={styles.buttonWrapper}>
              <Text style={styles.buttonText}>Add Disaster</Text>
            </TouchableOpacity>
          )}

          {data.type === 'admin' && (
            <TouchableOpacity
              onPress={() => switchScreen('ApprovedEvacuation')}
              style={styles.buttonWrapper}>
              <Text style={styles.buttonText}>Approved Evacuation</Text>
            </TouchableOpacity>
          )}
          {data.type === 'admin' && (
            <TouchableOpacity
              onPress={() => switchScreen('AllUnapprovedEvacuation')}
              style={styles.buttonWrapper}>
              <Text style={styles.buttonText}>Unapproved Evacuation</Text>
            </TouchableOpacity>
          )}
          {data.type === 'admin' && (
            <TouchableOpacity
              onPress={() => switchScreen('UnapprovedVolunteer')}
              style={styles.buttonWrapper}>
              <Text style={styles.buttonText}>
                People Applied To Become Volunteer
              </Text>
            </TouchableOpacity>
          )}

          {/* Both admin and user can see this button */}
          {data.type === 'volunteer' && (
            <TouchableOpacity
              onPress={() => switchScreen('AddEvacuation')}
              style={styles.buttonWrapper}>
              <Text style={styles.buttonText}>Add Evacuations</Text>
            </TouchableOpacity>
          )}
          {data.type === 'volunteer' && (
            <TouchableOpacity
              onPress={() => switchScreen('UnapprovedEvacuation')}
              style={styles.buttonWrapper}>
              <Text style={styles.buttonText}>Unapproved Evacuations</Text>
            </TouchableOpacity>
          )}
          {data.type === 'user' && data.applied === false && (
            <TouchableOpacity
              onPress={() => BecomeVolunteer()}
              style={styles.buttonWrapper}>
              <Text style={styles.buttonText}>Apply to become Voluteer</Text>
            </TouchableOpacity>
          )}
          {data.type === 'user' && data.applied === true && (
            <TouchableOpacity style={styles.buttonWrapper}>
              <Text style={styles.buttonText}>
                Already Applied to become Volunteer
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleSignOut}
            style={[styles.buttonWrapper, {paddingLeft: 0, marginTop: 40}]}>
            <Text style={[styles.buttonText, {textAlign: 'center'}]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomContainer navigation={navigation} />
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  textContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  status: {
    backgroundColor: 'orange',
    paddingHorizontal: 30,
    paddingVertical: 10,
    color: 'white',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonWrapper: {
    backgroundColor: '#EAEAEA',
    width: '80%',
    alignItems: 'left',
    paddingLeft: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
  },
});
