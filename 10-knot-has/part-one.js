fs = require('fs')
score = 0;

fs.readFile('./input', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var circularList = []
  var listNr = 256

  for (var i=0;i<listNr; i++) circularList.push(i)

  var input = data.split(',')

  var pos = 0
  var skipSize = 0

  for (var j=0;j<input.length;j++) {
    input[j] = parseInt(input[j].replace(/\s/g, ''))
    reverseOrder(circularList, pos, input[j])
    pos += input[j] + skipSize
    skipSize++
  }
  console.log('result: ' + circularList)

  console.log('skip: ' + skipSize)

  //console.log(score)
});

function reverseOrder(circularList, pos, length) {
  var newList = Array.from(circularList)
  for (var l=0;l<length;l++) {
    var newVarPos = (pos + l) % newList.length
    var replaceVarPos = ((pos+length-1)-l) % newList.length
    newList[newVarPos] = circularList[replaceVarPos]
  }
  for (var k=0;k<newList.length;k++) circularList[k] = newList[k]
}

