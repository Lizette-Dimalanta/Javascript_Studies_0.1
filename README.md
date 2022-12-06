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

It is essentially a chain of callbacks but...

- It is a more sophisticated structure
- Allows asynchronousy

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

We define what happens in either of these cases by linting a callback function to the promise:

- `.then()` method (fufillment callback)
- `.catch()` method (rejection callback)

## Code Examples

### Notes

- If a promise relys on a global variable -> wrap the promise in a factory function.

### Operands

```javascript
const x = 2
const y = 5
```

### Adder Function

```javascript
function adder(a, b) {
    return a + b
}
```

### `setTimeout`

```javascript
setTimeout(() => console.log(calc), 2000)
```

### Factory Function

Creates an instance of another object based on provided parameters.

- Allows the creation of multiple adder functions with different values of x and y.

```javascript
function adderPromise(x, y) { // Factory function
    return new Promise((resolve, reject) => { // Promise
        if (typeof x === 'number' && typeof y === 'number') { // validation
        const answer = adder(x, y) // statement to run asynchronously (callback)
        resolve(answer)
            // Promise { <state>: "fulfilled", <value>: 7 }
        }
        reject('Operands must be numbers.')
            // Promise { <state>: "rejected", <reason>: "Operands must be numbers." }
    })
}
```

## Attaching to factory function (`.then` and `.catch`)

Attaches callback to the factory function -> logs result *OR* catches error.

```javascript
adderPromise(10, 30) // chains `.then` and `.catch` to promise
    .then(value => console.log(value)) // `.then` is asynchronous
    .catch(err => console.error(err)) // catches rejection -> logs error
```

If `.then` and `.catch` are the same for all (multiple) `adderPromises`: **D-R-Y**

```javascript
const resolved = value => console.log(value)
const error = err => console.log(err)

adderPromise(10, 30).then(resolved).catch(error)
adderPromise(50, 'asdf').then(resolved).catch(error)
adderPromise(50, 60).then(resolved).catch(error)
```

`Resolved` Equivalent:

```javascript
// v1:
const resolved = value => console.log(value)
// v2:
function resolved(value) { // can convert to arrow function after testing
    console.log(value)
}
```

## Promise Hell ⚠︎

```javascript
adderPromise(10, 20)
    .then(value => {
        adderPromise(value, 20)
        .then(resolved)
        . catch(error)
    })
    .catch(error)
```

### Solution:

```javascript
adderPromise(10, 20)
    .then(value => { // Promise 1 resolution
        return adderPromise(value, 20) // Create and return promise 2 asynchronously
        . catch(error)
    })
    .then(resolved) // Promise 2 (nested) resolution
    .catch(error)
```