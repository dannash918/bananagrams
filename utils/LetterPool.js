export const initLetterPool = () => {
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

    const lettersJson = [
        { id: 0,  letter: "J", pos: [100, 100] },
        { id: 1,  letter: "K", pos: [100, 100] },
        { id: 2,  letter: "Q", pos: [100, 100] },
        { id: 3,  letter: "X", pos: [100, 100] },
        { id: 4,  letter: "Z", pos: [100, 100] },
        { id: 5,  letter: "B", pos: [100, 100] },
        { id: 6,  letter: "B", pos: [100, 100] },
        { id: 7,  letter: "C", pos: [100, 100] },
        { id: 8,  letter: "C", pos: [100, 100] },
        { id: 9,  letter: "F", pos: [100, 100] },
        { id: 10, letter: "F", pos: [100, 100] },
        { id: 11, letter: "F", pos: [100, 100] },
        { id: 12, letter: "H", pos: [100, 100] },
        { id: 13, letter: "H", pos: [100, 100] },
        { id: 14, letter: "M", pos: [100, 100] },
        { id: 15, letter: "M", pos: [100, 100] },
        { id: 16, letter: "P", pos: [100, 100] },
        { id: 17, letter: "P", pos: [100, 100] },
        { id: 18, letter: "V", pos: [100, 100] },
        { id: 19, letter: "V", pos: [100, 100] },
        { id: 20, letter: "W", pos: [100, 100] },
        { id: 21, letter: "W", pos: [100, 100] },
        { id: 22, letter: "Y", pos: [100, 100] },
        { id: 23, letter: "Y", pos: [100, 100] },
        { id: 24, letter: "G", pos: [100, 100] },
        { id: 25, letter: "G", pos: [100, 100] },
        { id: 26, letter: "L", pos: [100, 100] }, 
        { id: 27, letter: "L", pos: [100, 100] },
        { id: 28, letter: "L", pos: [100, 100] },
        { id: 29, letter: "D", pos: [100, 100] },
        { id: 30, letter: "D", pos: [100, 100] },
        { id: 31, letter: "D", pos: [100, 100] },
        { id: 32, letter: "S", pos: [100, 100] },
        { id: 33, letter: "S", pos: [100, 100] },
        { id: 34, letter: "S", pos: [100, 100] },
        { id: 35, letter: "U", pos: [100, 100] },
        { id: 36, letter: "U", pos: [100, 100] },
        { id: 37, letter: "U", pos: [100, 100] },
        { id: 38, letter: "N", pos: [100, 100] },
        { id: 39, letter: "N", pos: [100, 100] },
        { id: 40, letter: "N", pos: [100, 100] },
        { id: 50, letter: "N", pos: [100, 100] },
        { id: 51, letter: "T", pos: [100, 100] },
        { id: 52, letter: "T", pos: [100, 100] },
        { id: 53, letter: "T", pos: [100, 100] },
        { id: 54, letter: "T", pos: [100, 100] },
        { id: 55, letter: "R", pos: [100, 100] },
        { id: 56, letter: "R", pos: [100, 100] },
        { id: 57, letter: "R", pos: [100, 100] },
        { id: 58, letter: "R", pos: [100, 100] },
        { id: 59, letter: "O", pos: [100, 100] },
        { id: 60, letter: "O", pos: [100, 100] },
        { id: 61, letter: "O", pos: [100, 100] },
        { id: 62, letter: "O", pos: [100, 100] },
        { id: 63, letter: "O", pos: [100, 100] },
        { id: 64, letter: "O", pos: [100, 100] },
        { id: 65, letter: "I", pos: [100, 100] },
        { id: 66, letter: "I", pos: [100, 100] },
        { id: 67, letter: "I", pos: [100, 100] },
        { id: 68, letter: "I", pos: [100, 100] },
        { id: 69, letter: "I", pos: [100, 100] },
        { id: 70, letter: "I", pos: [100, 100] },
        { id: 71, letter: "A", pos: [100, 100] },
        { id: 72, letter: "A", pos: [100, 100] },
        { id: 73, letter: "A", pos: [100, 100] },
        { id: 74, letter: "A", pos: [100, 100] },
        { id: 75, letter: "A", pos: [100, 100] },
        { id: 76, letter: "A", pos: [100, 100] },
        { id: 77, letter: "A", pos: [100, 100] },
        { id: 78, letter: "E", pos: [100, 100] },
        { id: 79, letter: "E", pos: [100, 100] },
        { id: 80, letter: "E", pos: [100, 100] },
        { id: 81, letter: "E", pos: [100, 100] },
        { id: 82, letter: "E", pos: [100, 100] },
        { id: 83, letter: "E", pos: [100, 100] },
        { id: 84, letter: "E", pos: [100, 100] },
        { id: 85, letter: "E", pos: [100, 100] },
        { id: 86, letter: "E", pos: [100, 100] }
    ]

    return lettersJson
}
  
export const getLetters = (numLetters, letterPool, setLetterPool) => {
    const shuffledLetters = letterPool.sort(() => 0.5 - Math.random())
    selectedLetters = shuffledLetters.splice(0, numLetters)
    return selectedLetters
}