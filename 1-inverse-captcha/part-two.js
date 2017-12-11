fs = require('fs')
score = 0;

fs.readFile('./input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  for (var i=0;i<data.length;i++) {
    if (data.length % 2 === 1) throw new Error('expected data length to always be dividable by 2')
    var comparable = i-(data.length/2)
    if (comparable < 0) comparable += data.length


    console.log('comparing pos ' + i + ' with pos ' + comparable)
    
    if (data[i] === data[comparable]) {
      score+= parseInt(data[i])
    }
    
  }
  console.log(score)
});