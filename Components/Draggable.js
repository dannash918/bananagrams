import React from "react";
import {
    Gesture,
    GestureDetector,
  } from 'react-native-gesture-handler';
import Animated from "react-native-reanimated";
import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

const Draggable = ({children, handleTileMove, letter}) => { 
    // console.log("Position is: " + letter.pos)
    
    const xOffset = useSharedValue(0);
    const yOffset = useSharedValue(0);
    const isActive = useSharedValue(false);

    const drag = Gesture.Pan()
        .onBegin((event) => {
            isActive.value = true;
        })  
        .onChange((event) => {
            xOffset.value += event.changeX;
            yOffset.value += event.changeY;
        })
        .onFinalize((event) => {
            isActive.value = false;
            xOffset.value += -1 * xOffset.value;
            yOffset.value += -1 * yOffset.value;
            if (event.absoluteY < 700) {
                letter.onBoard = true
            }
            else (
                letter.onBoard = false
            )
            handleTileMove(letter)
        });

        const animatedStyles = useAnimatedStyle(() => {
            const zIndex = isActive.value ? 50 : 1;
            const scale = isActive.value ? 1.2 : 1;
            return {
                position: "relative",
                zIndex: zIndex,
                transform: [
                    { translateX: xOffset.value }, 
                    { translateY: yOffset.value }, 
                    { scale: scale }
                ]
            }
        });

    return (
        <Animated.View style={animatedStyles}>
            <GestureDetector gesture={drag} >
                <Animated.View >{children}</Animated.View>
            </GestureDetector>
        </Animated.View>
    );
};

export default Draggable