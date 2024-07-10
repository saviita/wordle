// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const formElement = document.getElementById('form')
const inputElement = document.getElementById('input')
const gameBoradElement = document.getElementById('gameboard')
const WORDS = ['rojo', 'casa', 'flores', 'botas', 'ojo', 'pez']
const TRIESNUMBER = 5

let secretWord;
let rowCounter;

const generateLetters = (wordLength) => {
    const fragment = document.createDocumentFragment()
    console.log(wordLength)
    for (let i = 0; i < TRIESNUMBER; i++) {
        const newRow = document.createElement('div')
        newRow.classList.add('game__row')

        for (let j = 0; j < wordLength; j++) {
            const newLetter = document.createElement('span')
            newLetter.classList.add('game__letter')

            newRow.append(newLetter)
        }

        fragment.append(newRow)
    }

    gameBoradElement.append(fragment)
}
const row = document.getElementsByClassName('game__row')
console.log(row)

const randomPosition = () => {
    const randomNumber = Math.floor(Math.random() * WORDS.length)
    secretWord = WORDS[randomNumber]

    generateLetters(secretWord.length)
}
randomPosition()

const checkLetters = () => {

}

const insertWord = (value) => {
    // console.log(row)
    let counter = 0
    for (let i = 0; i < secretWord.length; i++) {
        row[counter].textContent = value.charAt(i)
    }
}

const getWord = event => {
    event.preventDefault();
    
    const inputValue = inputElement.value
    insertWord(inputValue)
}
formElement.addEventListener('submit', getWord)