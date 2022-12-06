// REFACTORING SCRIPT.JS TO USE PROMISES

function getJoke() {
    return new Promise((resolve, reject) => {
        req = new XMLHttpRequest() // Does not have to be XML data
        req.addEventListener('load', event => resolve(event.target.response.joke)) // `resolve()` promise with joke as the value
        req.open('GET', 'https://icanhazdadjoke.com/') // opens connection to server
        req.setRequestHeader('Accept', 'application/json')
        req.responseType = 'json'
        req.send() // Sends request (Asynchronous)
    })
}

// const jokes = []

const callback = joke => {
    jokes.push(joke)
    return getJoke()
}

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
const jokes = []

const jokePromises = []

for (let i=0; i < 5; i++) {
    jokePromises.push(getJoke())
}

Promise.all(jokePromises) // promise class -> returns an array of all multiple promises (executing asynchronously)
    .then(jokes => console.log(jokes))
    .catch(err => console.error(err))