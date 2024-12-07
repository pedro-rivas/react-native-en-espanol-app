import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { withSpring, useSharedValue, useAnimatedStyle} from 'react-native-reanimated';

const LEFT = 20;
const RIGHT = 20;
const TOP = 20;
const BOTTOM = 20;

const LINE_WIDTH = 2;
const PLAYER_SIZE = 50;

const SCREEN_WIDTH = Dimensions.get('window').width - LEFT - RIGHT;
const SCREEN_HEIGHT = Dimensions.get('window').height - TOP - BOTTOM;

const PLAYERS = [
  'https://img.uefa.com/imgml/TP/players/1/2025/75x75/250011668.jpg',
  'https://img.uefa.com/imgml/TP/players/1/2025/75x75/250121965.jpg',
  'https://img.uefa.com/imgml/TP/players/1/2025/75x75/250024448.jpg',
  'https://img.uefa.com/imgml/TP/players/1/2025/75x75/250028211.jpg',
  'https://img.uefa.com/imgml/TP/players/1/2025/75x75/250193232.jpg',
  'https://img.uefa.com/imgml/TP/players/1/2025/75x75/74699.jpg',
  'https://img.uefa.com/imgml/TP/players/1/2025/75x75/74699.jpg',
  'https://img.uefa.com/imgml/TP/players/1/2025/75x75/250161881.jpg',
  'https://img.uefa.com/imgml/TP/players/1/2025/75x75/250040521.jpg',
  'https://img.uefa.com/imgml/TP/players/1/2025/75x75/250086709.jpg',
  'https://img.uefa.com/imgml/TP/players/1/2025/75x75/250121533.jpg',
]

export default function TacticalLayout() {


  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <View style={styles.field}>
      <View style={styles.leftLine}/>
      <View style={styles.rightLine}/>
      <View style={styles.bottomLine}/>
      <View style={styles.topLine}/>
      <View style={styles.centerLine}/>
      <View style={styles.centerCircle}/>

      {
        PLAYERS.map((_, i) => {

          const pos = useSharedValue({ x: 20, y: i * 80 });

          const active = useSharedValue(false);

          const gesture = Gesture.Pan()
          .minDistance(0)
          .onBegin(()=>{
            active.value = true
          })
          .onChange((e)=>{
            pos.value = { 
              x: pos.value.x + e.changeX,
              y: pos.value.y + e.changeY
            }
          })
          .onFinalize(()=>{
            active.value = false
          })

          const animtedPos = useAnimatedStyle(()=>{
            return {
              zIndex: active.value ? 100 : 0,
              transform: [ 
                {  translateX: withSpring(pos.value.x) }, 
                { translateY: withSpring(pos.value.y) },
                { scale: active.value ? 1.2 : 1 }, 
              ]
              }
          } )

          const animatedTarget = useAnimatedStyle(()=>{

            return {
              display: active.value ? 'flex' : 'none',
              transform: [ 
                { translateX: withSpring(pos.value.x + 10) }, 
                { translateY: withSpring(pos.value.y + 5) },
              ]
            }
          })

          return (
            <React.Fragment key={i}>
              <Animated.View style={[, {
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                width: PLAYER_SIZE,
                height: PLAYER_SIZE ,
                borderRadius: PLAYER_SIZE / 2,
              }, animatedTarget]} />
              <GestureDetector key={i} gesture={gesture}>
                <Animated.Image key={i}
                source={{ uri: _ }}
                style={[
                  {
                    width: PLAYER_SIZE,
                    height: PLAYER_SIZE,
                    borderRadius: PLAYER_SIZE / 2,
                    backgroundColor: '#fff',
                    position: 'absolute',
                  },
                  animtedPos
                ]}/>
            </GestureDetector>
            </React.Fragment>
          )
      })
      }
      </View>
    </GestureHandlerRootView> 
  );
}

const styles = StyleSheet.create({
  field: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#4dc176',
  },
  leftLine: {
    width: LINE_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 20,
    left: 20,
    bottom: 20,
  },
  rightLine: {
    width: LINE_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 20,
    right: 20,
    bottom: 20,
  },
  bottomLine: {
    height: LINE_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
  },
  topLine: {
    height: LINE_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 20,
    right: 20,
    top: 20,
  },
  centerLine: {
    height: LINE_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 20,
    right: 20,
    top: SCREEN_HEIGHT / 2 + 20,
  },
  centerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    left: SCREEN_WIDTH / 2 + 20,
    top: SCREEN_HEIGHT / 2 + 10,
  }
});