console.clear()

const canvas = document.querySelector('#canvas')
canvas.height = 600
canvas.width = 600
const ctx = canvas.getContext('2d')

let moveX = 5
let moveY = 0

const snakeHead = {
  x: 20,
  y: 20,
  sizeX: 5,
  sizeY: 5,
}

const snakeBody = [
  {
    x: 15,
    y: 20,
    sizeX: 5,
    sizeY: 5,
  },
  {
    x: 10,
    y: 20,
    sizeX: 5,
    sizeY: 5,
  },
]

let moveCommand = 'ArrowRight'
let lastMoveCommand = 'ArrowRight'
let currentMoveList = ['ArrowRight']
let nextMoveList = []

main()

function main() {
  ctx.clearRect(0, 0, 600, 600)
  let move = getMoves(moveCommand)
  snakeHead.x += move.moveX
  snakeHead.y += move.moveY
  currentMoveList.push(moveCommand)

  ctx.fillRect(snakeHead.x, snakeHead.y, snakeHead.sizeX, snakeHead.sizeY)
  snakeBody.forEach((snakePart, i) => {
    const move = getMoves(currentMoveList[i + 1])
    snakePart.x += move.moveX
    snakePart.y += move.moveY
    currentMoveList.push(currentMoveList[i + 1])

    ctx.fillRect(snakePart.x, snakePart.y, snakePart.sizeX, snakePart.sizeY)
  })
  currentMoveList = [moveCommand]
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
