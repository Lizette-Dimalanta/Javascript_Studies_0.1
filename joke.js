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
// const jokes = []

// function fetchJoke() { // GET request (response request) -> Returns a promise
//     return new Promise((resolve, reject) => { // Wrap `fetch` call in a promise -> enables control to what it returns
//     fetch('https://icanhazdadjoke.com/', { // Fetches response object (promise)
//         headers: { 'Accept': 'application/json'} // Reconstructs a JSON string into a Javascript object
//         // method: 'POST' // POST request (Default is 'GET', if not specified)
//         }) 
//         .then(result => result.json()) // Parses incoming raw data -> Returns another promise in JSON (but not the object)
//         .then(data => console.log(data.joke)) // Resolves wrapped `fetch` promise -> `.joke` returns response as a string
//     })
// }

// // Logs all joke promises (main program)
// const jokePromises = []

// for (let i=0; i < 5; i++) {
//     jokePromises.push(fetchJoke())
// }

// PART 3: JS Async/Await, Modules and Web Storage ----------------------------------------------------------------
const jokes = []

async function fetchJoke() { // added `async` -> returns `result` value ↓
    try {
    const result = await fetch('https://icanhazdadjoke.com/', { // `await` instead of `.then` - awaits promise for a resolve value
        headers: { 'Accept': 'application/json'}
        })
        const data = await result.json() // Await JSON promise `data`
        return data.joke // Return JSON data
    }
    catch { // catch error
        throw new Error('Could not retrieve joke!')
    }
}

// Click button to get 5 jokes -> Append to list
function get5jokes() {
    const jokePromises = []
    for (let i=0; i < 5; i++) {
        jokePromises.push(fetchJoke()) 
    }
    Promise.all(jokePromises)                                                    // ↓ `backticks`
        .then(jokes => document.querySelector('ul').innerHTML += jokes.map(joke => `<li>${joke}</li>`).join('')) // Append <li>joke</li> string to <ul> in HTML
        .catch(err => console.error(err))                                                                        // `.join('')` joins string into array (coercion/concatenate) - empty delimiter
}

// Set Event Listener
document.querySelector('button').addEventListener('click', get5jokes) // Click button, get 5 jokes

// Create an async function:
// Syntactic sugar (`async`): Is a promise under the hood
async function asyncGetJoke() { 
    const result = await fetchJoke() // Returns a promise
    console.log(result)
}

asyncGetJoke() // .then(x => console.log(x)) // can use `.then` due to async function (if there is no `await`)

console.log('End of Main') // Appears first

// WEB STORAGE

