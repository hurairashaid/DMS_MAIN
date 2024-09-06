import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../assests/Logo.png';
import Rescue from '../assests/rescue.png';
import FireRescue from '../assests/fire_rescue.png';
import PakistanMedicalAssociation from '../assests/pakistan_medical_association.png';
import Edhi from '../assests/edhi.png';
import Chippa from '../assests/chippa.jpeg';
import NDMA from '../assests/ndma.png';
import TopContainer from '../components/TopContainer';
import BottomContainer from '../components/BottomContainer';
const Contact = ({navigation}) => {
  return (
    <>
      <ScrollView style={styles.container}>
        <TopContainer screenName="Emergency Contact Info" />

        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('tel:1122');
            }}
            style={styles.block}>
            <Image style={styles.blockImage} source={Rescue}></Image>
            <View>
              <Text style={styles.blockHeading}>Rescue Safety Helpline</Text>
              <Text style={styles.blockNumber}>1122</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('tel:16');
            }}
            style={styles.block}>
            <Image style={styles.blockImage} source={FireRescue}></Image>
            <View>
              <Text style={styles.blockHeading}>Fire Rescue Helpline</Text>
              <Text style={styles.blockNumber}>16</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('tel:1166');
            }}
            style={styles.block}>
            <Image
              style={styles.blockImage}
              source={PakistanMedicalAssociation}></Image>
            <View>
              <Text style={styles.blockHeading}>
                Pakistan Medical Association
              </Text>
              <Text style={styles.blockNumber}>1166</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('tel:115');
            }}
            style={styles.block}>
            <Image style={styles.blockImage} source={Edhi}></Image>
            <View>
              <Text style={styles.blockHeading}>Edhi Ambulance Service</Text>
              <Text style={styles.blockNumber}>115</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('tel:1020');
            }}
            style={styles.block}>
            <Image style={styles.blockImage} source={Chippa}></Image>
            <View>
              <Text style={styles.blockHeading}>Chhipa Ambulance Service</Text>
              <Text style={styles.blockNumber}>1020</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('tel:051111157157');
            }}
            style={styles.block}>
            <Image style={styles.blockImage} source={NDMA}></Image>
            <View>
              <Text style={styles.blockHeading}>NDMA</Text>
              <Text style={styles.blockNumber}>051-111-157-157</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomContainer navigation={navigation} />
    </>
  );
};

export default Contact;

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
    marginTop: 20,
  },
  blockHeading: {
    fontSize: 16,
    fontWeight: '800',
  },
  blockNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
  blockImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
});
