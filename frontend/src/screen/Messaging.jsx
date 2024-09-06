import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageComponent from '../components/MessageComponent';
import axios from 'axios';
import io from 'socket.io-client';
import {jwtDecode} from 'jwt-decode';
import ImagePicker from 'react-native-image-crop-picker';
import {BASE_URL} from '../API/api';
import UploadImage from '../assests/upload.png';

const Messaging = ({route, navigation}) => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [uploadedImage, setUploadImage] = useState([]);
  const takePhotoFromCamera = () => {
    console.log('camera');
  };
  console.log(uploadedImage);

  const uploadPhotoFromDevice = async () => {
    try {
      const images = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        multiple: true,
      });
      setSelectedImage(images);
    } catch (error) {
      console.error('Image selection error:', error);
    }
  };

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [socketConnection, setsocketConnection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false); // Added state

  const flatListRef = useRef(null);

  useEffect(() => {
    // Function to load token from AsyncStorage when component mounts
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken !== null) {
          setToken(storedToken);
          setIsSignedIn(true); // Update sign-in status
        } else {
          setIsSignedIn(false); // No token means not signed in
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

  const {disasterId} = route.params;

  useEffect(() => {
    if (token !== '') {
      getData(token);
    }
  }, [token, loading]);

  // socket working here
  useEffect(() => {
    if (userId) {
      const socket = io('http://104.214.171.179'); // we have open port 3000 in backend and now we are connecting that port

      socket.emit('setup', userId); // here we call socket method which make user join that socket
      socket.on('connection', () => {
        setsocketConnection(true);
      });

      socket.on('message recieved', newMessageRecieved => {
        console.log('making something uniquely incredible');
        setChatMessages([...chatMessages, newMessageRecieved]);
      });

      return () => {
        socket.disconnect(); // Cleanup socket on unmount
      };
    }
  }, [userId]);

  const getData = token => {
    const socket = io('http://104.214.171.179'); // we have open port 3000 in backend and now we are connecting that port

    const formData = {
      id: disasterId,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`http://${BASE_URL}/chat/groupMessages`, formData, {
        headers,
      })
      .then(function (response) {
        setChatMessages(response.data);
        socket.emit('join chat', disasterId); // this join join the chat group which have the same id as of disaster
        setLoading(false);
      })
      .catch(function (error) {
        console.log('Error fetching data:', error);
      });
  };

  const handleNewMessage = () => {
    const socket = io('http://104.214.171.179'); // we have open port 3000 in backend and now we are connecting that port

    setLoading(true);

    const formData = new FormData();
    formData.append('content', message);
    formData.append('id', disasterId);

    if (selectedImage && selectedImage.length > 0) {
      selectedImage.forEach(image => {
        // Extract file name from URI
        const fileName = image.path.split('/').pop(); // Gets the file name from path

        formData.append('files', {
          uri: image.path, // URI from the image object
          type: image.mime, // MIME type from the image object
          name: fileName || 'photo.jpg', // Extracted file name or a default name
        });
      });
    }
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`http://${BASE_URL}/chat/createMessage`, formData, {
        headers,
      })
      .then(function (response) {
        socket.emit('new message', response);
        setLoading(false);
        setMessage('');
      })
      .catch(function (error) {
        console.log(
          'Error adding evacuation center:',
          error.response ? error.response.data : error.message,
        );
      });
  };

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({animated: true});
  };

  if (!isSignedIn) {
    return (
      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Please sign in to chat</Text>
      </View>
    );
  }

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          {paddingVertical: 15, paddingHorizontal: 10},
        ]}>
        {chatMessages[0] ? (
          <FlatList
            ref={flatListRef}
            data={chatMessages}
            renderItem={({item}) => <MessageComponent item={item} />}
            keyExtractor={item => item._id}
            onContentSizeChange={scrollToBottom}
          />
        ) : (
          ''
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <View style={styles.addImageContainer}>
          <Pressable
            onPress={() => uploadPhotoFromDevice()}
            style={styles.addImageBox}>
            <Image style={{width: 50, height: 50}} source={UploadImage}></Image>
          </Pressable>
        </View>
        <TextInput
          style={styles.messaginginput}
          onChangeText={value => setMessage(value)}
          value={message}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}>
          <View>
            <Text style={{color: '#f2f0f1', fontSize: 15}}>SEND</Text>
          </View>
        </Pressable>
      </View>
      {loading && (
        <View
          style={[
            styles.loadingContainer,
            {
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            },
          ]}>
          <Image
            style={{
              height: 100,
              width: 100,
              marginLeft: '40%',
              marginTop: '70%',
            }}
            source={{
              uri: 'https://i.gifer.com/ZKZg.gif',
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Messaging;

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
    backgroundColor: 'white',
    paddingVertical: 10,
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
    backgroundColor: 'orange',
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
    maxWidth: '50%',
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
  signInContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF1FF',
  },
  signInText: {
    fontSize: 18,
    color: '#333',
  },
});
