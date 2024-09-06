import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sun from '../assests/sun.png';
import air from '../assests/air.png';
import eyeMain from '../assests/eyeMain.png';
import cloud from '../assests/cloud.png';
import humidity from '../assests/humidity.png';

import LinearGradient from 'react-native-linear-gradient';

const Visibility = DiasterDetail => {
  const myDate = new Date(DiasterDetail.DiasterDetail.dt * 1000); // convert timestamp to milliseconds and construct Date object
  console.log(DiasterDetail.DiasterDetail);
  return (
    <>
      <LinearGradient
        colors={['#ed26e5', '#f986f4']}
        start={{x: 0, y: 0}}
        end={{x: 0.5, y: 0}}
        style={styles.mainBox}>
        <View style={styles.upperBox}>
          <Image style={styles.mainImage} source={eyeMain}></Image>
          <View style={styles.innerUpperBox}>
            <Text style={[styles.text, styles.headingText]}>
              {DiasterDetail.DiasterDetail.visibility} Meter
            </Text>
            <Text style={[styles.text, styles.headingText]}>
              {myDate.toDateString()}
            </Text>
            <Text style={[styles.text, styles.headingText]}>
              {' '}
              {myDate.toLocaleTimeString()}
            
            </Text>
          </View>
        </View>
        <View style={styles.lowerBox}>
          <View style={styles.row}>
            <View style={styles.rowElement}>
              <Image
                style={{width: 30, height: 25, marginRight: 9}}
                source={air}></Image>
              <Text style={[styles.text]}>
                {Math.round(
                  ((DiasterDetail.DiasterDetail.wind.speed * 18) / 5) * 100,
                ) / 100}{' '}
                Km/Hour
              </Text>
            </View>
            <View style={styles.rowElement}>
              <Image
                style={{width: 28, height: 25, marginRight: 9}}
                source={sun}></Image>
              <Text style={[styles.text]}>
                {' '}
                {Math.round(DiasterDetail.DiasterDetail.main.temp - 273.15)} C
              </Text>
            </View>
          </View>
          <View style={[styles.row, {marginTop: 10}]}>
            <View style={styles.rowElement}>
              <Image
                style={{width: 40, height: 14, marginRight: 9}}
                source={cloud}></Image>
              <Text style={[styles.text]}>
                {DiasterDetail.DiasterDetail.clouds.all} %
              </Text>
            </View>
            <View style={styles.rowElement}>
              <Image
                style={{width: 20, height: 25, marginRight: 9}}
                source={humidity}></Image>
              <Text style={[styles.text]}>
                {DiasterDetail.DiasterDetail.main.humidity} %
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default Visibility;

const styles = StyleSheet.create({
  mainBox: {
    padding: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  mainImage: {
    width: 120,
    height: 100,
  },
  upperBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerUpperBox: {
    marginLeft: 10,
  },
  lowerBox: {
    paddingHorizontal: 5,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridImage: {
    marginRight: 8,
  },
  rowElement: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  headingText: {
    fontSize: 16,
  },
});
