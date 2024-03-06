import { ImageBackground, StyleSheet, Text, View ,Dimensions} from 'react-native'
import React from 'react'

export default function  ViewDetailJournals  ({route}) {
    const journal=route.params.journalDetails['journal']
    const date=route.params.journalDetails['date']
    const { height, width } = Dimensions.get("window");
  return (
    <ImageBackground source={require('../assets/screen1.png')}style={{height:height,width:width}} >
    <View style={{ alignSelf:'center',height:height,width:width-100,marginTop:height/7}} >
    <Text style={{textAlign:'left',fontSize:15,color:'red'}}>{date}</Text>
      <Text style={{textAlign:'left',fontSize:20}}>{journal}</Text>
      {/* <Text>{date}</Text> */}
    </View>
    </ImageBackground>
  )
}



const styles = StyleSheet.create({})



