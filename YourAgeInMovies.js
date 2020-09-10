// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://www.omdbapi.com/?apikey=30700e4c&', true)

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

data.forEach((movie) => {
  // Log each movie's title
  console.log(movie.t)
})
}

// Send request
request.send()
