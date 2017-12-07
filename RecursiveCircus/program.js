fs = require('fs')
score = 0;

fs.readFile('./input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  let programs = data.split('\n')
  let programNameFinder = /(.*).+\(.*\)/g
  let subProgramNameFinder = /(.*).+\(.*\) -> (.*)/g

  let programNames = []
  let subProgramNames = []

  let chiefFound = false
  do {
    nextLevelPrograms = []
    for (var i=0;i<programs.length;i++) {
      while (match = programNameFinder.exec(programs[i])) { // eslint-disable-line no-cond-assign
        programNames.push(match[1])
      }
      while (match = subProgramNameFinder.exec(programs[i])) { // eslint-disable-line no-cond-assign
        var subs = match[2].split(', ')
        for (var j=0;j<subs.length;j++) {
          subProgramNames.push(subs[j])
        }
      }
    }
    chiefFound = true
  }
  while (chiefFound === false)

  console.log('names: ' + programNames)
  console.log('subs: ' + subProgramNames)

  for (var x = 0; x< programNames.length; x++) {
    if (subProgramNames.indexOf(programNames[x]) === -1) {
      console.log('found! ' + programNames[x])
    }
  }
});