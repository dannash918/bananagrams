import React from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Pressable
} from "react-native"
import Animated, { useSharedValue } from 'react-native-reanimated';
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

const Board = ({boardLetters, handleTileMove}) => {
  return (
    <View style={styles.DeckRow}>
    {boardLetters.map((letter, letterIdx) => (
      <Draggable key={letterIdx} handleTileMove={handleTileMove} letter={letter}>
        <Tile key={letterIdx} letter={letter.letter} />
      </Draggable>
    ))}
  </View>
  )
}

const Deck = ({
  deckLetters,
  handleTileMove,
}) => { 
  console.log("Creating Deck")
  return (
  <View style={styles.DeckRow}>
    {deckLetters.map((letter, letterIdx) => (
      <Draggable key={letterIdx} handleTileMove={handleTileMove} letter={letter}>
        <Tile key={letterIdx} letter={letter.letter} />
      </Draggable>
    ))}
  </View>
)}

export default function App() {
  const [letterPool, setLetterPool] = React.useState(() => initLetterPool())
  const [deckLetters, setDeckLetters] = React.useState(() => getLetters(9, letterPool, setLetterPool))
  const [boardLetters, setBoardLetters] = React.useState(() => getLetters(3, letterPool, setLetterPool))

  const handlePeel = (letterPool, setLetterPool) => {
    newLetters = getLetters(3, letterPool, setLetterPool)
    allLetters = deckLetters.concat(newLetters)
    setDeckLetters(allLetters)
  }

  const handleTileMove = (letter) => {
    console.log("Letter ID is: " + letter.id + " and Letter is " + letter.letter + " and onBoard is: " + letter.onBoard)
    
    if (letter.onBoard) {
      const letterIdx = deckLetters.findIndex(l => l.id == letter.id)
      if (letterIdx > -1) {
        console.log("Switching letters!")
        newdeckLetters = [...deckLetters]
        newdeckLetters.splice(letterIdx, 1)
        setDeckLetters(newdeckLetters)

        newBoardLetters = [...boardLetters]
        newBoardLetters.push(letter)
        setBoardLetters(newBoardLetters)
      }
    } else {
      const letterIdx = boardLetters.findIndex(l => l.id == letter.id)
      if (letterIdx > -1) {
        console.log("Switching letters!")
        newBoardLetters = [...boardLetters]
        newBoardLetters.splice(boardLetters, 1)
        setBoardLetters(newBoardLetters)

        newdeckLetters = [...deckLetters]
        newdeckLetters.push(letter)
        setDeckLetters(newdeckLetters)
      }
    }
  }

  console.log(deckLetters)
  console.log(boardLetters)

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView >
        <Text style={styles.heading}>Bananagrams!!</Text>
        <View style={styles.playArea} />
          <Board boardLetters={boardLetters} handleTileMove={handleTileMove}></Board>
        <View style={styles.letterArea} >
          <Text style={styles.notes}>Letters left: {letterPool.length}</Text>
          <Deck deckLetters={deckLetters} handleTileMove={handleTileMove} />
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