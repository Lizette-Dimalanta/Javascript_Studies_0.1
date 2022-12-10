// PART 3:
// Pull math.js module into script.js
import { PI, add } from './math.js'
    // standalone variables (destructured module)

console.log(add(5, 7))
 

















// --------------------------------------------------------------------------------------------------------------------

// CALLBACKS

// NOTES:
// - Make code as flat as possible (less nesting the better)

// Asynchronous
// function adder(x, y, callback) { // `callback/result` are placeholder names.
//     setTimeout(() => callback(x + y), 3000) // <- Add delay (3 secs)
//     console.log('Counter started')
// }

// adder(5, 10, result => console.log(result)) // callback
// adder(15, 20, result => alert(result)) // callback

// console.log('Hello')

// Postman Equivalent (JS)

// Configure Request
// function getJoke(cb) {
//     req = new XMLHttpRequest() // Does not have to be XML data
//     req.addEventListener('load', event => cb(event.target.response.joke))
//     req.open('GET', 'https://icanhazdadjoke.com/') // opens connection to server
//     req.setRequestHeader('Accept', 'application/json')
//     req.responseType = 'json'
//     req.send() // Sends request (Asynchronous)
// }

// Websocket -> VS Live Server

// getJoke(joke => console.log(joke))
// getJoke(joke => document.body.innerHTML += `<p>${joke}</p>`) // Places joke into HTML

// console.log('Waiting for joke...')

// CALLBACK HELL
// const jokes = []

// getJoke(joke => { // callback
//     jokes.push(joke)
//     console.log(jokes)
//     getJoke(joke => { // callback hell
//         jokes.push(joke)
//         console.log(jokes)
//     })
// })
