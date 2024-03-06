import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashScreen from '../screens/FlashScreen';
import Register from '../screens/Register';
import LoginScreen from '../screens/LoginScreen';
import Home from '../screens/Home';
import AllJournals from '../screens/AllJournals';
import ViewDetailJournals from '../screens/ViewDetailJournals';
import LoadingScreen from '../screens/LoadingScreen';
const Stack = createNativeStackNavigator();


function StackNavigation() {
    return (

        <Stack.Navigator
        screenOptions={{
            headerStyle: {
              backgroundColor:'#cccccc' ,
              shadowOpacity: 0,
              elevation: 0,
              height:50,
            },
            headerTintColor: 'black',
          }}>

            <Stack.Screen
                name="LoadingScreen"
                component={LoadingScreen}
                options={{headerShown:false}}

                


            />   

            <Stack.Screen
                name="FlashScreen"
                component={FlashScreen}
                options={{ headerShown: false }}


            />

<Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: true }}


            />

<Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: true }}


            />

<Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}


            />

<Stack.Screen
                name="AllJournals"
                component={AllJournals}
                options={{title:" ", headerShown: true, headerBackTitleStyle:{fontSize:20} } }


            />
            <Stack.Screen
                name="ViewDetailJournals"
                component={ViewDetailJournals}
                options={{title:" ", headerShown: true, headerBackTitleStyle:{fontSize:20} } }


            />


        </Stack.Navigator>



    );
}
export default StackNavigation;
