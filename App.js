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

const initLetterPool = () => {
  const letters = [
    "J","J","K","K","Q","Q","X","X","Z","Z","B","B","B","C","C","C","F","F","F","H","H","H",
    "M","M","M","P","P","P","V","V","V","W","W","W","Y","Y","Y","G","G","G","G","L","L","L",
    "L","L","D","D","D","D","D","D","S","S","S","S","S","S","U","U","U","U","U","U","N","N",
    "N","N","N","N","N","N","T","T","T","T","T","T","T","T","T","R","R","R","R","R","R","R",
    "R","R","O","O","O","O","O","O","O","O","O","O","O","I","I","I","I","I","I","I","I","I",
    "I","I","I","A","A","A","A","A","A","A","A","A","A","A","A","A","E","E","E","E","E","E",
    "E","E","E","E","E","E","E","E","E","E","E","E"
  ]
  return letters
}

const initLetterGrid = () => {
  const letterGrid = {0:{}, 1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}, 9:{}}
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
  for (let colNum = 0; colNum < 10; colNum++) {
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
  for (let i = 0; i < 10; i++) {
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
    {letters.map((letter, idx) => (
      <Pressable key={idx} onPress={() => onKeyPress(letter, idx)}>
        <View style={styles.key}>
          <Text style={styles.keyLetter}>{letter}</Text>
        </View>
      </Pressable>
    ))}
  </View>
)

const getLetters = (numLetters, letterPool, setLetterPool) => {
  console.log(`"LetterPool length: ${letterPool.length}"`)
  const shuffledLetters = letterPool.sort(() => 0.5 - Math.random())
  selectedLetters = shuffledLetters.splice(0, numLetters)
  //setLetterPool(shuffledLetters)
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

const handlePeel = (keyboardLetters, setKeyBoardLetters, letterPool, setLetterPool) => {
  if (keyboardLetters.length == 0) {
    newLetters = getLetters(3, letterPool, setLetterPool)
    setKeyBoardLetters(newLetters)
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

const handleLetterPress = (autoDirect, selectedCell, letter, letterGrid, setLetterGrid, setSelectedCell, keyboardLetters, setKeyBoardLetters, idx) => {
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

  // remove letter from keyboard row
  // todo passing idx is a messy way of removing letters from keyboardRow, probably need to clean that up
  keyboardLetters.splice(idx, 1)
  setKeyBoardLetters(keyboardLetters)
}

export default function App() {
  const [selectedCell, setSelectedCell] = React.useState([])
  const [letterGrid, setLetterGrid] = React.useState(() => initLetterGrid())
  const [autoDirect, setAutoDirect] = React.useState("→")
  const [letterPool, setLetterPool] = React.useState(() => initLetterPool())
  const [keyboardLetters, setKeyBoardLetters] = React.useState(() => getLetters(9, letterPool, setLetterPool))

  const handleKeyPress = (letter, idx) => {
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
      <View>
        {getRows(letterGrid, selectedCell, handleCellClick, setSelectedCell)}
      </View>
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
    marginTop: 20,
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