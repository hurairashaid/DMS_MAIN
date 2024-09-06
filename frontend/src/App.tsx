// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screen/HomeScreen';
import Precautions from './screen/Precautions';
import Contact from './screen/Contact';
import DiastersInformation from './screen/DiastersInformation';
import DisasterRecovery from './screen/DisasterRecovery';
import EvacuationCenters from './screen/EvacuationCenters';
import SignIn from './screen/SignIn';
import Profile from './screen/Profile';
import AddDisaster from './screen/AddDisaster';
import ApprovedDisaster from './screen/ApprovedEvacuation';
import AddEvacuation from './screen/AddEvacuation';
import UnapprovedEvacuation from './screen/UnapprovedEvacuation';
import ApprovedEvacuation from './screen/ApprovedEvacuation';
import AllUnapprovedEvacuation from './screen/AllUnapprovedEvacuation';
import SignUp from './screen/SignUp';
import Chat from './screen/Chat';
import Messaging from './screen/Messaging';
import UnapprovedVolunteer from './screen/UnapprovedVolunteer';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DiastersInformation"
          component={DiastersInformation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Precautions"
          component={Precautions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DisasterRecovery"
          component={DisasterRecovery}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EvacuationCenter"
          component={EvacuationCenters}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddDisaster"
          component={AddDisaster}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ApprovedEvacuation"
          component={ApprovedEvacuation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddEvacuation"
          component={AddEvacuation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UnapprovedEvacuation"
          component={UnapprovedEvacuation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AllUnapprovedEvacuation"
          component={AllUnapprovedEvacuation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Messaging"
          component={Messaging}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UnapprovedVolunteer"
          component={UnapprovedVolunteer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
