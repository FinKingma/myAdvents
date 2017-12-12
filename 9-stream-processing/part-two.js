fs = require('fs')
score = 0;

garbageCharacters = 0

fs.readFile('./input', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  data = removeIgnoredCharacters(data, "!")
  
  data = removeGarbage(data, "<", ">")

  level = 0

  for (var i=0;i<data.length;i++) {
    if (data[i] === '{') {
      level++
    } else if (data[i] === '}') {
      score += level
      level--
    }
  }

  console.log(data)

  console.log(garbageCharacters)
});


function removeIgnoredCharacters(data, ignoreSymbol) {
  if (data.indexOf("!") === -1) return data
  do {
    var i = data.indexOf("!")
    console.log('removing ' + data.slice(i,i+2))
    data = data.slice(0, i) + data.slice(i+2)
  }
  while (data.indexOf("!") !== -1)
  return data
}

function removeGarbage(data, start, end) {
  if (data.indexOf("<") === -1) return data
  do {
    var startIndex = data.indexOf("<")
    var endIndex = data.indexOf(">")
    garbageCharacters += (endIndex - startIndex) - 1
    console.log('removing garbage ' + data.slice(startIndex,endIndex+1))
    data = data.slice(0, startIndex) + data.slice(endIndex+1)
  }
  while (data.indexOf("<") !== -1)

  return data

}