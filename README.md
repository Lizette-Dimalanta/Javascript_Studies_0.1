# Javascript Aync and Callbacks

## NOTES

- Make code as flat as possible (less nesting, the better)

## Asynchronous

```javascript
function adder(x, y, callback) { // `callback/result` are placeholder names.
    setTimeout(() => callback(x + y), 3000) // <- Add delay (3 secs)
    console.log('Counter started')
}

adder(5, 10, result => console.log(result)) // callback
adder(15, 20, result => alert(result)) // callback

console.log('Hello')
```

## Postman Equivalent (JS)

### Configure Asynchronous Request:

```javascript
function getJoke(cb) {
    req = new XMLHttpRequest() // Does not have to be XML data
    req.addEventListener('load', event => cb(event.target.response.joke))
    req.open('GET', 'https://icanhazdadjoke.com/') // opens connection to server
    req.setRequestHeader('Accept', 'application/json')
    req.responseType = 'json'
    req.send() // Sends request (Asynchronous)
}
```

`def` : Websocket -> VS Live Server

## Inserting into HTML

```javascript
getJoke(joke => console.log(joke))
getJoke(joke => document.body.innerHTML += `<p>${joke}</p>`) // Places joke into HTML

console.log('Waiting for joke...')
```

## Callback Hell ⚠︎

```javascript
const jokes = []

getJoke(joke => { // callback
    jokes.push(joke)
    console.log(jokes)
    getJoke(joke => { // callback hell
        jokes.push(joke)
        console.log(jokes)
    })
})
```

---

## PART 2: JS Promises and Fetch API

## PROMISES

- An object that wraps/encapulates asynchronous code.
- Promises it'll run the code asynchronously/and will return a result at some point.

### 3 Promise States:

1. Starts in `pending` state.
   - Promise starts executing the promise.

Two possible results:

2. `.then(onFulfilled)`: Fufilled
    - Completes successfully
    - Promise changes state to be `fufilled`.

3. `.catch(onError)`: Rejected
    - Fails in execution:
      - Network outage
      - Request timeout

We define what happens in either of these cases by linting a callback function to the promise through the `.then()` method (fufillment callback), or the `.catch()` method (rejection callback).
