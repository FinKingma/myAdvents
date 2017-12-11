fs = require('fs')
score = 0;

fs.readFile('./input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  
  var endNumber = 265149
  var finalized = false

  var number = 0
  gridHistory = []
  var x = 0
  var y = 0

  do {
    number++
    value = 0

    if (number === 1) {
      gridHistory.push({
        number: number,
        value: 1,
        x: x,
        y: y
      })
    } else {
      var grid = {
        number,
        value,
        x,
        y
      }

      // get req parameters
      var gridSize = Math.ceil(Math.sqrt(number))
      if (gridSize % 2 === 0) gridSize++
      
      var gridRadius = (gridSize - 1) / 2

      var lastSquareNumber = Math.pow((gridSize - 2), 2)

      var northEastPos = lastSquareNumber+(gridRadius*2)
      var northWestPos = lastSquareNumber+(gridRadius*4)
      var southWestPos = lastSquareNumber+(gridRadius*6)
      var southEastPos = lastSquareNumber+(gridRadius*8)

      if (number === lastSquareNumber + 1) x++
      else if (number > lastSquareNumber && number <= northEastPos) {
        y--
      } else if (number > northEastPos && number <= northWestPos) {
        x--
      } else if (number > northWestPos && number <= southWestPos) {
        y++
      } else if (number > southWestPos && number <= southEastPos) {
        x++
      }

      value += getAdjacentValues(x,y)

      gridHistory.push({
        number: number,
        value: value,
        x: x,
        y: y
      })
    }

    if (value >= endNumber) finalized = true
  }
  while (!finalized)

  function getAdjacentValues(x,y) {
    var score = 0

    for (var offsetX=-1;offsetX<=1;offsetX++) {
      for (var offsetY=-1;offsetY<=1;offsetY++) {
        if (gridHistory.find((o) => o.x === x+offsetX && o.y === y+offsetY)) {
          score += gridHistory.find((o) => o.x === x+offsetX && o.y === y+offsetY).value
        }
      }
    }

    return score
  }


  console.log(gridHistory)

  // var gridSize = Math.ceil(Math.sqrt(number))
  // if (gridSize % 2 === 0) gridSize++

  // var startNr = Math.pow((gridSize - 2), 2)
  // var gridRadius = (gridSize - 1) / 2

  // var outerDistance = Math.abs(((number - startNr) % (gridSize-1)) - gridRadius)

  // var innerDistance = gridRadius

  // score = innerDistance + outerDistance
  
  
});