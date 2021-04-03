// Create custom promises

const fs = require("fs");

function myPromisifiedFun(filepath)
{
    return new Promise(function(resolve, reject)
    {
        fs.readFile(filepath, function(error, data){
            
            // if got error, or file data failed
            if(error)
            {
                reject(error); // it will invoke failure callback(fcb);
            }

            // if got data
            else
            {
                resolve(data); // it will invoke success callback(scb)
            }

        })
    })
}

let pendingPromise = myPromisifiedFun("./f1.txt");

pendingPromise.then(function(data)
{
    console.log(data + "");
})

pendingPromise.catch(function(error)
{
    console.log(error)
})


