import { drawBorder, getMoves, getNewBody } from './util'

console.clear()

const canvas = document.querySelector('#canvas')
canvas.height = 600
canvas.width = 600
const ctx = canvas.getContext('2d')

const snake = [
  {
    x: 20,
    y: 20,
    sizeX: 5,
    sizeY: 5,
    currentMove: 'ArrowRight',
  },
  {
    x: 15,
    y: 20,
    sizeX: 5,
    sizeY: 5,
    currentMove: 'ArrowRight',
    nextMove: 'ArrowRight',
  },
]

let moveCommand = 'ArrowRight'
let prey = getPrey()
let gameOver = false
main()

function main() {
  ctx.clearRect(0, 0, 600, 600)
  drawBorder().forEach((border) => {
    ctx.fillRect(border.x, border.y, border.sizeX, border.sizeY)
  })
  ctx.fillRect(prey.x, prey.y, prey.sizeX, prey.sizeY)
  //ctx.fillRect(snakeHead.x, snakeHead.y, snakeHead.sizeX, snakeHead.sizeY)
  snake.forEach((snakePart, i, snake) => {
    if (i === 0) {
      let move = getMoves(moveCommand)
      snakePart.x += move.moveX
      snakePart.y += move.moveY
      snake[i + 1].nextMove = moveCommand

      // prey is eaten logic
      if (
        snakePart.x >= prey.x &&
        snakePart.x <= prey.x + prey.sizeX &&
        snakePart.y >= prey.y &&
        snakePart.y <= prey.y + prey.sizeY
      ) {
        prey = getPrey()
        growSnake()
      }

      // snake hits border logic

      if (
        snakePart.x <= 10 ||
        snakePart.y <= 10 ||
        snakePart.x >= 590 ||
        snakePart.y >= 590
      ) {
        gameOver = true
      }
    } else {
      let move = getMoves(snakePart.currentMove)
      snakePart.x += move.moveX
      snakePart.y += move.moveY
      snakePart.currentMove = snakePart.nextMove
      snakePart.nextMove = snake[i - 1].currentMove
    }
    ctx.fillRect(snakePart.x, snakePart.y, snakePart.sizeX, snakePart.sizeY)
  })
  if (gameOver) {
    ctx.font = '30px Helvetica'
    ctx.fillText('GAME OVER', 200, 250)
  } else {
    requestAnimationFrame(main)
  }
}

window.addEventListener('keydown', (event) => {
  moveCommand = event.key
})

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function getPrey() {
  return {
    sizeX: 20,
    sizeY: 20,
    x: getRandomNumber(5, 595),
    y: getRandomNumber(5, 595),
    isEaten: false,
  }
}

function growSnake() {
  const lastBodyPart = snake[snake.length - 1]
  const push = getNewBody(lastBodyPart.currentMove)
  snake.push({
    x: lastBodyPart.x,
    y: lastBodyPart.y,
    sizeX: 5,
    sizeY: 5,
    currentMove: lastBodyPart.currentMove,
    nextMove: lastBodyPart.nextMove,
  })
}
