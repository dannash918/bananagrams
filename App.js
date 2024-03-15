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

const Block = ({letter}) => (
  <View style={styles.guessSquare}>
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

const Row = ({ letterGrid, rowNum, handleCellClick, setSelectedCell }) => {
  cells = []
  for (let colNum = 0; colNum < 5; colNum++) {
    cells.push(
      <Pressable key={colNum} onPress={() => handleCellClick(rowNum, colNum, setSelectedCell)}>
        <Block letter={getCellLetter(rowNum, colNum, letterGrid)} />
      </Pressable>
    )
  }
  return (
    <View style={styles.guessRow}>
      {cells}
    </View>
  )
}

const getRows = (letterGrid, handleCellClick, setSelectedCell) => {
  let rows = [];
  for (let i = 0; i < 6; i++) {
    rows.push(
      <Row key={i} letterGrid={letterGrid} rowNum = {i} handleCellClick={handleCellClick} setSelectedCell={setSelectedCell} />
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

const Keyboard = ({ onKeyPress }) => {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
  const row3 = ["Z", "X", "C", "V", "B", "N", "M", "⌫"]

  return (
    <View style={styles.keyboard}>
      <KeyboardRow letters={row1} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row2} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row3} onKeyPress={onKeyPress} />
      <View style={styles.keyboardRow}>
        <Pressable onPress={() => onKeyPress("ENTER")}>
          <View style={styles.key}>
            <Text style={styles.keyLetter}>ENTER</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const handleEnter = (guess, rowIndex) => {
  if (guess.length !== 5) {
    alert("Word too short.")
    return
  }

  if (!isValidWord(guess)) {
    alert("Not a valid word.")
    return
  }
}

export default function App() {
  const [selectedCell, setSelectedCell] = React.useState([])
  const [letterGrid, setLetterGrid] = React.useState({0:{}, 1:{}, 2:{}, 3:{}, 4:{}, 5:{}})

  const handleKeyPress = (letter) => {
    newLetterGrid = letterGrid
    newLetterGrid[selectedCell[0]][selectedCell[1]] = letter
    setLetterGrid({ ...letterGrid, newLetterGrid })
  }

  const handleCellClick = (row, col, setSelectedCell) => {
    let cellNum = [row, col]
    console.log(`"Row is: ${cellNum[1]} & Col is: ${cellNum[1]}"`)
    setSelectedCell(cellNum)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.notes}>Bananagrams!!</Text>
      <View>
        {getRows(letterGrid, handleCellClick, setSelectedCell)}
      </View>
      <Text style={styles.notes}>(Row is: {selectedCell[0]} & Col is: {selectedCell[1]})</Text>
      <Keyboard onKeyPress={handleKeyPress} />
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