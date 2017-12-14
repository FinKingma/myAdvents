fs = require('fs')
score = 0;

fs.readFile('./input', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var connections = data.split('\n')
  let connectionFinder = /(.*) <-> (.*)/g

  var connectionList = []

  for (var connection of connections) {
    while (match = connectionFinder.exec(connection)) {
      connectionList.push({
        main: match[1],
        links: match[2]
      })
    }
  }
  var connectedParts = []


  function searchLevel(id) {
    var linkedChildrenString = connectionList.find(o => +o.main === +id).links
    var linkedChildren = linkedChildrenString.split(',')
    for (var child of linkedChildren) {
      if (!connectedParts.find(o => +o === +child)) {
        connectedParts.push(+child)
        searchLevel(child)
      }
    }
  }
  var groups = 0

  var looping = setInterval(function() {
    if (connectedParts.length < connectionList.length) {
      for (var i=0;i<connectionList.length;i++) {
        //console.log('looking for ' + i + ' in list ' + connectedParts)
        if (connectedParts.find(o => +o === i) === undefined) {
          groups++
          console.log('length diff: ' + Math.abs(connectedParts.length - connectionList.length))
          console.log('searching group starting with: ' + i)
          searchLevel(i)
          break
        }
      }
    } else {
      clearInterval(looping)
      console.log('groups: ' + groups)
    }
    

  },4000)

  
  // do {
  //   for (var i=0;i<connectionList.length;i++) {
  //     console.log('looking for ' + i + ' in list ' + connectedParts)
  //     if (!connectedParts.find(o => +o === i)) {
  //       searchLevel(i)
  //       console.log('searching group starting with: ' + i)
  //     }
  //   }
  // }
  // while (connectedParts.length === connectionList.length)

  

  
  // console.log('length: ' + (connectedParts.length))
});
