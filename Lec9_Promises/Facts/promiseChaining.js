// To solve the problem of promise hell/ nested promises we use promise chaining 

// promisified function always gives you a pending promise
// initial state of a promise is pending
// pending promise can only be resolved into states => fullfull or rejected
// then and catch can only be called on pending promise or pending promise object
// then attaches a success callback function to the pending promise
// catch attaches a failure callback fun to the pending promise
// after calling then or catch, it returns a pending promise known as thenKaPromise
// sync function never returns pending promises 
// then and catch are async functions 

// chaining
const fs = require("fs")

let f1KaPromise = fs.promises.readFile("./f1.txt");
f1KaPromise.then(function(data)
{
    console.log(data + "");
    let f2KaPromise = fs.promises.readFile("./f2.txt");
    return f2KaPromise;
})
.then(function(data)
{  
    console.log(data + "");
    let f3KaPromise = fs.promises.readFile("./f3.txt");
    return f3KaPromise;
})
.then(function()
{
    console.log(data + "");
})