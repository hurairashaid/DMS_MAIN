import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import TopContainer from '../components/TopContainer';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation hook
import Disaster from '../assests/disaster.png';
import BottomContainer from '../components/BottomContainer';
import {BASE_URL} from '../API/api';

import {API_URL} from '@env';
const DisasterRecovery = ({navigation}) => {
  const url = API_URL;
  console.log(url);
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .post(`http://${BASE_URL}/evacuation/findevacuation`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log('Error fetching data:', error);
      });
  };

  const handlePress = item => {
    console.log(item);
    // Navigate to EvacuationCenters screen and pass params
    navigation.navigate('EvacuationCenter', {
      item,
    });
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <TopContainer screenName="Disaster & Evacuation Centers" />

        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.block}
            onPress={() => handlePress(item.evacuation)}>
            <View style={styles.block}>
              <Image style={styles.blockImage} source={Disaster} />
              <View>
                <Text style={styles.blockHeading}>{item.title}</Text>
                <Text style={styles.blockNumber}>{item.disasterLocation}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomContainer navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  blockHeading: {
    fontSize: 14,
    fontWeight: '500',
  },
  blockNumber: {
    fontSize: 14,
    fontWeight: '600',
  },
  blockImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
});

export default DisasterRecovery;
