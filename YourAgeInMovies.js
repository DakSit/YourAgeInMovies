// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://www.omdbapi.com/?apikey=30700e4c&', true)

request.onload = function () {
  // Begin accessing JSON data here
}

// Send request
request.send()
