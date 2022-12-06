// // OPERANDS
// const x = 2
// const y = 5

// function adder(a, b) {
//     return a + b
// }

// // FACTORY FUNCTION: creates an instance of another object based on provided parameters
// function adderPromise(x, y) { // Factory function
//     return new Promise((resolve, reject) => { // Promise
//         if (typeof x === 'number' && typeof y === 'number') { // validation
//         const answer = adder(x, y) // statement to run asynchronously (callback)
//         resolve(answer)
//             // Promise { <state>: "fulfilled", <value>: 7 }
//         }
//         reject('Operands must be numbers.')
//             // Promise { <state>: "rejected", <reason>: "Operands must be numbers." }
//     })
// }
// // Can create as many adder functions as we want with different values of x and y

// // Attaches (.then) callback (res) to the factory function (adderPromise) = logs result OR catches error
// // adderPromise(10, 30) // chains `.then` and `.catch` to promise
// //     .then(res => console.log(res)) // `.then` is asynchronous
// //     .catch(err => console.error(err)) // catches rejection -> logs error

// // Essentially a chain of callbacks, but...
// // - It is a more sophisticated structure
// // - Allows asynchronousy

// console.log('calculating...')

// // If .`then` and `.catch` are the same for all (multiple) `adderPromises`:

// const resolved = value => console.log(value)
// const error = err => console.log(err)

// // Equivalent:
// // function resolved(value) {
// //     console.log(value)
// // }

// adderPromise(10, 30).then(resolved).catch(error) // MUST be a global variable
// adderPromise(10, 'asdf').then(resolved).catch(error)
// adderPromise(50, 60).then(resolved).catch(error)
//     // 40
//     // 110
//     // Operands must be numbers.

// // Nested Promise Hell ⚠︎
// adderPromise(10, 20)
//     .then(value => {
//         adderPromise(value, 20)
//         .then(resolved)
//         .catch(error) // Forces synchronousy
//     })
//     .catch(error)

// // Solution:
// adderPromise(10, 20)
//     .then(value => adderPromise(value, 20)) // Create and return promise 2 asynchronously
//     .then(value => adderPromise(value, 50))
//     .then(resolved) // Resolved function ^
//     .catch(error) // catches all errors within scope