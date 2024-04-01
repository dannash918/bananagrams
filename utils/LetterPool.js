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

    return letters
}
  
export const getLetters = (numLetters, letterPool, setLetterPool) => {
    const shuffledLetters = letterPool.sort(() => 0.5 - Math.random())
    selectedLetters = shuffledLetters.splice(0, numLetters)
    return selectedLetters
}