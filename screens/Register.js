import {useState} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity, ImageBackground,Dimensions,Pressable ,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import styles from "../styles";
import { useTogglePasswordVisibility } from './VisibleInvisible';
import {db,createUserWithEmailAndPassword,auth,addDoc,collection,setDoc,doc} from "../firebase"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  
} from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default function  Register ({ navigation }) {
  const [email, setEmail] = useState(null)
  const [name, setName] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [validationMessage, setValidationMessage] = useState(null)
  const { height, width } = Dimensions.get("window");
  const [isLoading, setLoading] = useState(false);
  const formButtonScale = useSharedValue(1);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
  let validateAndSet = (value,setValue) => {
   setValue(value)
}

const formButtonAnimatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{scale: formButtonScale.value}]
  }
})
function checkPassword(firstpassword,secondpassword) {
  if(firstpassword !== secondpassword || secondpassword!==firstpassword){
   alert('Passwords do not match!')
  }
}
   async function createAccount() {
    if(email!=="" && password!=="" && name!==""){
   
    await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    //setLoading(true);
    setDoc(doc(db, "users",auth.currentUser.email),{
           email: email,
              password:password,
              name:name
      
     });
  //    setInterval(() => {
  //     setLoading(false)
  // }, 2000);
     alert("Welcome to MyJournal");
          navigation.navigate('Home');
          setEmail(null);
          setName(null);
          setPassword(null);
          setConfirmPassword(null);


     
    }).catch ((error) =>{
      alert(error.message)
     // setValidationMessage(error.message);
      
   });
  }
  else{
    alert("Please fill all the fields")
  }
  }
  return (
    <KeyboardAwareScrollView>
    <View styles={{flex:1}}>
      <ImageBackground source={require('../assets/2.png')} style={{width:width,height:height,}}resizeMode="cover">
     
      <View style={{borderRadius:50,backgroundColor:'white',justifyContent:'center',height:height/1.5,margin:10,marginTop:height/5.9,shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,}}> 
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: '10%', marginTop: '5%', color: '#FFCC00' }}>REGISTER</Text>
      <Input
          placeholder='Name'
          placeholderTextColor={'black'}
          containerStyle={{marginTop: 10}}
          value={name}
          onChangeText={(text) => setName(text)}
         
          leftIcon={<Ionicons name="person-outline" size={16} color="black" />}
          
            />

        
        <Input
          placeholder='Email'
          placeholderTextColor={'black'}
          containerStyle={{marginTop: 10}}
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={<MaterialCommunityIcons name="email-outline" size={16} color="black" />}
            />
      <View style={{flexDirection:'row',justifyContent:'space-around',alignSelf:'center',alignItems:'center',margin:5}}>
        <Input
          placeholder='Password'
          containerStyle={{marginTop:10}}
          placeholderTextColor={'black'}
          value={password}
          onChangeText={(value) => validateAndSet(value, setPassword)}
          secureTextEntry={passwordVisibility}
          enablesReturnKeyAutomatically
         
          leftIcon={<Icon name='key' size={16} color="black"/>}
          
          

            />
              <Pressable onPress={handlePasswordVisibility} style={{margin:30}}>
    <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
  </Pressable>
  </View>
        <Input
          placeholder='Confirm password'
          containerStyle={{marginTop:10}}
          placeholderTextColor={'black'}
          value={confirmPassword}
          onChangeText={(value) => validateAndSet(value,setConfirmPassword)}
          secureTextEntry={passwordVisibility}
         enablesReturnKeyAutomatically
          leftIcon={<Icon name='key' size={16} color="black"/>}
          onBlur={()=>checkPassword(password,confirmPassword)}
            />  
            {/* {<Text style={styles.error}>{validationMessage}</Text>} */}
       
 
        <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
      
            <TouchableOpacity onPress={createAccount}>
              <Text style={styles.buttonText}>
               REGISTER
              </Text>
            </TouchableOpacity>
            </Animated.View>
            {/* <ActivityIndicator size={'large'} animating={isLoading} style={{alignSelf:'center',justifyContent:'center'}}/> */}
            </View>
        </ImageBackground>
      
    </View>
    </KeyboardAwareScrollView>
  );
}

