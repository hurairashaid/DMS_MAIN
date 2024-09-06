import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sun from '../assests/sun.png';
import windMain from '../assests/windMain.png';
import eye from '../assests/eye.png';
import cloud from '../assests/cloud.png';
import humidity from '../assests/humidity.png';

import LinearGradient from 'react-native-linear-gradient';

const Wind = DiasterDetail => {
  const myDate = new Date(DiasterDetail.DiasterDetail.dt * 1000); // convert timestamp to milliseconds and construct Date object

  return (
    <>
      <LinearGradient
        colors={['#309529', '#538e4f']}
        start={{x: 0, y: 0}}
        end={{x: 0.5, y: 0}}
        style={styles.mainBox}>
        <View style={styles.upperBox}>
          <Image style={styles.mainImage} source={windMain}></Image>
          <View style={styles.innerUpperBox}>
            <Text style={[styles.text, styles.headingText]}>
              {Math.round(
                ((DiasterDetail.DiasterDetail.wind.speed * 18) / 5) * 100,
              ) / 100}{' '}
              Km/Hour
            </Text>
            <Text style={[styles.text, styles.headingText]}>
              {myDate.toDateString()}
            </Text>
            <Text style={[styles.text, styles.headingText]}>
              {myDate.toLocaleTimeString()}
            </Text>
          </View>
        </View>
        <View style={styles.lowerBox}>
          <View style={styles.row}>
            <View style={styles.rowElement}>
              <Image
                style={{width: 40, height: 23, marginRight: 9}}
                source={eye}></Image>
              <Text style={[styles.text]}>
                {DiasterDetail.DiasterDetail.visibility} M
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
                {' '}
                {DiasterDetail.DiasterDetail.clouds.all} %
              </Text>
            </View>
            <View style={styles.rowElement}>
              <Image
                style={{width: 20, height: 25, marginRight: 9}}
                source={humidity}></Image>
              <Text style={[styles.text]}>
                {' '}
                {DiasterDetail.DiasterDetail.main.humidity} %
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default Wind;

const styles = StyleSheet.create({
  mainBox: {
    padding: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  mainImage: {
    width: 132,
    height: 70,
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
    marginTop: 15,
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
