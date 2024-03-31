import React from "react";
import { StyleSheet } from 'react-native';
import {
    Gesture,
    GestureDetector,
  } from 'react-native-gesture-handler';
import Animated from "react-native-reanimated";
import {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {MARGIN} from './utils'

const Draggable = ({children}) => {
    const xOffset = useSharedValue(0);
    const yOffset = useSharedValue(0);
    const isActive = useSharedValue(false);

    const pan = Gesture.Pan()
        .onBegin((event) => {
            isActive.value = true;
        })  
        .onChange((event) => {
            xOffset.value += event.changeX;
            yOffset.value += event.changeY;
        })
        .onFinalize((event) => {
            isActive.value = false;
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
        <Animated.View>
            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.draggable, animatedStyles]}>{children}</Animated.View>
            </GestureDetector>
        </Animated.View>
    );
};

export default Draggable

const styles = StyleSheet.create({
    draggable: {
      color: "red"
    },
  });