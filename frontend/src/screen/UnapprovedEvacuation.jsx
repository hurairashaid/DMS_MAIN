import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assests/Logo.png';
import {BASE_URL} from '../API/api';

const UnapprovedEvacuation = () => {
  const [token, setToken] = useState('');
  const [evacuations, setEvacuations] = useState([]);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        console.log('Stored Token:', storedToken); // Debug log to check stored token
        if (storedToken !== null) {
          setToken(storedToken);
        } else {
          console.log('Token not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Failed to load token from AsyncStorage:', error);
      }
    };

    loadToken(); // Call the function to load token from AsyncStorage
  }, []); // Empty dependency array means this effect runs once on component mount

  useEffect(() => {
    // This effect runs when 'token' changes
    if (token !== '') {
      fetchEvacuations(token);
    }
  }, [token]); // Dependency on 'token'

  const fetchEvacuations = async token => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `http://${BASE_URL}/evacuation/currentlyunapprovedEvacuation`,
        {}, // Pass an empty object as the second argument if no data is needed for POST
        {headers},
      );

      setEvacuations(response.data); // Assuming response.data is an array of evacuations
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state or alert user
    }
  };

  console.log(evacuations);
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.heading}>Unapproved Evacuations</Text>
      <FlatList
        data={evacuations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.evacuationBlock}>
            <Text style={styles.disasterHeading}>
              {item.disaster} - {item.disasterLocation}
            </Text>
            <FlatList
              data={item.evacuation.filter(
                evac => evac.status === 'unapproved',
              )}
              keyExtractor={(evac, idx) => idx.toString()}
              renderItem={({item: evac}) => (
                <View style={styles.evacuationDetails}>
                  <Text style={styles.evacuationName}>
                    {evac.evacuationName}
                  </Text>
                  <Text style={styles.location}>{evac.location}</Text>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default UnapprovedEvacuation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    marginVertical: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  evacuationBlock: {
    marginBottom: 20,
  },
  disasterHeading: {
    fontSize: 18,
    marginBottom: 10,
  },
  evacuationDetails: {
    padding: 10,
    backgroundColor: 'orange',
    marginBottom: 10,
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
});
