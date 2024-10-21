// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const formElement = document.getElementById('form');
const inputElement = document.getElementById('input');
const gameBoradElement = document.getElementById('gameboard');
const errorElement = document.getElementById('error');
const rootStyles = document.documentElement.style;
const WORDS = ['rojo', 'casa', 'flores', 'botas', 'ojo', 'pez'];
const TRIESNUMBER = 5;

let secretWord;
let currentRow = 0;
let correctWord = false;

const generateLetters = wordLength => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < TRIESNUMBER; i++) {
    const newRow = document.createElement('div');
    newRow.classList.add('game__row');

    for (let j = 0; j < wordLength; j++) {
      const newLetter = document.createElement('span');
      newLetter.classList.add('game__letter');

      newRow.append(newLetter);
    }

    fragment.append(newRow);
  }

  gameBoradElement.append(fragment);
};

const randomPosition = () => {
  const randomNumber = Math.floor(Math.random() * WORDS.length);
  secretWord = WORDS[randomNumber];
  console.log(secretWord);

  generateLetters(secretWord.length);
};
randomPosition();

const paintLetter = (letter, position, className) => {
  const letterBox = gameBoradElement.children[currentRow].children[position];
  letterBox.textContent = letter;

  if (!letterBox.classList.contains(className)) {
    letterBox.classList.add(className);
  }
};

const checkRow = userWord => {
  let className;
  let wordToCheck;
  // if (correctWord) {
  //     console.log('Palabra correcta')
  //     return
  // }

  for (let i = 0; i < userWord.length; i++) {
    let letter = userWord[i];
    wordToCheck = secretWord;

    if (secretWord[i] === letter) {
      className = 'green';
      wordToCheck = wordToCheck.replace(letter, '-');
      paintLetter(letter, i, className);
    }
  }
  checkWinner(userWord);

  if (correctWord) {
    console.log(secretWord, correctWord);
    inputElement.remove();
    formElement.textContent = '¡Has acertado!';
    return;
  }

  for (let i = 0; i < userWord.length; i++) {
    const letter = userWord[i];

    if (wordToCheck.includes(letter)) {
      className = 'orange';
      wordToCheck = wordToCheck.replace(letter, '-');
      paintLetter(letter, i, className);
    } else if (!wordToCheck.includes(letter) && letter !== '-') {
      className = 'gray';
      paintLetter(letter, i, className);
    }
  }

  inputElement.value = '';
  //   secretWord === userWord ? (correctWord = true) : (correctWord = false);
  currentRow++;
};

const checkWinner = userWord => {
  correctWord = secretWord === userWord;
};

const getWord = event => {
  event.preventDefault();
  const userWord = inputElement.value;

  if (userWord.length !== secretWord.length) {
    errorElement.textContent = `La palabra tiene que tener ${secretWord.length} letras`;
    return;
  }
  errorElement.textContent = '';

  checkRow(userWord);
  event.target.reset();
};
formElement.addEventListener('submit', getWord);
