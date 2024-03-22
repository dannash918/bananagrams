import React from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Pressable,
} from "react-native"

const isValidWord = (word) => {
  // Todo hit a word validation api/library
  return true
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
  for (let colNum = 0; colNum < 5; colNum++) {
    isSelected = false
    if (selectedCell[0] == rowNum && selectedCell[1] == colNum) {
      console.log (`"Col: ${colNum}, Row: ${rowNum} is selected"`)
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
  for (let i = 0; i < 6; i++) {
    rows.push(
      <Row key={i} letterGrid={letterGrid} rowNum = {i} selectedCell = {selectedCell} handleCellClick={handleCellClick} setSelectedCell={setSelectedCell} />
    );
  }
  return rows;
};


const KeyboardRow = ({
  letters,
  onKeyPress,
}) => (
  <View style={styles.keyboardRow}>
    {letters.map(letter => (
      <Pressable key = {letter} onPress={() => onKeyPress(letter)}>
        <View style={styles.key}>
          <Text style={styles.keyLetter}>{letter}</Text>
        </View>
      </Pressable>
    ))}
  </View>
)

const getLetters = (numLetters) => {
  const letters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"]
  const shuffledLetters = letters.sort(() => 0.5 - Math.random())
  selectedLetters = shuffledLetters.splice(0, numLetters)
  return selectedLetters
}

const Keyboard = ({ letters, onKeyPress, autoDirect }) => {
  return (
    <View style={styles.keyboard}>
      <View style={styles.keyboardRow}>
        <Text style={styles.directionText}>Direction: </Text>
        <Pressable onPress={() => onKeyPress(autoDirect)}>
          <View style={styles.key}>
            <Text style={styles.keyLetter}> {autoDirect} </Text>
          </View>
        </Pressable>
      </View>
      <KeyboardRow letters={letters} onKeyPress={onKeyPress} />
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

const handlePeel = (guess, rowIndex) => {
  // TODO make this work or remove?
  if (guess.length !== 5) {
    alert("Word too short.")
    return
  }

  if (!isValidWord(guess)) {
    alert("Not a valid word.")
    return
  }
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

const handleLetterPress = (autoDirect, selectedCell, letter, letterGrid, setLetterGrid, setSelectedCell, keyboardLetters, setKeyBoardLetters) => {
  // todo this could be refactored/combined with backspace press somehow
  newLetterGrid = letterGrid
  newLetterGrid[selectedCell[0]][selectedCell[1]] = letter
  setLetterGrid({ ...letterGrid, newLetterGrid })
  
  // Change selectedCell location
  cellNum = selectedCell
  if (autoDirect == "→") {
    if (cellNum[1] < 4) {
      cellNum[1] = selectedCell[1] + 1
    }
  } else {
    if (cellNum[0] < 5) {
      cellNum[0] = selectedCell[0] + 1
    }
  }
  setSelectedCell(cellNum)
  newKeyboardLetters = keyboardLetters.filter(kl => kl !== letter)
  setKeyBoardLetters(newKeyboardLetters)
}

export default function App() {
  const [selectedCell, setSelectedCell] = React.useState([])
  const [letterGrid, setLetterGrid] = React.useState({0:{}, 1:{}, 2:{}, 3:{}, 4:{}, 5:{}})
  const [autoDirect, setAutoDirect] = React.useState("→")
  const [keyboardLetters, setKeyBoardLetters] = React.useState(getLetters(9))

  const handleKeyPress = (letter) => {
    if (letter == "→" || letter =="↓") {
      handleDirectionPress(autoDirect, setAutoDirect)
      return
    }
    else if (letter == "⌫") {
      handleBackspacePress(autoDirect, selectedCell, letterGrid, setLetterGrid, setSelectedCell, keyboardLetters, setKeyBoardLetters)
      //return
    } else if (letter == "PEEL") {
      if (keyboardLetters.length == 0) {
        newLetters = getLetters(3)
        setKeyBoardLetters(newLetters)
      }
    }
    else {
      handleLetterPress(autoDirect, selectedCell, letter, letterGrid, setLetterGrid, setSelectedCell, keyboardLetters, setKeyBoardLetters)
    }
    
    
  }

  const handleCellClick = (row, col, setSelectedCell) => {
    cellNum = [row, col]
    console.log(`"Row is: ${cellNum[1]} & Col is: ${cellNum[1]}"`)
    setSelectedCell(cellNum)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.notes}>Bananagrams!!</Text>
      <View>
        {getRows(letterGrid, selectedCell, handleCellClick, setSelectedCell)}
      </View>
      <Text style={styles.notes}>(Row is: {selectedCell[0]} & Col is: {selectedCell[1]})</Text>
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
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  selectedSquare: {
    borderColor: "#78aef5",
    borderWidth: 2,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
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
    textAlign: "center",
  },
  directionText: {
    // position: 'absolute', 
    top: '20%',
    // transform: 'translate(-50%, -50%)'
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