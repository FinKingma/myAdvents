fs = require('fs')
score = 0;

fs.readFile('./input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  blocks = data.split('\t')
  for(var i=0; i<blocks.length;i++) blocks[i] = +blocks[i];
  
  var blocksHistory = []
  blocksHistory[score] = []
  for (var j=0;j<blocks.length;j++) {
    blocksHistory[score][j] = blocks[j]
  }

  similarFound = false
  do {
    var max = Math.max(...blocks)
    var maxIndex = blocks.indexOf(max)
    blocks[maxIndex] = 0

    for (var i=0;i<max;i++) {
      blockIteration = (maxIndex + i + 1) % blocks.length
      blocks[blockIteration]++
    }
    score++
    blocksHistory[score] = []
    for (var j=0;j<blocks.length;j++) {
      blocksHistory[score][j] = blocks[j]
    }
    
    similarFound = checkForSimilars(blocksHistory, blocks)
    console.log(blocks)
  }
  while (!similarFound)

  
  console.log('steps: ' + score)
});

function checkForSimilars(multiArray, array) {
  //return multiArray.find((o) => o === array).length !== 1
  var instancesFound = 0;
  for (var i=0;i<multiArray.length;i++) {
    var similarValues = 0;
    for (var j=0;j<multiArray[i].length;j++) {
      if (multiArray[i][j] === array[j]) similarValues++
    }
    if (similarValues >= multiArray[i].length) instancesFound++
  }
  return instancesFound !== 1
}