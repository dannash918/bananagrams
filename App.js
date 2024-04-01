import React from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Pressable
} from "react-native"
import Animated, {
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Draggable from './Components/Draggable';
import {initLetterPool, getLetters } from './utils/LetterPool'


const Tile = ({letter}) => {
  return (
    <Animated.View style={styles.key}>
      <Text style={styles.keyLetter}>{letter}</Text>
    </Animated.View>
  )
}

const DeckRow = ({
  rowLetters,
}) => {
  return (
  <View style={styles.DeckRow}>
    {rowLetters.map((letter, idx) => (
      <Draggable key={idx}>
        <Tile key={idx} letter={letter} />
      </Draggable>
    ))}
  </View>
)}

const Deck = ({ letters }) => {
  const kl = [...letters]
  var keyRows = []
  while (kl.length > 10) {
    row = kl.splice(0, 9)
    keyRows.push(row)
  }
  keyRows.push(kl)
  console.log(keyRows)

  const removeLetterFromTiles = (idx) => {
    const keyboardLetters = [...letters]
    keyboardLetters.splice(idx, 1)
    setDeckLetters(keyboardLetters)
  }

  return (
    <View style={styles.keyboard}>
      {keyRows.map((kr, idx) => (
        <DeckRow style={styles.DeckRow} key={idx} rowLetters={kr} />))}
    </View>
  )
}

export default function App() {
  const [letterPool, setLetterPool] = React.useState(() => initLetterPool())
  const [deckLetters, setDeckLetters] = React.useState(() => getLetters(9, letterPool, setLetterPool))

  const handlePeel = (letterPool, setLetterPool) => {
    newLetters = getLetters(3, letterPool, setLetterPool)
    allLetters = deckLetters.concat(newLetters)
    setDeckLetters(allLetters)
  }

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView >
        <Text style={styles.heading}>Bananagrams!!</Text>
        <View style={styles.playArea} />
        <View style={styles.letterArea} >
          <Text style={styles.notes}>Letters left: {letterPool.length}</Text>
          <Deck letters={deckLetters} />
        </View>
        <Pressable style={styles.peel} onPress={() => handlePeel(letterPool, setLetterPool)}>
          <View style={styles.key}>
            <Text style={styles.peelText} >PEEL</Text>
          </View>
        </Pressable>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  playArea: {
    flex: 8,
  },
  letterArea: {
    flex: 2,
  },
  heading: {
    textAlign: "center",
    flex: 1,
  },
  notes: {
    marginTop: 20,
    textAlign: "center",
    flex: 1
  },
  heading: {
    marginTop: 20,
    textAlign: "center",
    flex: 1
  },
  peel: {
    flex: 1,
  },
  peelText: {
    textAlign: "center",
  },
  keyboard: { 
    flexDirection: "column",
  },
  DeckRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    // position: 'absolute'
  },
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