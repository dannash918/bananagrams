import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Pressable,
  Dimensions
} from "react-native"

const initLetterPool = () => {
  // Full bananagrams tileset
  const fullLetters = [
    "J","J","K","K","Q","Q","X","X","Z","Z","B","B","B","C","C","C","F","F","F","H","H","H",
    "M","M","M","P","P","P","V","V","V","W","W","W","Y","Y","Y","G","G","G","G","L","L","L",
    "L","L","D","D","D","D","D","D","S","S","S","S","S","S","U","U","U","U","U","U","N","N",
    "N","N","N","N","N","N","T","T","T","T","T","T","T","T","T","R","R","R","R","R","R","R",
    "R","R","O","O","O","O","O","O","O","O","O","O","O","I","I","I","I","I","I","I","I","I",
    "I","I","I","A","A","A","A","A","A","A","A","A","A","A","A","A","E","E","E","E","E","E",
    "E","E","E","E","E","E","E","E","E","E","E","E"
  ]

  // smaller set for debugging
  const letters = [
    "J","K","Q","X","Z","B","B","C","C","F","F","H","H",
    "M","M","P","P","V","V","W","W","Y","Y","G","G","L",
    "L","L","D","D","D","S","S","S","U","U","U","N","N",
    "N","N","T","T","T","T","R","R","R","R",
    "O","O","O","O","O","O","I","I","I","I","I","I",
    "A","A","A","A","A","A","A","E","E","E","E","E","E",
    "E","E","E"
  ]

  return letters
}

const initLetterGrid = () => {
  const letterGrid = {0:{0: "G",1: "z",2: "x"}, 1:{0: "H"}, 2:{0: "I"}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}, 9:{},
  10:{}, 11:{}, 12:{}, 13:{}, 14:{}, 15:{}, 16:{}, 17:{}, 18:{}, 19:{},
  20:{}, 21:{}, 22:{}, 23:{}, 24:{}, 25:{}, 26:{}, 27:{}, 28:{}, 29:{},
  30:{}, 31:{}, 32:{}, 33:{}, 34:{}, 35:{}, 36:{}, 37:{}, 38:{}, 39:{},}
  return letterGrid
}

const Block = ({letter, isSelected}) => (
  <View style={isSelected ? styles.selectedSquare : styles.guessSquare}>
    <Text style={styles.guessLetter}>{letter}</Text>
  </View>
)

const getCellLetter = (rowNum, colNum, letterGrid) => {
  if(letterGrid[rowNum] != null) {
    if (letterGrid[rowNum][colNum] != null) {
      return letterGrid[rowNum][colNum]
    }
  }
  return ""
}

const Row = ({ letterGrid, rowNum, selectedCell, handleCellClick, setSelectedCell }) => {
  cells = []
  for (let colNum = 0; colNum < 40; colNum++) {
    isSelected = false
    if (selectedCell[0] == rowNum && selectedCell[1] == colNum) {
      isSelected = true
    }
    cells.push(
      <Pressable key={colNum} onPress={() => handleCellClick(rowNum, colNum, setSelectedCell)}>
        <Block letter={getCellLetter(rowNum, colNum, letterGrid)} isSelected={isSelected}/>
      </Pressable>
    )
  }
  return (
    <View style={styles.guessRow}>
      {cells}
    </View>
  )
}

const getRows = (letterGrid, selectedCell, handleCellClick, setSelectedCell) => {
  let rows = [];
  for (let i = 0; i < 40; i++) {
    rows.push(
      <Row key={i} letterGrid={letterGrid} rowNum = {i} selectedCell = {selectedCell} handleCellClick={handleCellClick} setSelectedCell={setSelectedCell} />
    );
  }
  return rows;
};


const KeyboardRow = ({
  rowLetters,
  onKeyPress,
}) => (
  <View style={styles.keyboardRow}>
    {rowLetters.map((letter, idx) => (
      <Pressable key={idx} onPress={() => onKeyPress(letter, idx)}>
        <View style={styles.key}>
          <Text style={styles.keyLetter}>{letter}</Text>
        </View>
      </Pressable>
    ))}
  </View>
)

const getLetters = (numLetters, letterPool, setLetterPool) => {
  const shuffledLetters = letterPool.sort(() => 0.5 - Math.random())
  selectedLetters = shuffledLetters.splice(0, numLetters)
  return selectedLetters
}

const DirectionRow = ({onKeyPress, autoDirect}) => {
  return (
    <View style={styles.keyboardRow}>
      <Text style={styles.directionText}>Direction: </Text>
      <Pressable onPress={() => onKeyPress(autoDirect)}>
        <View style={styles.key}>
          <Text style={styles.keyLetter}> {autoDirect} </Text>
        </View>
      </Pressable>
    </View>
  )
}

const Keyboard = ({ letters, onKeyPress }) => {
  const kl = [...letters]
  var keyRows = []
  while (kl.length > 10) {
    row = kl.splice(0, 9)
    keyRows.push(row)
  }
  keyRows.push(kl)

  return (
    <View style={styles.keyboard}>
      {keyRows.map((kr, idx) => (
        <KeyboardRow key={idx} rowLetters={kr} onKeyPress={onKeyPress} />))}
      <View style={styles.keyboardRow}>
        <Pressable onPress={() => onKeyPress("PEEL")}>
          <View style={styles.key}>
            <Text style={styles.keyLetter}>PEEL</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => onKeyPress("⌫")}>
          <View style={styles.key}>
            <Text style={styles.keyLetter}>⌫</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const handlePeel = (keyboardLetters, setKeyBoardLetters, letterPool, setLetterPool) => {
  newLetters = getLetters(3, letterPool, setLetterPool)
  allLetters = keyboardLetters.concat(newLetters)
  setKeyBoardLetters(allLetters)
}

const handleDirectionPress = (autoDirect, setAutoDirect) => {
  if (autoDirect == "→") {
    setAutoDirect("↓")
  } else {
    setAutoDirect("→")
  }
}

const handleBackspacePress = (autoDirect, selectedCell, letterGrid, setLetterGrid, setSelectedCell, keyboardLetters, setKeyBoardLetters) => {
  letter = letterGrid[selectedCell[0]][selectedCell[1]]
  if (letter != undefined && letter != "") {
    keyboardLetters.push(letter)
    setKeyBoardLetters(keyboardLetters)
  }

  // deletes letter in existing space
  newLetterGrid = letterGrid
  newLetterGrid[selectedCell[0]][selectedCell[1]] = ""
  setLetterGrid({ ...letterGrid, newLetterGrid })
  
  cellNum = selectedCell
  if (autoDirect == "→") {
    if (cellNum[1] > 0) {
      cellNum[1] = cellNum[1] - 1
    }
  } else {
    if (cellNum[0] > 0) {
      cellNum[0] = cellNum[0] - 1
    }
  }
  setSelectedCell(cellNum)
}

const handleLetterPress = (autoDirect, selectedCell, letter, letterGrid, setLetterGrid, setSelectedCell, keyboardLetters, setKeyBoardLetters, idx) => {
  existingLetter = letterGrid[selectedCell[0]][selectedCell[1]]
  // todo this could be refactored/combined with backspace press somehow
  newLetterGrid = letterGrid
  newLetterGrid[selectedCell[0]][selectedCell[1]] = letter
  setLetterGrid({ ...letterGrid, newLetterGrid })
  
  // Change selectedCell location
  cellNum = selectedCell
  if (autoDirect == "→") {
    if (cellNum[1] < 39) {
      cellNum[1] = selectedCell[1] + 1
    }
  } else {
    if (cellNum[0] < 39) {
      cellNum[0] = selectedCell[0] + 1
    }
  }
  

  // remove letter from keyboard row
  // todo passing idx is a messy way of removing letters from keyboardRow, probably need to clean that up
  keyboardLetters.splice(idx, 1)
  if (existingLetter) { keyboardLetters.push(existingLetter)}
  setKeyBoardLetters(keyboardLetters)
  setSelectedCell(cellNum)
}

export default function App() {
  const [selectedCell, setSelectedCell] = React.useState([20, 20])
  const [letterGrid, setLetterGrid] = React.useState(() => initLetterGrid())
  const [autoDirect, setAutoDirect] = React.useState("→")
  const [letterPool, setLetterPool] = React.useState(() => initLetterPool())
  const [keyboardLetters, setKeyBoardLetters] = React.useState(() => getLetters(9, letterPool, setLetterPool))
  const scrollViewRef = useRef(null);
  scrollViewRef.current?.scrollTo({
    y: selectedCell[0] * 35 - 70,
    x: selectedCell[1] * 35 - 70,
    animated: false,
  });

  useEffect(() => {
    // Scroll to the middle of the content
    scrollViewRef.current?.scrollTo({
      y: selectedCell[0] * 35 - 70,
      x: selectedCell[1] * 35 - 70,
      animated: false,
    });
  }, []);

  const handleKeyPress = (letter, idx) => {
    // TODO remove this autoDirect into separate method
    if (letter == "→" || letter =="↓") {
      handleDirectionPress(autoDirect, setAutoDirect)
      return
    }
    else if (letter == "⌫") {
      handleBackspacePress(autoDirect, selectedCell, letterGrid, setLetterGrid, setSelectedCell, keyboardLetters, setKeyBoardLetters)
      //return
    } else if (letter == "PEEL") {
      handlePeel(keyboardLetters, setKeyBoardLetters, letterPool, setLetterPool)
    }
    else {
      handleLetterPress(autoDirect, selectedCell, letter, letterGrid, setLetterGrid, setSelectedCell, keyboardLetters, setKeyBoardLetters, idx)
    }
  }

  const handleCellClick = (row, col, setSelectedCell) => {
    cellNum = [row, col]
    setSelectedCell(cellNum)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.notes}>Bananagrams!!</Text>
      <ScrollView ref={scrollViewRef} contentContainerStyle={{ width: '175%' }} style={styles.scrollView}>
        {getRows(letterGrid, selectedCell, handleCellClick, setSelectedCell)}
      </ScrollView>
      <Text style={styles.notes}>Letters left: {letterPool.length}</Text>
      <DirectionRow autoDirect={autoDirect} onKeyPress={handleKeyPress} />
      <Keyboard letters={keyboardLetters} onKeyPress={handleKeyPress} autoDirect={autoDirect}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  guessRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  guessSquare: {
    borderColor: "#d3d6da",
    borderWidth: 2,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
  },
  scrollView: {
    overflowX: "auto",
    alignSelf: "center",
    marginLeft: 0,
    marginTop: 30,
    marginBottom: 100,
  },
  selectedSquare: {
    borderColor: "#78aef5",
    borderWidth: 2,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
  },
  guessLetter: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#878a8c",
  },
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  notes: {
    marginTop: 20,
    textAlign: "center",
  },
  directionText: {
    top: '20%',
  },
  // keyboard
  keyboard: { flexDirection: "column" },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
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