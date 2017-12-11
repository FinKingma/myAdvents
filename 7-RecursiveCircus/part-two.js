fs = require('fs')
score = 0;

fs.readFile('./input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  let programs = data.split('\n')
  let programNameFinder = /(.*).+\((.*)\)/g
  let subProgramNameFinder = /(.*).+\((.*)\) -> (.*)/g

  let programNames = []
  let subProgramNames = []

  // transform input data into array of objects
  for (var i=0;i<programs.length;i++) {
    while (match = programNameFinder.exec(programs[i])) { // eslint-disable-line no-cond-assign
      programNames[i] = {
        name: match[1],
        weight: parseInt(match[2])
      }
    }

    while (match = subProgramNameFinder.exec(programs[i])) { // eslint-disable-line no-cond-assign
      var subs = match[3].split(', ')
      programNames[i] = {
        name: match[1],
        weight: parseInt(match[2]),
        subs: subs
      }
      for (var j=0;j<subs.length;j++) {
        subProgramNames.push(subs[j])
      }
    }
  }

  var programTree

  // find bottom object
  for (var x = 0; x< programNames.length; x++) {
    if (subProgramNames.indexOf(programNames[x].name) === -1) {
      programTree = {
        name: programNames[x].name,
        weight: programNames[x].weight,
        subs: programNames[x].subs
      }
      
    }
  }

  function buildLevel(programTree) {
    var subProgramTree = programTree['subs']
    for (var key in subProgramTree) {
      if (!subProgramTree[key].hasOwnProperty('weight')) {
        subProgramTree[key] = programNames.find((o) => o.name === subProgramTree[key])
        buildLevel(subProgramTree[key])
      }
    }
    checkBalance(subProgramTree)
    programTree.totalWeight = sumTotalWeight(programTree)
  }
  buildLevel(programTree)

  function sumTotalWeight(obj) {
    var sum = 0;
    sum += obj.weight
    for( var key in obj['subs'] ) {
      if( obj['subs'].hasOwnProperty( key ) ) {
        if (obj['subs'][key].totalWeight) {
          sum += parseFloat(  obj['subs'][key].totalWeight );
        } else {
          sum += parseFloat(  obj['subs'][key].weight );
        }
      }
    }
    return sum;
  }

  function checkBalance(subProgramTree) {
    var weight
    for (var key in subProgramTree) {
      if (subProgramTree[key].hasOwnProperty('totalWeight')) {
        if (!weight) weight = subProgramTree[key].totalWeight
        else {
          if (weight != subProgramTree[key].totalWeight) {
            console.log('weight ' + subProgramTree[key].totalWeight + ' does not match with expected weight ' + weight)
          }
        }
      } else if (subProgramTree[key].hasOwnProperty('weight')) {
        if (!weight) weight = subProgramTree[key].weight
        else {
          if (weight != subProgramTree[key].weight) {
            console.log('weight ' + subProgramTree[key].weight + ' does not match with expected weight ' + weight)
          }
          //check totalWeight
        }
      }
    }
  }

  //console.log('tree: ' + JSON.stringify(programTree,null,2))
});