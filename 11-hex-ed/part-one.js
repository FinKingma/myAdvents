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
  }

  var steps = calculateSteps(pos)

  
  console.log('steps: ' + steps)
  

  //console.log(score)
});

function calculateSteps(pos) {
  if (pos.y === 0 && pos.x === 0) return 0

  var steps = 0
  do {
      steps++
      if (pos.y > 0 && pos.x > 0) {
        pos.y--
        pos.x--
      } else if (pos.y > 0 && pos.x < 0) {
        pos.y--
        pos.x++
      } else if (pos.y < 0 && pos.x > 0) {
        pos.y++
        pos.x--
      } else if (pos.y < 0 && pos.x < 0) {
        pos.y++
        pos.x++
      } else if (pos.y === 0) {
        if (pos.x > 0) {
          pos.x -= 1
          pos.y += 1
        } else if (pos.x < 0) {
          pos.x += 1
          pos.y += 1
        }
      } else if (pos.x === 0 ) {
        if (pos.y > 0) {
          pos.y -= 2
        } else if (pos.y < 0) {
          pos.y += 2
        }
      }
  }
  while (!(pos.y === 0 && pos.x === 0))

  return steps
}

