var request = new XMLHttpRequest()

request.open('GET', 'http://www.omdbapi.com/?apikey=30700e4c&', true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    console.log('Success!');
    data.forEach((movie) => {
      console.log(movie.t)
    })
  } else {
    console.log('error')
  }
}

request.send()
