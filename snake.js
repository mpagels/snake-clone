console.clear()

const canvas = document.querySelector('#canvas')
canvas.height = 600
canvas.width = 600
const ctx = canvas.getContext('2d')

let moveX = 5
let moveY = 0

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
  {
    x: 10,
    y: 20,
    sizeX: 5,
    sizeY: 5,
    currentMove: 'ArrowRight',
    nextMove: 'ArrowRight',
  },
]

let moveCommand = 'ArrowRight'

let prey = getPrey()

main()

function main() {
  ctx.clearRect(0, 0, 600, 600)
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
    } else {
      let move = getMoves(snakePart.currentMove)
      snakePart.x += move.moveX
      snakePart.y += move.moveY
      snakePart.currentMove = snakePart.nextMove
      snakePart.nextMove = snake[i - 1].currentMove
    }
    ctx.fillRect(snakePart.x, snakePart.y, snakePart.sizeX, snakePart.sizeY)
  })
  requestAnimationFrame(main)
}

function getMoves(moveCommand) {
  const move = {
    ArrowDown: function () {
      return {
        moveY: 5,
        moveX: 0,
      }
    },
    ArrowUp: function () {
      return {
        moveY: -5,
        moveX: 0,
      }
    },
    ArrowRight: function () {
      return {
        moveY: 0,
        moveX: 5,
      }
    },
    ArrowLeft: function () {
      return {
        moveY: 0,
        moveX: -5,
      }
    },
  }
  const erg = move[moveCommand]
  return erg()
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
  snake.forEach((snake) => console.log(snake))
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
  console.log('lastbodypart:', lastBodyPart)
  console.log('new:', snake[snake.length - 1])
}

function getNewBody(moveCommand) {
  const move = {
    ArrowDown: function () {
      return {
        moveY: -5,
        moveX: 0,
      }
    },
    ArrowUp: function () {
      return {
        moveY: 5,
        moveX: 0,
      }
    },
    ArrowRight: function () {
      return {
        moveY: 0,
        moveX: -5,
      }
    },
    ArrowLeft: function () {
      return {
        moveY: 0,
        moveX: 5,
      }
    },
  }
  const erg = move[moveCommand]
  return erg()
}
