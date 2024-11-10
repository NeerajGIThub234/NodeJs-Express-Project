const math = require("./math") // './' is used to import the math from current working directory if we don't use this then this search math from js functionality and when not found give error and we can call this way-console.log('Math Value is', math.sub(4,2))

//const { add , sub } = require("./math")  // we can call if we use this -console.log('Math Value is', add(2,4))

console.log('Hey I am Neeraj!')
// we run both the below line on chorme without getting error
//console.log(window)  //ReferenceError: window is not defined
// console.log(alert('alert Msg')) // ReferenceError: alert is not defined 


console.log('Math Value is', math.add(2,4))
console.log('Math Value is', math.sub(4,2))