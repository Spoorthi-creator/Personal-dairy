import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import styles from "../styles";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring
} from "react-native-reanimated";




export default function FlashScreen({navigation}) {
  const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);
 

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: formButtonScale.value}]
    }
  })

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      runOnJS(setIsRegistering)(false);


     


    }
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      runOnJS(setIsRegistering)(true);

     

    }
  };

  return (
  
    <Animated.View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height+100} />
          </ClipPath>
          <Image
            href={require("../assets/flash.jpeg")}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <Animated.View
          style={[styles.closeButtonContainer, closeButtonContainerStyle]}
        >
          <Text onPress={() => (imagePosition.value = 1)}>X</Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>START PENNING DOWN</Text>
          </Pressable>
        </Animated.View>
        {/* <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View> */}
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
           
          {/* <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            style={styles.textInput}
            onChangeText={(email) => setEmail(email)}
          /> */}
          {/* {isRegistering && (
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="black"
              style={styles.textInput}
            />
          )} */}
          {/* <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          /> */}
          <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <Pressable onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.buttonText}>
               LOGIN
              </Text>
            </Pressable>

          

          </Animated.View>
          <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
          <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>
               REGISTER
              </Text>
            </Pressable>
            </Animated.View>
        
        </Animated.View>
      </View>
    </Animated.View>
    
  );
}
