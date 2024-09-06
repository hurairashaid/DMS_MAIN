/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {decode as atob, encode as btoa} from 'base-64';
global.atob = atob;
global.btoa = btoa;
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomContainer from '../components/BottomContainer.jsx'; // Adjust extensions as needed
import TopContainer from '../components/TopContainer.tsx'; // Adjust extensions as needed
import Group from '../assests/group.png';
import Gear from '../assests/gear.png';
import People from '../assests/Man.png';

// Define navigation types if needed
const HomeScreen = ({navigation}) => {
  const [token, setToken] = useState(''); // State to hold the token
  const [highlightType, setHighlightType] = useState(''); // State to determine highlighted type

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
      setHighlightType(decodedToken.response.type);
    } else {
      setHighlightType('');
    }
  }, [token]);
  console.log(highlightType);

  function switchScreen(location) {
    navigation.navigate(location);
  }

  return (
    <>
      <ScrollView style={styles.main}>
        <TopContainer screenName="Home" />
        <Text style={styles.heading}>Hello Disaster Manager</Text>
        <View style={styles.secondContainer}>
          <Pressable
            style={[
              styles.secondContainerButton,
              highlightType === 'user' && styles.highlightedButton,
            ]}
            onPress={() => switchScreen('CITIZENS')}>
            <Text style={styles.secondContainerText}>CITIZENS</Text>
          </Pressable>
          <Pressable
            style={[
              styles.secondContainerButton,
              highlightType === 'volunteer' && styles.highlightedButton,
            ]}
            onPress={() => switchScreen('VOLUNTEER')}>
            <Text style={styles.secondContainerText}>VOLUNTEER</Text>
          </Pressable>
          <Pressable
            style={[
              styles.secondContainerButton,
              highlightType === 'admin' && styles.highlightedButton,
            ]}
            onPress={() => switchScreen('ADMIN')}>
            <Text style={styles.secondContainerText}>ADMIN</Text>
          </Pressable>
        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryHeading}>Categories</Text>
          <View style={styles.categoryGridContainer}>
            <Pressable
              onPress={() => {
                switchScreen('DiastersInformation');
              }}
              style={[styles.item, {backgroundColor: '#FFCC00'}]}>
              <Text style={{fontSize: 20, fontWeight: '800', color: 'black'}}>
                Diasters Information
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                switchScreen('Chat');
              }}
              style={[
                styles.item2,
                {backgroundColor: 'white', justifyContent: 'space-between'},
              ]}>
              <Text style={{fontSize: 20, fontWeight: '800', color: 'black'}}>
                Groups
              </Text>
              <Image style={{width: 100, height: 80}} source={Group}></Image>
            </Pressable>
            <Pressable
              onPress={() => {
                switchScreen('DisasterRecovery');
              }}
              style={[
                styles.item2,
                {backgroundColor: 'white', justifyContent: 'space-between'},
              ]}>
              <Text style={{fontSize: 20, fontWeight: '800', color: 'black'}}>
                Disaster Recovery
              </Text>
              <Image style={{height: 70, width: 92}} source={Gear}></Image>
            </Pressable>
            <Pressable
              onPress={() => {
                switchScreen('Contact');
              }}
              style={[
                styles.item,
                {backgroundColor: '#000000', justifyContent: 'space-between'},
              ]}>
              <Text style={{fontSize: 20, fontWeight: '800', color: 'white'}}>
                Contact Directory
              </Text>
              <Image style={{height: 100, width: 90}} source={People}></Image>
            </Pressable>
            <Pressable
              onPress={() => {
                switchScreen('Precautions');
              }}
              style={[styles.item2, {backgroundColor: '#794091'}]}>
              <Text style={{fontSize: 20, fontWeight: '800', color: 'white'}}>
                Precaution & Safety
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <BottomContainer navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
  },
  heading: {
    paddingHorizontal: 20,
    fontSize: 40,
    fontWeight: '800',
  },
  secondContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 13,
  },
  secondContainerButton: {
    backgroundColor: 'white',
    width: '32%',
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  secondContainerText: {
    color: 'black',
  },
  highlightedButton: {
    backgroundColor: '#FFCC00',
    color: 'white',
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  categoryHeading: {
    fontSize: 22,
    fontWeight: '800',
  },
  categoryGridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  item: {
    width: '60%',
    height: 160,
    padding: 10,
    backgroundColor: 'red',
    marginVertical: 3,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item2: {
    width: '38%',
    height: 160,
    padding: 10,
    backgroundColor: 'red',
    marginVertical: 3,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HomeScreen;
