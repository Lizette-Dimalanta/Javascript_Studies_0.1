# Javascript Studies *(PART 2)*

## Table of Contents

### **PART 1:** Async and Callbacks

1. [General Notes](#general-notes)
2. [**Asynchronous** Example](#asynchronous-example)
3. [Configuring an **Asynchronous Request**](#configuring-an-asynchronous-request)
4. [Adding List and Button to **DOM**](#adding-list-and-button-to-dom-html)
5. [Inserting into **HTML**](#inserting-into-html)
6. [**⚠︎ Callback Hell**](#callback-hell-⚠︎)

### **PART 2:** Promises and Fetch API

**Promises:**

7. [**Promises**](#promises)
   - [3 Promise States](#3-promise-states)
8. [`Code Examples`](#code-examples)
9. [**Notes** *(Promises)*](#notes)
10. [**Operands**](#operands)
11. [**Adder Function**](#adder-function)
12. [**`setTimeout`**](#settimeout)
13. [**Factory Function**](#factory-function)
    - [Attaching to Factory Function](#attaching-to-factory-function-then-and-catch)
14. [**⚠︎ Promise Hell**](#promise-hell-⚠︎)
    - [Solution](#solution)
15. [Refactoring **`script.js`** to use **Promises**](#refactoring-scriptjs-to-use-promises-part-2-of-lesson-1)
    - [Logging a **single** joke](#logging-a-single-joke)
    - [Logging **multiple** jokes](#logging-multiple-jokes)
16. [**REFINED**: Refactoring **`script.js`**](#refactoring-scriptjs-refined)
    - [D-R-Y Equivalent](#equivalent-d-r-y)

**Fetch API:**

17. [**Fetch API**](#fetch-api)
    - [**Refactoring** `function getJoke()` using **Fetch API**](#refactoring-function-getjoke-using-fetch-api)

### **PART 3:** Async/Await, Modules and Web Storage

**Async/Await:**

18. [**Notes**](#notes-part-3)
    - [Defer Async](#defer-async)
19. [Importing **`defer async` script** into HTML](#importing-defer-async-script-into-html)
20. [Creating an **Async Function**](#creating-an-async-function)
21. [Refactoring **`fetchJoke()`** Function with **`async await`**](#refactoring-fetchjoke-function-with-async-await---dry)
22. [Adding Jokes into **`.html` List**](#adding-jokes-into-html-list)

**Web Storage:**

23. [**Web Storage**](#web-storage)
    - [`localStorage`](#localstorage)
    - [`sessionStorage`](#sessionstorage)

**Modules:**

24. [**Import a Module** into `HTML`](#import-module-into-html)
25. [Pull **`math.js`** into **`script js`**](#pull-mathjs-into-script-js)
26. [***ERROR***: `Uncaught SyntaxError: ambiguous indirect export: default`](#error-uncaught-syntaxerror-ambiguous-indirect-export-default)
    - [Debug](#correction)

### **PART 4:** Introduction to React

**NPM and Third-Party Packages:**

27. [Installing **Third-Party Packages**](#installing-third-party-packages)
28. [**NPM: Node Package Manager**](#npm-node-package-manager)
    - [Sorting Packages](#sorting-packages)
29. [Using Third-Party Packages ***(command line)***](#using-third-party-packages-command-line)
30. [**`package.json`**](#packagejson)
    - [**`package.json**` Code Snippet](#packagejson-code-snippet)
31. [Using **`main`** parameter in **`package.json`**](#using-main-parameter-in-packagejson--es6-module-syntax)
    - [**`Scripts`**](#scripts)
32. [**`package-lock.json`**](#package-lockjson)
    - [**`package-lock.json`** Dependency Code Snippet](#package-lockjson-dependency-code-snippet)
33. [**`node_modules` Directory**](#node_modules-directory)
34. [Adding to **`.gitignore`**](#adding-to-gitignore)
35. [Using a **Third-Party Package**](#using-a-third-party-package)

---

## General Notes

- Make code as flat as possible (less nesting, the better)
- `def` : Websocket -> VS Live Server

### Asynchronous Example

```javascript
function adder(x, y, callback) { // `callback/result` are placeholder names.
    setTimeout(() => callback(x + y), 3000) // <- Add delay (3 secs)
    console.log('Counter started')
}

adder(5, 10, result => console.log(result)) // callback
adder(15, 20, result => alert(result)) // callback

console.log('Hello')
```

## Configuring an Asynchronous Request

aka. Postman Equivalent (JS)

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

## Adding List and Button to DOM (`.html`)

```html
<body>
    <h1>Promises</h1>
    <ul></ul>
    <button>Get 5 Jokes</button>
</body>
```

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

[Back to **Table of Contents** Here!](#table-of-contents)

---

## **PART 2:** JS Promises and Fetch API

## Promises

- An object that wraps/encapulates asynchronous code.
- Promises it'll run the code asynchronously/and will return a result at some point.

It is essentially a chain of callbacks but...

- It is a more sophisticated structure
- Allows asynchronousy

### 3 Promise States

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

[Back to **Table of Contents** Here!](#table-of-contents)

## Code Examples

### Notes

- If a promise relys on a global variable -> wrap the promise in a factory function.
- Do not use promises for everything!
  - May be overkill for more simple tasks (can overcomplicate your project)
  - Sometimes a simple callback is a lot easier and cleaner
- Suitable for more complex tasks

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

## Factory Function

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

[Back to **Table of Contents** Here!](#table-of-contents)

## Attaching to Factory Function (`.then` and `.catch`)

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
        adderPromise(value, 20) // nested promise, forces synchronousy
        .then(resolved)
        .catch(error)
    })
    .catch(error)
```

### Solution

```javascript
adderPromise(10, 20)
    .then(value => adderPromise(value, 20)) // Create and return promise 2 asynchronously
    .then(value => adderPromise(value, 50))
    .then(resolved) // Resolved function ^
    .catch(error) // catches all errors within scope
```

[Back to **Table of Contents** Here!](#table-of-contents)

## Refactoring `script.js` to use Promises *(part 2 of lesson 1)*

```javascript
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

const jokes = []
```

### Logging a single joke

```javascript
getJoke().then(joke => console.log(jokes))
        // Array [ "Hostess: Do you have a preference of where you sit?\r\nDad: Down." ]

```

### Logging multiple jokes

Creating a callback:

```javascript
const callback = joke => {
    jokes.push(joke)
    return getJoke()
}
```

Calling multiple jokes within a function:

```javascript
getJoke()
    .then(callback)
    .then(callback)
    .then(callback)
    .then(joke => {
        jokes.push(joke)
        console.log(jokes)
    }) 
```

## Refactoring `script.js` *REFINED*

```javascript
const jokes = []

const jokePromises = [
    getJoke(), // each call is a promise
    getJoke(), // array of promise objects
    getJoke(),
    getJoke()
]

Promise.all(jokePromises) // promise class -> returns an array of multiple promises (executing asynchronously)
    .then(jokes => console.log(jokes))
```

### Equivalent: `D-R-Y`

```javascript
const jokes = []

const jokePromises = []

for (let i=0; i < 5; i++) {
    jokePromises.push(getJoke())
}

Promise.all(jokePromises) // promise class -> returns an array of multiple promises (executing asynchronously)
    .then(jokes => console.log(jokes))
    .catch(err => console.error(err))
```

[Back to **Table of Contents** Here!](#table-of-contents)

## Fetch API

- **ES6**: New way of viewing requests -> Fetch API
- **Promise-based**: More efficient at intergrating with code asynchronously

### Refactoring `function getJoke()` using Fetch API

- Also a factory function (like `getJoke()`)

### From...

```javascript
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
```

### to...

```javascript
// FETCH API REFACTORING
const jokes = []

function fetchJoke() { // GET request (response request) -> Returns a promise
    return new Promise((resolve, reject) => { // Wrap `fetch` call in a promise -> enables control to what it returns
    fetch('https://icanhazdadjoke.com/', { // Fetches response object (promise)
        headers: { 'Accept': 'application/json'} // Reconstructs a JSON string into a Javascript object
        method: 'POST' // POST request (Default is 'GET', if not specified)
        }) 
        .then(result => result.json()) // Captures (parses) `resolve` value from promise -> Returns another promise (result.json())
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
// Will keep same order (even if it finishes out of sequence)
```

[Back to **Table of Contents** Here!](#table-of-contents)

---

## **PART 3:** Javascript Async/Await, Modules and Web Storage

## Notes *(part 3)*

- `def` **XHR**: *XMLHttpRequest (XHR)* objects are used to interact with servers.
- `def` **Syntactic Sugar**: A term for a more concise syntax (shorthand) that provides the same functionality for something that already exists. No new functionality is introduced.

### Defer Async

- Defers execution until the DOM is fully executed
  - Will wait until the all components of DOM exists to execute
- `Async`: Allows to keep parsing the rest of the HTML/constructing the DOM while `script.js` is being retrieved and downloaded
  - Will automatically wrap a return value in a promise
- Used when...
  - Doing any DOM interactions
  - Using multiple scripts (unless it isn't interacting with the DOM)

## Code Examples *(part 3)*

### Importing `defer async` script into HTML

```javascript
<script defer async src="joke.js"></script> 
```

## Creating an Async Function

- `Async`: Allows to keep parsing the rest of the HTML/constructing the DOM while `script.js` is being retrieved and downloaded
  - Will automatically wrap a return value in a promise

```javascript
async function asyncGetJoke() { 
    const result = await fetchJoke() // Returns a promise
    console.log(result)
}

asyncGetJoke() // .then(x => console.log(x)) // can use `.then` due to async function (if there is no `await`)

console.log('End of Main') // Appears first
```

[Back to **Table of Contents** Here!](#table-of-contents)

## Refactoring `fetchJoke()` Function with `async await` - *D.R.Y*

- See [Creating an Async Function](#creating-an-async-function) for reference
- Function is wrapped with `async` function to create a promise
- Exact same as before => Results in a promise

```javascript
// Before:
const jokes = []

function fetchJoke() {
    return new Promise((resolve, reject) => {
    fetch('https://icanhazdadjoke.com/', {
        headers: { 'Accept': 'application/json'}
        })
        .then(result => result.json())
        .then(data => resolve(data.joke))
    })
}
```

```javascript
// With async (equivalent)
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
```

### Adding Jokes into `.html` List

Click button to get 5 jokes -> Appends to list

```javascript
function get5jokes() {
    const jokePromises = []
    for (let i=0; i < 5; i++) {
        jokePromises.push(fetchJoke()) 
    }
    Promise.all(jokePromises)                                                    // ↓ `backticks`
        .then(jokes => document.querySelector('ul').innerHTML += jokes.map(joke => `<li>${joke}</li>`).join('')) // Append <li>joke</li> string to <ul> in HTML
        .catch(err => console.error(err))                                                                        // `.join('')` joins string into array (coercion/concatenate) - empty delimiter
}
```

### Setting Event Listener for Button

```javascript
document.querySelector('button').addEventListener('click', get5jokes) // Click button, get 5 jokes
```

[Back to **Table of Contents** Here!](#table-of-contents)

## Web Storage

- Persists data purely on the user's browser (client side)
- Consists of two objects:
  - [Local Storage](#localstorage)
  - [Session Storage](#sessionstorage)
- Difference is how long the data persists (is held)
- Depends what type of data is stored
- Can be manipulated in browser console
- Can not be stored directly, but can be stringified and stored as a JSON string

## `localStorage`

- Stores key value pairs with a particular URL, in the user's browser indefinitely (until cleared)

### View `localStorage`:

```javascript
localStorage
    // Storage { foo: "bar", length: 1 }
```

### Set or Read Values (`localStorage`):

```javascript
// v1:
localStorage.foo = "bar"
    // "bar"

// v2:
x = { name: "Lizette", age: "22" } // Set value
    // Object { name: "Lizette", age: "22" }
```

### Store Object:

- Object must be stringified and stored as a JSON string

```javascript
// v2 cont:
localStorage.person = JSON.stringify(x) // Stringify value into JSON string -> Store in local storage
    // "{\"name\":\"Lizette\",\"age\":\"22\"}"
```

### Calling Object (parse):

```javascript
// v2 cont:
JSON.parse(localStorage.person)
    // Object { name: "Lizette", age: "22" }
```

## `sessionStorage`

- Stores until user closes their browser/terminate session
- For more temporary storage (e.g. authentication)

### View `sessionStorage`:

```javascript
sessionStorage
    // Storage { spam: "42", IsThisFirstTime_Log_From_LiveServer: "true", length: 2 }
```

### Set or Read Values (`sessionStorage`):

```javascript
sessionStorage.spam = 42
    // 42
```

[Back to **Table of Contents** Here!](#table-of-contents)

## Storing Jokes into `localStorage`

1. Build `fetchJoke()` function

```javascript
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
```

2. Function to load and display jokes from `localStorage` (if any) && concatenate (join) new jokes

```javascript
function loadJokes(jokes) {
    // Conditional Expression ↓: Retrieve and parse existing jokes (if truthy) OR || parse empty JSON array (if falsy)
    jokes = JSON.parse(localStorage.jokes || '[]').concat(jokes) // concatenates jokes to any existing jokes
    localStorage.jokes = JSON.stringify(jokes) // JSON stringify Jokes and store into new array
    document.querySelector('ul').innerHTML = jokes.map(joke => `<li>${joke}</li>`).join('') // Replace all current items with new combined list
}
```

3. Click button to get 5 jokes + append to `localStorage.jokes`

```javascript
function get5jokes() {
    const jokePromises = []
    for (let i=0; i < 5; i++) {
        jokePromises.push(fetchJoke()) 
    }
    Promise.all(jokePromises)                                                   
        .then(jokes => loadJokes(jokes)) // Concates new jokes to existing jokes
        .catch(err => console.error(err))                                                                        
}

// Set Event Listener
document.querySelector('button').addEventListener('click', get5jokes) // Click button, get 5 jokes
```

4. Reconstruct existing `localStorage.jokes` and display in DOM list

```javascript
// Conditional Expression ↓: Retrieve and parse existing jokes (if truthy) OR || parse empty JSON array (if falsy)
const oldJokes = JSON.parse(localStorage.jokes || '[]')
document.querySelector('ul').innerHTML += oldJokes.map(joke => `<li>${joke}</li>`).join('')
```

5. Call `loadJokes()` to call updated list

```javascript
loadJokes([]) // Must have empty array for function to work
```

[Back to **Table of Contents** Here!](#table-of-contents)

## Modules

### Import module into html

```html
<script defer async src="script.js" type ="module"></script>
```

### Pull math.js into script js

```javascript
import PI, add from './math' // Modules
// OR
import { PI, add } from './math.js'
    // Importing standalone variables
// OR
import * as foo from './math.js' // Wildcard
    // Import all from module -> wrap as an object (foo)
```

### *ERROR*: `Uncaught SyntaxError: ambiguous indirect export: default`

- `def`: Looking for a default export from the module.
  - *Python*: Assumes any python file is a module (automatically makes it available for import)
  - **Javascript**: We must **explicitly** state it is a module
    - Can not be imported unless it is first export it from the module (expose)
    - Allows us to protect data and limit access from outside the module

### **Correction:**

Add to end of module before importing ↓

```javascript
export default PI // Can only be ONE default export
// OR
export { PI, add } // Add multiple exports (wrap in an object)
```

Can also export within a function:

- Now works with `const`

```javascript
export function add(a, b) { // exporting each function individually
    return a + b
}
```

- Even though you can have an implicity import, you MUST explicitly state the export
- There is no wildcard (`*`) export

---

## **PART 4:** Introduction to React

[Back to **Table of Contents** Here!](#table-of-contents)

## Installing Third-Party Packages

**Python:**

- `Pypi` - Third-Party Packages
- `Pip` - A PyPi Package Manager

**Javascript Equivalent:**

- `Node.js` - Javascript Interpreter
- `NPM.js` - Node Package Manager
  - Enter name of package Desired
  - Will search a central repository -> installs desired package

## NPM: Node Package Manager

[Click Here for **NPM Website**](https://www.npmjs.com/)

- Will **automatically** install any **dependencies** with any packages
- `def` - **Dependents**: Lists packages that are dependent of selected package
- **Research**: Ensure you are aware of the **package license permissions**

### Sorting Packages

1. Optimal
   - ↓ Average general performance of all other measures
2. Popularity
   - Generally a good measure
3. Quality
4. Maintanence
   - Most recently updated
   - 2 - 3 years max suggested

## Using Third-Party Packages *(command line)*

1. **Set up Node application:**

- Creates `package.json` file

```bash
npm init -y 
# -y : Assumes 'yes' for all settings
```

2. **Install NPM package:**

Install package:

`'i'` - Installs latest version

```bash
npm i roll
# OR
npm i roll@1.2 # Install specific version
```

[Back to **Table of Contents** Here!](#table-of-contents)

## `package.json`

`▹ debug` Button *(under line 5)*:

- Inserted by *VScode*
- Will run `script.js` using `node.js`, in **debug mode**
- **NOT suggested to use**:
  - May run it in windows
  - Others/You may not be using VScode in a professional work environment
- `Recommended` : Debug through terminal

### `package.json` Code Snippet

- Essentially identifies as as a `node.js` application

```json
{
  "name": "callbacks", 
  "version": "1.0.0",
  "description": "Javascript Studies",
  "main": "script.js", // ← Where should Node.js start? (Main Entry Point)
  "type": "module",
  "scripts": { // ↓ Can specify multiple scripts
    "start": "node script", // Add any extra parameters
    "test": "echo \"Error: no test specified\" && exit 1" // Terminal Commands
  },
  "repository": { // GitHub Repository Details (if applicable)
    "type": "git",
    "url": "git+https://github.com/Lizette-Dimalanta/JS_async_callbacks.git"
  },
  "keywords": [], // What does your package do? → Series of keywords (strings)
  "author": "", // Author Details
  "license": "ISC", // Can change the license
  "bugs": { // Bugs URL → Open support ticket (GitHub Issues Tab)
    "url": "https://github.com/Lizette-Dimalanta/JS_async_callbacks/issues"
  },
  "homepage": "https://github.com/Lizette-Dimalanta/JS_async_callbacks#readme", // Webpage for Application (if applicable)
  "dependencies": { // Appears after package installation
  "roll": "^1.3.1" // Requires v1.3.1 or higher
  }
}
```

## Using `main` parameter in `package.json` *(*↑ *ES6 Module Syntax)*

**Module MUST be specified before use:**

**`script.js` → `script.mjs`**

*OR*

**Include:**

**`"type": "module",`** under `"main"`.

### **`Scripts:`**

- **COMMAND LINE:** Can use `run` instead of `node` for:
  - `"test": " "`
  - `"start": " "`

**CODE** → `"start": "node script"`

**COMMAND LINE** → `npm start`

**Result:**

```bash
> callbacks@1.0.0 start
> node script

12
Hello world!
```

[Back to **Table of Contents** Here!](#table-of-contents)

## `package-lock.json`

- A detailed layout/description of **all dependencies** (and its sub-dependencies)
- Is **platform-dependent** (individual to the user/device)
- `NPM` will use this folder to get details on dependencies (especially for updates)

### `package-lock.json` Dependency Code Snippet

- `resolved` → Package source URL
- `Integrity` Hash → Hash of the file contents
  - Allows `NPM` to determine whether the package has been tampered with

```json
    "node_modules/minimist": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.7.tgz",
      "integrity": "sha512-bzfL1YUZsP41...",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    }
```

## `node_modules` Directory

- Installs packages **locally** into the `node_modules` directory
- Only contains packages that are **dependencies** of the project
- `node_modules` MUST be included in `.gitignore` because:
  - Can be very large in size
  - Is **platform-dependent** (individual to the user/device)

## Adding to `.gitignore`

```bash
# Both are platform-dependent
node_modules
package-lock.json
```

## Using a Third-Party Package

1. Importing Third-Party Package *(Roll)*

```javascript
import Roll from 'roll'
```

2. Using a Package

```javascript
export const roll = new Roll()
console.log(roll.roll('2d10'))
```

[Back to **Table of Contents** Here!](#table-of-contents)