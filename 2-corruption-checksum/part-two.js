fs = require('fs')
score = 0;

fs.readFile('./input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  
  var rows = data.split('\n')
  
  for (var row of rows) {
    var data = row.split('\t')
    for (var int of data) {
      for (var i =0;i<data.length;i++) {
        var response = (int / data[i])
        if (response % 1 === 0 && response > 1) {
          score += response
        }
      }
    }
  }
  
  console.log(score)
});