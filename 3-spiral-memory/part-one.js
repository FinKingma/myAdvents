fs = require('fs')
score = 0;

fs.readFile('./input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  
  var number = 265149

  var gridSize = Math.ceil(Math.sqrt(number))
  if (gridSize % 2 === 0) gridSize++

  var startNr = Math.pow((gridSize - 2), 2)
  var gridRadius = (gridSize - 1) / 2

  var outerDistance = Math.abs(((number - startNr) % (gridSize-1)) - gridRadius)

  var innerDistance = gridRadius

  score = innerDistance + outerDistance
  
  console.log(gridSize)
  console.log(startNr)
  console.log(score)
});