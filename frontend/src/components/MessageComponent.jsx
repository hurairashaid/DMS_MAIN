import {View, Text, StyleSheet, Modal, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import ImageViewer from 'react-native-image-zoom-viewer';

export default function MessageComponent({item}) {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const images = [];
  if (item.files) {
    item.files.map(e => {
      const data = {
        url: e,
      };
      images.push(data);
    });
  }

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken !== null) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Failed to load token from AsyncStorage:', error);
      }
    };

    loadToken();
  }, []);

  useEffect(() => {
    const decodedToken = token ? jwtDecode(token) : null;
    if (decodedToken && decodedToken.response && decodedToken.response._id) {
      setUserId(decodedToken.response._id);
    } else {
      setUserId('');
    }
  }, [token]);

  useEffect(() => {
    // Check if userId matches the senderId in the item
    if (userId && item.senderId && userId === item.senderId._id) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }, [userId, item.senderId]);

  return (
    <View>
      <View
        style={
          status
            ? styles.mmessageWrapper
            : [styles.mmessageWrapper, {alignItems: 'flex-end'}]
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Ionicons
                        name='person-circle-outline'
                        size={30}
                        color='black'
                        style={styles.mavatar}
                    /> */}
          <View
            style={
              status
                ? styles.mmessage
                : [
                    styles.mmessage,
                    {
                      backgroundColor: 'orange',
                      borderRadius: 5,
                      color: 'white',
                    },
                  ]
            }>
            <Text>{item.content}</Text>

            {images.map(e => {
              return (
                <Image
                  source={{
                    uri: e.url,
                  }}
                  style={{
                    marginBottom: 10,
                    marginHorizontal: 'auto',
                    height: 100,
                    width: 100,
                  }}></Image>
              );
            })}
            {/* <Modal
              visible={modalVisible}
              transparent={true}
              onRequestClose={() => setModalVisible(false)}>
              <ImageViewer
                imageUrls={[images
                ]}
                onClick={() => setModalVisible(false)}
              />
            </Modal> */}
          </View>
        </View>
        <Text style={{marginLeft: 10, marginRight: 10, fontSize: 12}}>
          {item.senderId.username}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginscreen: {
    flex: 1,
    backgroundColor: '#EEF1FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    width: '100%',
  },
  loginheading: {
    fontSize: 26,
    marginBottom: 10,
  },
  logininputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logininput: {
    borderWidth: 1,
    width: '90%',
    padding: 8,
    borderRadius: 2,
  },
  loginbutton: {
    backgroundColor: 'green',
    padding: 12,
    marginVertical: 10,
    width: '60%',
    borderRadius: '50%',
    elevation: 1,
  },
  loginbuttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
  chatscreen: {
    backgroundColor: '#F7F7F7',
    flex: 1,
    padding: 10,
    position: 'relative',
  },
  chatheading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  chattopContainer: {
    backgroundColor: '#F7F7F7',
    height: 70,
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  chatheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatlistContainer: {
    paddingHorizontal: 10,
  },
  chatemptyContainer: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatemptyText: {fontWeight: 'bold', fontSize: 24, paddingBottom: 30},
  messagingscreen: {
    flex: 1,
  },
  messaginginputContainer: {
    width: '100%',
    minHeight: 100,
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  messaginginput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
  },
  messagingbuttonContainer: {
    width: '30%',
    backgroundColor: 'green',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  modalbutton: {
    width: '40%',
    height: 45,
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  modalbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modaltext: {
    color: '#fff',
  },
  modalContainer: {
    width: '100%',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    elevation: 1,
    height: 400,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  modalinput: {
    borderWidth: 2,
    padding: 15,
  },
  modalsubheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  mmessageWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  mmessage: {
    maxWidth: '80%',
    backgroundColor: '#f5ccc2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
  },
  mvatar: {
    marginRight: 5,
  },
  cchat: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    height: 80,
    marginBottom: 10,
  },
  cavatar: {
    marginRight: 15,
  },
  cusername: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  cmessage: {
    fontSize: 14,
    opacity: 0.7,
  },
  crightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  ctime: {
    opacity: 0.5,
  },
});
