fs = require('fs')
score = 0;

fs.readFile('./input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  
  var rows = data.split('\n')
  
  for (var row of rows) {
    var data = row.split(' ')
    var max = Math.max(...data)
    var min = Math.min(...data)
    score += max - min
  }
  
  console.log(score)
});