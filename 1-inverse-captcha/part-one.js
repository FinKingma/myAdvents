fs = require('fs')
score = 0;

fs.readFile('./input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  for (var i=0;i<data.length;i++) {
    var comparable = i-1
    if (comparable < 0) comparable = data.length-1
    
    if (data[i] === data[comparable]) {
      score+= parseInt(data[i])
    }
    
  }
  console.log(score)
});