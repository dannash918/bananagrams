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

const GuessRow = ({ guess }) => {
  const letters = guess.split("")

  return (
    <View style={styles.guessRow}>
      <Block letter={letters[0]} />
      <Block letter={letters[1]} />
      <Block letter={letters[2]} />
      <Block letter={letters[3]} />
      <Block letter={letters[4]} />
    </View>
  )
}

const getRows = (guesses, handleRowPress) => {
  let rows = [];
  for (let i = 0; i < 6; i++) {
    const guess = guesses[i];
    rows.push(
      <Pressable key={i} onPress={() => handleRowPress(i)}>
        <GuessRow key={i} guess={guess}/>
      </Pressable> 
    );
  }
  return rows;
};

const defaultGuess = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
}

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

const handleEnter = (guess, rowIndex, activeWord) => {
  if (guess.length !== 5) {
    alert("Word too short.")
    return
  }

  if (!isValidWord(guess)) {
    alert("Not a valid word.")
    return
  }

  if (rowIndex < 5) {
    setRowIndex(rowIndex + 1)
  } else {
    alert("You lose!")
  }
}

export default function App() {
  const [rowIndex, setRowIndex] = React.useState(0)
  const [guesses, setGuesses] = React.useState(defaultGuess)

  const handleKeyPress = (letter) => {
    const guess = guesses[rowIndex]
    if (letter === "ENTER") {
      handleEnter(guess, activeWord)
    }
    
    if (letter === "⌫") {
      setGuesses({ ...guesses, [rowIndex]: guess.slice(0, -1) })
      return
    }

    // don't add if guess is full
    if (guess.length >= 5) {
      return
    }
    setGuesses({ ...guesses, [rowIndex]: guess + letter })
  }

  const handleRowPress = (rowNum) => {
    console.log("Row " + rowNum + " pressed!")
    setRowIndex(rowNum)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {getRows(guesses, handleRowPress)}
      </View>
      <Text style={styles.notes}>Selected Row: {rowIndex}</Text>
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