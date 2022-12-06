// REFACTORING SCRIPT.JS TO USE PROMISES

// function getJoke() {
//     return new Promise((resolve, reject) => {
//         req = new XMLHttpRequest() // Does not have to be XML data
//         req.addEventListener('load', event => resolve(event.target.response.joke)) // `resolve()` promise with joke as the value
//         req.open('GET', 'https://icanhazdadjoke.com/') // opens connection to server
//         req.setRequestHeader('Accept', 'application/json')
//         req.responseType = 'json'
//         req.send() // Sends request (Asynchronous)
//     })
// }

// const jokes = []

// const callback = joke => {
//     jokes.push(joke)
//     return getJoke()
// }

// // Logging a single joke:
// getJoke().then(joke => console.log(jokes))
//         // Array [ "Hostess: Do you have a preference of where you sit?\r\nDad: Down." ]


// // Logging multiple jokes:
// getJoke()
//     .then(callback)
//     .then(callback)
//     .then(callback)
//     .then(joke => {
//         jokes.push(joke)
//         console.log(jokes)
//     }) 

// REFINED
// const jokes = []

// const jokePromises = [
//     getJoke(), // each call is a promise
//     getJoke(), // array of promise objects
//     getJoke(),
//     getJoke()
// ]

// Promise.all(jokePromises) // promise class -> returns an array of multiple promises (executing asynchronously)
//     .then(jokes => console.log(jokes))

// Equivalent: D-R-Y
// const jokes = []

// const jokePromises = []

// for (let i=0; i < 5; i++) {
//     jokePromises.push(getJoke())
// }

// Promise.all(jokePromises) // promise class -> returns an array of all multiple promises (executing asynchronously)
//     .then(jokes => console.log(jokes))
//     .catch(err => console.error(err))

// ---

// FETCH API

// ES6: New way of viewing requests -> Fetch API
// Promise-based: More efficient at intergrating with code asynchronously

// Refactoring `function getJoke()` using Fetch API

// from
// function getJoke() {
//     return new Promise((resolve, reject) => {
//         req = new XMLHttpRequest() // Does not have to be XML data
//         req.addEventListener('load', event => resolve(event.target.response.joke)) // `resolve()` promise with joke as the value
//         req.open('GET', 'https://icanhazdadjoke.com/') // opens connection to server
//         req.setRequestHeader('Accept', 'application/json')
//         req.responseType = 'json'
//         req.send() // Sends request (Asynchronous)
//     })
// }

// to
const jokes = []

function fetchJoke() { // GET request (response request) -> Returns a promise
    return new Promise((resolve, reject) => { // Wrap `fetch` call in a promise -> enables control to what it returns
    fetch('https://icanhazdadjoke.com/', { // Fetches response object (promise)
        headers: { 'Accept': 'application/json'} // Convert to JSON
        }) 
        .then(result => result.json()) // Parses incoming raw data -> Returns another promise in JSON (but not the object)
        .then(data => console.log(data.joke)) // Resolves wrapped `fetch` promise -> `.joke` returns response as a string
    })
}

// Logs all joke promises (main program)
const jokePromises = []

for (let i=0; i < 5; i++) {
    jokePromises.push(fetchJoke())
}

Promise.all(jokePromises) // stores `.all` promise resolutions into array (jokePromises)
    .then(responses => console.log(jokes))
    .catch(err => console.error(err))