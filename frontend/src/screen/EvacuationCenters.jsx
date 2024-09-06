import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
axios;
import React, {useEffect, useState} from 'react';
import TopContainer from '../components/TopContainer';
import Disaster from '../assests/disaster.png';
import axios from 'axios';

const EvacuationCenters = ({route}) => {
  const {item} = route.params;
  console.log(item);
  return (
    <>
      <ScrollView style={styles.container}>
        <TopContainer screenName="Evacuation Centers" />
        {item
          .filter(item => item.status !== 'unapproved')
          .map((item, index) => (
            <View key={index} style={styles.block}>
              <Image style={styles.blockImage} source={Disaster} />
              <View>
                <Text style={styles.blockHeading}>{item.evacuationName}</Text>
                <Text style={styles.blockNumber}>{item.location}</Text>
                <Text style={styles.blockNumber}>
                  {item.creatorId.username}
                </Text>
                <Text style={styles.blockNumber}>
                  {item.creatorId.phonenumber}
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
      
    </>
  );
};

export default EvacuationCenters;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  innerContainer: {
    paddingHorizontal: 20,
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  blockHeading: {
    fontSize: 14,
    fontWeight: '500',
  },
  blockNumber: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  blockImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
});
