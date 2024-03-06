

import React, { useEffect, useState } from "react";
import { ImageBackground, Touchable, TouchableOpacity } from "react-native";
import { View, Text ,Dimensions,FlatList} from "react-native";
import {db,collection,addDoc,setDoc,doc,auth,getDocs,deleteDoc} from "../firebase"

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AllJournals ({navigation}) {
    const[journalData,setJournalData]=useState([]);
    const [deleted, setDeleted] = useState(false);
    const { height, width } = Dimensions.get("window");
    useEffect(()=>{
        getData();
    },[]);

    useEffect(()=>{
      getData();
      setDeleted(false);
    },[deleted]);

    const getData=async()=>{
        const querySnapshot = await getDocs(collection(db,auth.currentUser.email));
        const journal = [];
querySnapshot.forEach((doc) => {
journal.push({
...doc.data(),
id:doc.id
});
console.log(doc.id, " => ", doc.data());


});
setJournalData(journal);
    };

    const deletePost=async(journalId)=>{
      await deleteDoc(doc(db, auth.currentUser.email, journalId)).then(()=>{
        alert("Post deleted! ")
        setDeleted(true);
      })
      }


  return (
  <ImageBackground source={require('../assets/screen2.png')}style={{height:height,width:width}} >
    <View style={{flex:1,width:width,height:height,alignContent:'center',margin:5}}>
      
      {/* <Text style={{fontSize:25,margin:15,padding:10,marginTop:20}}>My Journals</Text> */}
    
   
      
  {
    journalData ?
    
    <FlatList
      style={{flex:1,height:height-100,width:width-100,marginBottom:50,alignSelf:'center',marginTop:height/6}}
      scrollEnabled
      data={journalData}
      renderItem={({ item }) =>
     
      <TouchableOpacity style={{alignSelf:'center',justifyContent:'center',alignContent:'center',width:width-100,height:100,borderRadius:30,borderWidth:1,margin:10, padding:10,
       shadowOffset: {
         width: 0,
        height: 4,
       },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
     
      borderColor:'black', borderWidth:3
      }} onPress={()=>navigation.navigate('ViewDetailJournals',{journalDetails:item})}>
       
         <Text style={{fontSize:15,textAlign:'center',color:'black',margin:5,alignSelf:'center'}}>{item.journal}</Text>
         <View style={{flexDirection:'row',justifyContent:'flex-end',marginBottom:10}}>
         <Text style={{fontSize:15,alignSelf:'flex-end',marginRight:5,color:'brown'}}>{item.date}</Text>
         <TouchableOpacity style={{alignSelf:'flex-end',marginRight:10}} onPress={()=>deletePost(item.id)}>
                 <MaterialCommunityIcons name="delete-empty" size={22} color="red" />
                 </TouchableOpacity>
         </View>
       
         
       
         </TouchableOpacity>}
      keyExtractor={item=>item.id}
    //  estimatedItemSize={200}
    />
    : alert('No records at the moment')
  }
    </View>
    </ImageBackground>
   
  );

};
