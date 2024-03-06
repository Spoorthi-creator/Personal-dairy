import {useEffect, useState} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity, ImageBackground,Dimensions,Pressable, ScrollView ,TextInput,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import styles from "../styles";
import { MaterialIcons } from '@expo/vector-icons';

import {db,collection,addDoc,setDoc,doc,auth,signOut, query, where,getDocs} from "../firebase"
//import firebase from "firebase";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  
  
} from "react-native-reanimated";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateDoc } from 'firebase/firestore';



export default function Home({ route,navigation })  {
  
  const[journal,setjournal]=useState(null);
  const [isLoading, setLoading] = useState(false);
  const d=new Date();
  const month = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  const date=
  new Date().getDate() +
  '-' +
  month[d.getMonth()] +
  '-' +
  new Date().getFullYear();

  const { height, width } = Dimensions.get("window");
  const formButtonScale = useSharedValue(1);

  useEffect(()=>{
   
    
   },[])
const saveJournal=async()=>{

  try {
   
     await addDoc(collection(db,auth.currentUser.email), {
      journal: journal,
      date:date
      
    });
    
   // console.log("Document written with ID: ", docRef.id);
    alert('Journal saved');
    navigation.navigate('AllJournals');
    setjournal(null);

    
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Oops! Something went wrong, try again");
  }
}
const formButtonAnimatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{scale: formButtonScale.value}]
  }
})
 const logout=()=>{
  signOut(auth).then(() => {
    navigation.navigate('FlashScreen')
   alert("Logged out")
  }).catch((error) => {
    alert("Something went wrong, try again later")
  });
  
 }

  return (
    <ScrollView styles={{flex:1,height:height,width:width}}>
      <ImageBackground source={require('../assets/signup.png')} style={{width:width,height:height}}>

        <View>
          <View style={{flexDirection:'row',justifyContent:'space-between',margin:5,marginTop:10}}>
          <Text style={{alignSelf:'flex-start',fontSize:20,color:'black'}}>Hey Pal!</Text>
          <MaterialIcons name="logout" size={24} color="black" style={{alignSelf:'flex-end'}} onPress={logout}/>
        
          </View>
       
            <Text style={{alignSelf:'flex-start',fontSize:20,color:'white'}}>How was your day today?</Text>
            <ScrollView horizontal>
                <View stye={{margin:4,justifyContent:'center',alignItems:'center',padding:10}}>
                     <Image source={require('../assets/smiling-cool.png')} style={{height:100,width:100,backgroundColor:'white',borderRadius:10,padding:20,margin:10}}></Image>
                     <Text style={{alignSelf:'center'}}>Cool</Text>
                </View>
                <View stye={{margin:4,justifyContent:'center',alignItems:'center',padding:10}}>
                     <Image source={require('../assets/smiling.png')} style={{height:100,width:100,backgroundColor:'white',borderRadius:10,padding:20,margin:10}}></Image>
                     <Text style={{alignSelf:'center'}}>Happy</Text>
                </View>

                <View stye={{margin:4,justifyContent:'center',alignItems:'center',padding:10}}>
                     <Image source={require('../assets/smiling-tear.png')} style={{height:100,width:100,backgroundColor:'white',borderRadius:10,padding:20,margin:10}}></Image>
                     <Text style={{alignSelf:'center'}}>Emotionally Happy</Text>
                </View>

                <View stye={{margin:4,justifyContent:'center',alignItems:'center',padding:10}}>
                     <Image source={require('../assets/crying-face.png')} style={{height:100,width:100,backgroundColor:'white',borderRadius:10,padding:20,margin:10}}></Image>
                     <Text style={{alignSelf:'center'}}>Not so great</Text>
                </View>
            </ScrollView>
       
     <KeyboardAwareScrollView>
      <View style={{borderRadius:50,backgroundColor:'white',height:height/1.7,margin:10,shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor:'grey', borderWidth:5}}> 
      
      <TextInput
      placeholder='How are you feeling at this moment?'
        editable
        autoCorrect
        multiline
        numberOfLines={10}
        maxLength={500}
        onChangeText={text => setjournal(text)}
        value={journal}
        style={{padding: 10,fontStyle:'italic'}}
      />
      <TouchableOpacity
  onPress={() => navigation.navigate('AllJournals')}
  style={{height:20,width:20,borderRadius:50,alignSelf:'flex-end',margin:60}}>
  <Image source={require("../assets/dairy2.jpeg")} style={{height:70,width:70}}></Image>
</TouchableOpacity>
        </View>
       </KeyboardAwareScrollView>
       {/* <ActivityIndicator size={'small'} animating={isLoading} style={{alignSelf:'center',justifyContent:'center'}}/> */}
        <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <TouchableOpacity onPress={saveJournal} >
              <Text style={styles.buttonText}>
               SAVE
              </Text>
            </TouchableOpacity>
            </Animated.View>
          



            </View>

  
        </ImageBackground>
      
    </ScrollView>
  );
}

