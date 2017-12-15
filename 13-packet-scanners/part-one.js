fs = require('fs')
score = 0;

fs.readFile('./input', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  lines = data.split('\n')
  firewall = []
  layers = []

  let firewallFinder = /(.*): (.*)/g
  for (var line of lines) {
    while (match = firewallFinder.exec(line)) {
      firewall.push({
        pos: +match[1],
        range: +match[2],
        scannerPos: 0,
        scannerSpeed: 1
      })
    }
  }

  packetPos = -3

  var maxDepth = Math.max.apply(Math,firewall.map(function(o){return o.pos;}))

  do {
    packetPos++
    amICaught(packetPos, firewall)
    moveScanners(firewall)
  }
  while (packetPos < maxDepth)

  console.log('maxSteps: ' + maxDepth)
  
  console.log('score: ' + score)
});

function amICaught(packetPos, firewall) {
  console.log('firewall: ' + JSON.stringify(firewall,null,2))
  if (firewall.find(o=>o.pos === packetPos) === undefined) return false
  if (firewall.find(o=>o.pos === packetPos).scannerPos === 0) {
    console.log('caught on pos: ' + packetPos)
    score+= firewall.find(o=>o.pos === packetPos).range * packetPos
  }
}

function moveScanners(firewall) {
  for (var i=0;i<firewall.length;i++) {
    firewall[i].scannerPos += firewall[i].scannerSpeed

    if (firewall[i].scannerPos >= (firewall[i].range-1) || firewall[i].scannerPos <= 0) firewall[i].scannerSpeed *= -1
  }
}