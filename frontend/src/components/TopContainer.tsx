import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../assests/Logo.png';
interface TopContainerProps {
  screenName: string; // Changed prop name to screenName and specified it as a string
}
const TopContainer: React.FC<TopContainerProps> = ({ screenName }) => {
  return (
    <View style={styles.topbarContainer}>
      <View>
        <Text style={styles.fontHome}>{screenName}</Text>
      </View>
      <View style={styles.sideContainer}>
        <Icon style={styles.search} name="search" size={14} color="#000000" />
        <Image style={styles.logoImage} source={Logo} />
      </View>
    </View>
  );
};

export default TopContainer;

const styles = StyleSheet.create({
  topbarContainer: {
    paddingHorizontal: 20,

    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fontHome: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  sideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  logoImage: {
    width: 50,
    height: 30,
  },
  search: {
    marginRight: 15,
  },
});
