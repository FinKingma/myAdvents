fs = require('fs')
score = 0;

fs.readFile('./input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var spots = data.split('\n')
  for(var i=0; i<spots.length;i++) spots[i] = +spots[i];

  var pos = 0

  do {
    var move = spots[pos]
    if (spots[pos] >= 3) spots[pos] -= 1
    else spots[pos] += 1
    
    score++

    pos += move
  }
  while (pos >= 0 && pos < spots.length)
  
  console.log('steps: ' + score)
});