fs = require('fs')
score = 0;

fs.readFile('./input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var spots = data.split('\n')
  for(var i=0; i<spots.length;i++) spots[i] = +spots[i];

  var pos = 0
  var endReached = false

  do {
    var nextPos = pos + spots[pos]
    spots[pos]++
    score++

    pos = nextPos

    if (nextPos < 0 || nextPos >= spots.length) endReached = true
    console.log(spots)
  }
  while (!endReached)
  
  
  console.log('steps: ' + score)
});