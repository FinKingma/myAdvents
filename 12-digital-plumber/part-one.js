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
  var connectedToZero = []
  connectedToZero.push('0')

  function searchLevel(id) {
    var linkedChildrenString = connectionList.find(o => +o.main === +id).links
    var linkedChildren = linkedChildrenString.split(',')
    for (var child of linkedChildren) {
      if (!connectedToZero.find(o => +o === +child)) {
        console.log(+child)
        connectedToZero.push(+child)
        searchLevel(child)
      }
    }
  }
  searchLevel(0)

  //console.log(JSON.stringify(connectionList,null,2))
  

  
  console.log('length: ' + (connectedToZero.length))
});
