import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import axios from 'axios';
import TopContainer from '../components/TopContainer';
import HeatWave from '../components/HeatWave';
import Visibility from '../components/Visibility';
import Rain from '../components/Rain';
import Wind from '../components/Wind';
import Loading from '../assests/loading.gif';
import GifImage from '@lowkey/react-native-gif';

const DiastersInformation = () => {
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('true');
  const [loading, setLoading] = useState(true);
  const [cleanArray, setCleanArray] = useState([]);
  let filteredArray = [...cleanArray]; // Create a copy of the current cleanArray
  const filtering = cleanObject => {
    // console.log(cleanObject.main.temp);
    // console.log(cleanObject.visibility);
    // console.log(cleanObject.wind.speed);
    // // console.log(cleanObject.rain["3h"]);
    // console.log(cleanObject.weather[0].main);

    if (cleanObject.main.feels_like >= 313.15) {
      cleanObject.problem = 'Sun';
      filteredArray.push(cleanObject); // Push the filtered object into the temporary array
    } else if (cleanObject.visibility < 10000) {
      cleanObject.problem = 'Visibility';
      filteredArray.push(cleanObject); // Push the filtered object into the temporary array
    } else if (cleanObject.wind.speed > 20) {
      cleanObject.problem = 'Wind';
      filteredArray.push(cleanObject); // Push the filtered object into the temporary array
    } else if (cleanObject.weather.main == 'Rain') {
      cleanObject.problem = 'Rain';
      filteredArray.push(cleanObject); // Push the filtered object into the temporary array
    }
  };

  useEffect(() => {
    console.log('I am in useEffect');
    Geolocation.getCurrentPosition(
      position => {
        console.log('A');
        console.log(position.coords.longitude);

        setCurrentLongitude(position.coords.longitude);
        setCurrentLatitude(position.coords.latitude);
        setLocationStatus('false');
        getData();
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [currentLatitude, currentLatitude]);
  const getData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${currentLatitude}&lon=${currentLongitude}&appid=a77bcba349c2a599b79533c9c3ca4b9d`,
      )
      .then(function (response) {
        response.data.list.map(e => {
          filtering(e);
        });
        setCleanArray(filteredArray); // Update the state with the filtered array after all objects are filtered
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(loading);
  return (
    <>
      <ScrollView style={styles.container}>
        <TopContainer screenName="Disaster Alert Cell" />
        {loading === true ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
            }}>
            <GifImage
              source={Loading}
              style={{
                width: 200,
                height: 200,
              }}
              resizeMode={'contain'}
            />
          </View>
        ) : (
          <View style={styles.main}>
            {cleanArray.length === 0 ? (
              <Text style={styles.noDisasterText}>
                No disaster will going to happen in next 5 days
              </Text>
            ) : (
              cleanArray.map(disasterObject => (
                <>
                  {disasterObject.problem === 'Sun' && (
                    <HeatWave DiasterDetail={disasterObject} />
                  )}
                  {disasterObject.problem === 'Visibility' && (
                    <Visibility DiasterDetail={disasterObject} />
                  )}
                  {disasterObject.problem === 'Rain' && <Rain />}
                  {disasterObject.problem === 'Wind' && (
                    <Wind DiasterDetail={disasterObject} />
                  )}
                </>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default DiastersInformation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  main: {
    paddingHorizontal: 20,
  },
  noDisasterText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: '10%',
  },
});
