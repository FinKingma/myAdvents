fs = require('fs')
score = 0;

fs.readFile('./input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var phrases = data.split('\n')

  for (var phrase of phrases) {
    var phraseHistory
    var words = phrase.split(' ')
    var fail = false
    for (var word of words) {
      if (words.filter(item => item == word).length > 1) fail = true
    }
    if (!fail) {
      score++
    }
  }

  console.log(score)

});