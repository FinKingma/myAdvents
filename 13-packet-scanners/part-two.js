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
        scannerCatchInterval: ((match[2]-1)*2)
      })
    }
  }

  
  var delay = 0
  do {
    var safe = true
    for (var i=0;i<firewall.length;i++){
      var packetPos = firewall[i].pos + delay

      var caught = packetPos % firewall[i].scannerCatchInterval === 0
      if (caught) safe = false
    }
    if (safe === true) {
      console.log('safe path found at delay: ' + delay)
    }
    delay++
  }
  while (safe === false)
})