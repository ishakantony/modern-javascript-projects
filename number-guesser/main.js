let min = 1,
  max = 10,
  winningNum = 2,
  guessesLeft = 3

const game = document.querySelector('#game'),
  minNum = document.querySelector('#min-num'),
  maxNum = document.querySelector('#max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('#message')

function init() {
  minNum.textContent = min
  maxNum.textContent = max
  winningNum = getRandomNumber(min, max)
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function guess(e) {
  e.preventDefault()

  let guessNumber = parseInt(guessInput.value)

  if (isNaN(guessNumber) || guessNumber < min || guessNumber > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    return
  }

  if (guessNumber === winningNum) {
    sendEvent(true, true, guessNumber)
  } else {
    guessesLeft -= 1

    if (guessesLeft === 0) {
      sendEvent(true, false, guessNumber)
    } else {
      sendEvent(false, false, guessNumber)
    }
  }
}

function sendEvent(isOver, isWon, guessNumber) {
  const color = isWon ? 'green' : 'red'
  let message = `${guessNumber} is not correct, ${guessesLeft} guesses left.`

  if (isOver) {
    guessBtn.value = 'Play Again'
    guessBtn.classList.add('play-again')

    if (isWon) {
      message = `${winningNum} is correct. You win!`
    } else {
      message = `Game over, you lost. The correct number was ${winningNum}`
    }
  }

  guessInput.disabled = isOver ? true : false
  guessInput.style.borderColor = color
  guessInput.style.color = color
  setMessage(message, color)
}

function setMessage(msg, color) {
  message.style.color = color
  message.textContent = msg
}

function playAgain(e) {
  if (e.target.className === 'play-again') {
    window.location.reload()
  }
}

document.addEventListener('DOMContentLoaded', init)
guessBtn.addEventListener('click', guess)
game.addEventListener('mousedown', playAgain)
