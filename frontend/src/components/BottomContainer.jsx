import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const BottomContainer = ({navigation}) => {
  function switchScreen(location) {
    console.log(location);
    
    navigation.navigate(location);
  }
  return (
    <View>
      <View style={styles.footor}>
        <View>
          <TouchableOpacity
            onPress={() => {
              switchScreen('HomeScreen');
            }}>
            <Text>
              <Icon
                style={styles.search}
                name="home"
                size={22}
                color="#000000"
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              switchScreen('DiastersInformation');
            }}>
            <Text>
              <Icon
                style={styles.search}
                name="search"
                size={22}
                color="#000000"
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              switchScreen('SignIn');
            }}>
            <Text>
              <Icon
                style={styles.search}
                name="plus"
                size={22}
                color="#000000"
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              switchScreen('SignIn');
            }}>
            <Text>
              <Icon
                style={styles.search}
                name="child"
                size={22}
                color="#000000"
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              switchScreen('Chat');
            }}>
            <Text>
              <Icon
                style={styles.search}
                name="comment"
                size={22}
                color="#000000"
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BottomContainer;

const styles = StyleSheet.create({
  footor: {
    backgroundColor: 'white',
    height: 50,
    width: '100%',
    marginTop: 50,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    marginTop: 10,
  },
  search: {
    marginRight: 15,
  },
});
