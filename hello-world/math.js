function add(a,b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

// this approch only work when there is one function
// module.exports = add;
// module.exports = sub; 

// below both are correct 
module.exports = {
    add,
    sub,
}

// module.exports = {  // is we used this then we console.log('Math Value is', math.addFn(2,4)) or console.log('Math Value is', math.subFn(4,2))
//     addFn : add,
//     subFn: sub,
// }

// use this two line to not use the avbove code but recommended to use above
// exports.add = (a,b) => a+b;
// exports.sub = (a,b) => a-b;
