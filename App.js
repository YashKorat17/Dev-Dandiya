import React,{
  useEffect,useRef,useState
} from "react";
import { PermissionsAndroid,View,TouchableOpacity,Text } from "react-native";
import TouchID from 'react-native-touch-id'
import { NavigationContainer,DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Student from "./Pages/Student";



const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,

      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          var newPerson = { 
            givenName: 'John',
            familyName: 'Doe',
            phoneNumbers: [{
              label: 'mobile',
              number: '(555) 555-5555',
            },
              
            ]
          }
          Contacts.addContact(newPerson).then((contact) => {
            console.log(contact)
          }).catch((e) => { 
            console.log(e)
          })

        .catch((e) => { //handle error })
        });
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};


const Stack = createNativeStackNavigator();

const App = () => {

  



useEffect(() => {

  requestCameraPermission();

  TouchID.isSupported()
  .then(biometryType => {
    if (biometryType === true) {
      console.log('TouchID is supported on this device');
    } else {
      console.log('TouchID is not supported on this device');
    }
  })
  .catch(error => {
    console.log(error);
  });

  TouchID.authenticate('to demo this react-native component')
  .then(success => {
    console.log('Authenticated Successfully');
  })
  .catch(error => {
    console.log(error);
  });
  
}, []);

  return (
    <NavigationContainer theme={
      {
        colors: {
          text: 'black',
        },
      }
    }>
      <Stack.Navigator >
        <Stack.Screen name="Student" options={{
          headerShown: false,
        }} component={Student} />
      </Stack.Navigator>
    </NavigationContainer>

  );


}

export default App;