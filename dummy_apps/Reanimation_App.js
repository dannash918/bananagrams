import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const SIZE = 120;

export default function App() {
  const xOffset = useSharedValue(0);
  const yOffset = useSharedValue(0);
  const isActive = useSharedValue(false);
  const scaleDownAnimation = useSharedValue(1);

  const pan = Gesture.Pan()
    .onBegin((event) => {
      isActive.value = true;
      scaleDownAnimation.value = withSpring(1.5);
    })  
    .onChange((event) => {
      xOffset.value += event.changeX;
      yOffset.value += event.changeY;
    })
    .onFinalize((event) => {
      isActive.value = false;
      scaleDownAnimation.value = withSpring(1);
    });

  const animatedStyles = useAnimatedStyle(() => {
    const zIndex = isActive.value ? 1000 : 1;
    const scale = isActive.value ? 1.5 : 1;
    console.log(`"zIndex: ${zIndex} Scale: ${scale}`)
    return {
      transform: [{ translateX: xOffset.value }, { translateY: yOffset.value }, {scale: scale}],
    }
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View onLayout={onLayout} style={styles.wrapper}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    cursor: 'grab',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import 'react-native-gesture-handler';
// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
//   withTiming,
// } from 'react-native-reanimated';
// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
// } from 'react-native-gesture-handler';

// export default function App() {
//   const pressed = useSharedValue(false);
//   const offset = useSharedValue(0);

//   const pan = Gesture.Pan()
//     .onBegin(() => {
//       pressed.value = true;
//     })
//     .onChange((event) => {
//       offset.value = event.translationX;
//     })
//     .onFinalize((event) => {
//       offset.value = event.translationX; //withSpring(0);
//       pressed.value = false;
//     });

//   const animatedStyles = useAnimatedStyle(() => ({
//     transform: [
//       { translateX: offset.value },
//       { scale: withTiming(pressed.value ? 1.2 : 1) },
//     ],
//     backgroundColor: pressed.value ? '#FFE04B' : '#b58df1',
//   }));

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <View style={styles.container}>
//         <GestureDetector gesture={pan}>
//           <Animated.View style={[styles.circle, animatedStyles]} />
//         </GestureDetector>
//       </View>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//   },
//   circle: {
//     height: 120,
//     width: 120,
//     backgroundColor: '#b58df1',
//     borderRadius: 500,
//     cursor: 'grab',
//   },
// });