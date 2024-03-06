import {useState} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity, ImageBackground,Dimensions,Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import styles from "../styles";
import {signInWithEmailAndPassword,auth,sendPasswordResetEmail} from "../firebase"
import Animated, {
  useSharedValue,
  useAnimatedStyle,

} from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from './VisibleInvisible';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//const [isLoading, setLoading] = useState(false);

export default function  LoginScreen   ({ navigation })  {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
  const [email, setEmail] = useState(null)
//  const [name, setName] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
//  const [validationMessage, setValidationMessage] = useState(null)
  const { height, width } = Dimensions.get("window");
  const formButtonScale = useSharedValue(1);
  
 
  let validateAndSet = (value,setValue) => {
   setValue(value)
}


const forgotPassword=()=>{
  if(email != ""){
    sendPasswordResetEmail(auth, email)
.then(() => {
  alert("The Email has been sent")
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage)
});
  }else {
    alert("Please provide Email")
  }
}
  

  
const formButtonAnimatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{scale: formButtonScale.value}]
  }
})
function checkPassword(firstpassword,secondpassword) {
  if(firstpassword !== secondpassword || secondpassword!==firstpassword){
    //setValidationMessage('Password do not match') 
    alert("Passwords do not match")
  }
 // else setValidationMessage('')
}
  async function createAccount() {
   // setLoading(true)
    if(email!=="" && password!==""){
    
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    //   setInterval(() => {
    //     setLoading(false)
    // }, 2000);
    alert("Welcome to MyJournal");
    navigation.navigate('Home');
    setEmail(null);
   // setName(null);
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
    <View styles={{flex:1}}>
      <ImageBackground source={require('../assets/2.png')} style={{width:width,height:height}} resizeMode="cover">
     
      <View style={{borderRadius:50,backgroundColor:'white',justifyContent:'center',height:height/1.5,margin:10,marginTop:height/7,shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,}}> 
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: '10%', marginTop: '5%', color: '#FFCC00' }}>LOGIN</Text>
    
        
        
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
      
        <Pressable onPress={forgotPassword} style={{alignSelf:'center',margin:5}}>
            <Text style={{fontSize:14}}>Forgot Password?</Text>
        </Pressable>
        <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <TouchableOpacity onPress={createAccount}>
              <Text style={styles.buttonText}>
               LOGIN
              </Text>
            </TouchableOpacity>
            </Animated.View>
            {/* <ActivityIndicator size={'large'} animating={isLoading} style={{alignSelf:'center',justifyContent:'center'}}/> */}
            </View>
        </ImageBackground>
      
    </View>
  );
}

