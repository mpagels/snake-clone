export function getMoves(moveCommand) {
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

export function getNewBody(moveCommand) {
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

export function drawBorder() {
  const border = [
    {
      // top-border
      x: 0,
      y: 0,
      sizeX: 600,
      sizeY: 10,
    },
    {
      // right-border
      x: 590,
      y: 0,
      sizeX: 10,
      sizeY: 600,
    },
    {
      // bottom-border
      x: 0,
      y: 590,
      sizeX: 600,
      sizeY: 10,
    },
    {
      // left-border
      x: 0,
      y: 0,
      sizeX: 10,
      sizeY: 600,
    },
  ]
  return border
}
