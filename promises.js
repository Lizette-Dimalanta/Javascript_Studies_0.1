const x = 2 // operand
const y = 5

function adder(a, b) {
    return a + b
}

// FACTORY FUNCTION: creates an instance of another object based on provided parameters
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
// Can create as many adder functions as we want with different values of x and y

setTimeout(() => console.log(calc), 2000)

// Attaches (.then) callback (res) to the factory function (adderPromise) = logs result OR catches error
adderPromise(10, 30) // chains `.then` and `.catch` to promise
    .then(res => console.log(res)) // `.then` is asynchronous
    .catch(err => console.error(err)) // catches rejection -> logs error

// Essentially a chain of callbacks, but...
// It is a more sophisticated structure
// Allows asynchronousy

console.log('calculating...')

// If .`then` and `.catch` are the same for all `adderPromise`:

// const resolved = res => console.log(res)

// adderPromise(10, 30)
//     .then(resolved)
//     .catch(err => console.error(err))