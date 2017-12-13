fs = require('fs')
score = 0;

fs.readFile('./input', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  pos = {
    x:0,
    y:0
  }

  steps = data.split(',')
  var stepHistory = []

  for (var step of steps) {
    switch (step) {
      case 'n':
        pos.x += 0
        pos.y += -2
        break
      case 'ne':
        pos.x += 1
        pos.y += -1
        break
      case 'nw':
        pos.x += -1
        pos.y += -1
        break
      case 's' :
        pos.x += 0
        pos.y += 2
        break
      case 'se' :
        pos.x += 1
        pos.y += 1
        break
      case 'sw' :
        pos.x += -1
        pos.y += 1
        break
    }
    stepHistory.push(calculateSteps(pos))
  }

  var steps = calculateSteps(pos)

  console.log('max Steps: ' + Math.max(...stepHistory))
  console.log('steps: ' + steps)
  

  //console.log(score)
});

function calculateSteps(pos) {
  if (pos.y === 0 && pos.x === 0) return 0

  var backWalker = {
    x: pos.x,
    y: pos.y
  }

  var steps = 0
  do {
      steps++
      if (backWalker.y > 0 && backWalker.x > 0) {
        backWalker.y--
        backWalker.x--
      } else if (backWalker.y > 0 && backWalker.x < 0) {
        backWalker.y--
        backWalker.x++
      } else if (backWalker.y < 0 && backWalker.x > 0) {
        backWalker.y++
        backWalker.x--
      } else if (backWalker.y < 0 && backWalker.x < 0) {
        backWalker.y++
        backWalker.x++
      } else if (backWalker.y === 0) {
        if (backWalker.x > 0) {
          backWalker.x -= 1
          backWalker.y += 1
        } else if (backWalker.x < 0) {
          backWalker.x += 1
          backWalker.y += 1
        }
      } else if (backWalker.x === 0 ) {
        if (backWalker.y > 0) {
          backWalker.y -= 2
        } else if (backWalker.y < 0) {
          backWalker.y += 2
        }
      }
  }
  while (!(backWalker.y === 0 && backWalker.x === 0))

  return steps
}

