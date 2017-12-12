fs = require('fs')
score = 0;

fs.readFile('./input', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var circularList = []
  var listNr = 256

  for (var i=0;i<listNr; i++) circularList.push(i)

  var input = []
  for (var string of data) {
    input.push(stringToBytes(string))
  }
  var prefix = [17, 31, 73, 47, 23]
  for (var string of prefix) {
    input.push(string)
  }

  console.log('input: '+input)

  var pos = 0
  var skipSize = 0

  var rounds = 64

  for (var r=0;r<rounds;r++) {
    for (var j=0;j<input.length;j++) {
      input[j] = parseInt(input[j])
      reverseOrder(circularList, pos, input[j])
      pos += input[j] + skipSize
      skipSize++
    }
  }

  var sparseHash = circularList
  var hash = ''

  var dense = []
  for (var h=0;h<(circularList.length/16);h++) {
    for (var d=0;d<16;d++) {
      dense[h] ^= circularList[h*16 + d]
    }
  }

  var hash = ''
  for (var num of dense) {
    if (num.toString(16).length === 1) hash += '0'
    hash += num.toString(16)
  }
  
  console.log('result: ' + hash)

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

function stringToBytes(str) {
  var ch, st, re = [];
  for (var i = 0; i < str.length; i++ ) {
	ch = str.charCodeAt(i);  // get char 
	st = [];                 // set up "stack"
	do {
	  st.push( ch & 0xFF );  // push byte to stack
	  ch = ch >> 8;          // shift value down by 1 byte
	}  
	while ( ch );
	// add stack contents to result
	// done because chars have "wrong" endianness
	re = re.concat( st.reverse() );
  }
  // return an array of bytes
  return re;
}