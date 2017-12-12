fs = require('fs')
score = 0;

fs.readFile('./input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var programsData = data.split('\n')
  var programList = setUpPrograms(programsData)
  var registers = []

  createEmptyRegisters(programList, registers)
  executeProgram(programList, registers)

  var max = Math.max.apply(Math,registers.map(function(o){return o.value;}))

  console.log('max: ' + max)

  console.log(JSON.stringify(registers,null,2))
  
  console.log('steps: ' + score)
});

function createEmptyRegisters(programList, registers) {
  for (var program of programList) {
    if (!registers.find(o => o.name === program.condition.reg)) {
      registers.push({
        name: program.condition.reg,
        value: 0
      })
    }
    if (!registers.find(o => o.name === program.action.reg)) {
      registers.push({
        name: program.action.reg,
        value: 0
      })
    }
  }
}

function executeProgram(programList, registers) {
  for (var program of programList) {
    if (eval(registers.find(o => o.name === program.condition.reg).value + program.condition.check + program.condition.amount)) {
      switch(program.action.do) {
        case 'inc':
          registers.find(o => o.name === program.action.reg).value += +program.action.amount
          break;
        case 'dec':
          registers.find(o => o.name === program.action.reg).value -= +program.action.amount
          break;
      }
    }
  }
}

function setUpPrograms(programsData) {
  let programNameFinder = /(.*) (inc|dec) (.*) if (.*) (.*) (.*)/g
  var programList = []

  for (var programData of programsData) {
    while (match = programNameFinder.exec(programData)) { // eslint-disable-line no-cond-assign
      var program = {
        action: {
          reg: match[1],
          do: match[2],
          amount: match[3]
        },
        condition: {
          reg: match[4],
          check: match[5],
          amount: match[6]
        }
      }
      programList.push(program)
    }
  }
  return programList
}