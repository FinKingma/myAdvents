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
      if (words.filter(item => checkForAnagrams(item,word)).length > 1) fail = true
    }
    if (!fail) {
      score++
    }
  }

  function checkForAnagrams(item, word) {
    console.log('comparing ' + item + ' with ' + word)

    if (item === word) return true
    if (item.length !== word.length) return false

    console.log('doing specific check')

    itemA = item.split('');
    wordA = word.split('');
    
    var lettersFound = 0


    var i = itemA.length + 1;
    while (i--) {
      if (wordA.indexOf(itemA[i]) >= 0)
      wordA.splice(wordA.indexOf(itemA[i]), 1);
    }
    if (wordA == '') {
      return true
    }

    return false

    // for (var i = 0; i< itemA.length; i++) {
    //   if (wordA.indexOf(itemA[i]) !== -1) {
    //     console.log('character ' + itemA[i] + ' found')
    //     lettersFound++
    //   }
    // }
    // console.log('letters found ' + lettersFound)
    // return lettersFound >= itemA.length
  }

  console.log(score)

});