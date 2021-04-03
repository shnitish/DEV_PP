// Async Keyword

// Async keyword => It can make any function asynchornous and returns a pending promise
// Await keyword => It can be only used inside async functions

// Async function => No stack is blocked in the async functions, they are handled by node API's 

// Sync functions => they block stack

function sayHello(){
    console.log("fun say Hii !!!");
}

sayHello();



// async functions => they dont block stack , they are handled by node APIS
async function callMe(){
    console.log("I am a async functions !!!");
}
callMe();