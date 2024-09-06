import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assests/Logo.png';
import {BASE_URL} from '../API/api';

const AllUnapprovedEvacuation = () => {
  const [token, setToken] = useState('');
  const [evacuations, setEvacuations] = useState([]);
  const [refresh, setRefresh] = useState(true);
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
  }, [token, refresh]); // Dependency on 'token'

  const fetchEvacuations = async token => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `http://${BASE_URL}/evacuation/allunapprovedevacutaion`,
        {}, // Pass an empty object as the second argument if no data is needed for POST
        {headers},
      );

      setEvacuations(response.data); // Assuming response.data is an array of evacuations
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state or alert user
    }
  };
  const handleApproveEvacuation = async (evacuationId, disasterId) => {
    console.log(evacuationId);
    console.log(disasterId);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(
        `http://${BASE_URL}/evacuation/approvedEvacuation`,
        {
          disasterId,
          evacuationId,
        },
        {headers},
      );

      // Handle successful response
      if (response.data.success) {
        Alert.alert('Success', 'Evacuation approved successfully');
        if (refresh == true) {
          setRefresh(false);
        } else {
          setRefresh(true);
        }
        // Handle any additional UI updates or state changes as needed
      } else {
        Alert.alert('Error', 'Failed to approve evacuation');
      }
    } catch (error) {
      console.error('Error approving evacuation:', error);
      Alert.alert('Error', 'Failed to approve evacuation. Please try again.');
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
              {item.title} - {item.disasterLocation}
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
                  <Text style={styles.location}>{evac.creatorId.username}</Text>
                  <Text style={styles.location}>
                    {evac.creatorId.phonenumber}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleApproveEvacuation(evac._id, item._id)}
                    style={{
                      backgroundColor: 'white',
                      width: '60%',
                      alignItems: 'center',
                      paddingVertical: 10,
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <Text>Approved Evacuation</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default AllUnapprovedEvacuation;

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
    fontSize: 16,
    marginBottom: 10,
  },
  evacuationDetails: {
    padding: 10,
    backgroundColor: 'orange',
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 10,
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
