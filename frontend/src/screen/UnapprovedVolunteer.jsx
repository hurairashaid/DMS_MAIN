import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import logo from '../assests/Logo.png';
import axios from 'axios';
import {BASE_URL} from '../API/api';

const UnapprovedVolunteer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        `http://${BASE_URL}/user/unapprovedVolunteer`,
        {},
      );
      setData(response.data); // Set data
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state or alert user
    } finally {
      setLoading(false); // End loading
    }
  };

  const approveVolunteer = async id => {
    setLoading(true);
    try {
      await axios.post(`http://${BASE_URL}/user/approvedVolunteer`, {id});
      // Optionally, refetch the data or update state
      fetchVolunteers();
      setLoading(false);
    } catch (error) {
      console.error('Error approving volunteer:', error);
      setLoading(false);
      // Handle error state or alert user
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.heading}>Unapproved Volunteers</Text>
      {loading ? (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View style={styles.evacuationBlock}>
              <View style={styles.evacuationDetails}>
                <Text style={styles.disasterHeading}>{item.username}</Text>
                <Text style={styles.evacuationName}>{item.email}</Text>
                <Text style={styles.location}>{item.phonenumber}</Text>
                <Text style={styles.location}>
                  {item.city}, {item.area}
                </Text>
                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => approveVolunteer(item._id)}>
                    <Text style={styles.buttonText}>Approve Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default UnapprovedVolunteer;

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
    color: 'white',
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
  button: {
    backgroundColor: 'white',
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkened background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
