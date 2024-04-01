import React from "react";
import { StyleSheet, Text } from 'react-native';
import {
    Gesture,
    GestureDetector,
  } from 'react-native-gesture-handler';
import Animated from "react-native-reanimated";
import {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';

// TODO Issues with using a Pan Gesture in combo with the one in Draggable, so probs easiest to just have one

const Tile = ({letter}) => {
    const yPosition = useSharedValue(0)
  
    const drag = Gesture.Pan()
        .onBegin((event) => {
        })  
        .onChange((event) => {
        })
        .onFinalize((event) => {
            yPosition.value = event.absoluteY;
            console.log("Y Position: " + yPosition.value)
            if (event.absoluteY > 500) {
                console.log("Moved to top half")
            }
        });
  
        const animatedStyle = useAnimatedStyle(() => {
            // const zIndex = isActive.value ? 50 : 1;
            // const scale = isActive.value ? 1.2 : 1;
            return {}
            //     position: "relative",
            //     zIndex: zIndex,
            //     transform: [
            //         { translateX: xOffset.value }, 
            //         { translateY: yOffset.value }, 
            //         { scale: scale }
            //     ]
            // }
        });
    
    return (
      <Animated.View style={[styles.key, animatedStyle]}>
        <GestureDetector gesture={drag} >
          <Text style={styles.keyLetter}>{letter}</Text>
        </GestureDetector>
      </Animated.View>
    )
  }

export default Tile

const styles = StyleSheet.create({
    key: {
      backgroundColor: "#d3d6da",
      padding: 10,
      margin: 3,
      borderRadius: 5,
    },
    keyLetter: {
      fontWeight: "500",
      fontSize: 15,
    },
  })