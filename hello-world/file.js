const fs= require("fs");
const os= require("os");
// Synchonous function to create file and sync always return somethimg 
//fs.writeFileSync("./test.txt","Hey! I am Neeraj Bhatt.") // Blocking Opertions

// if we execute it first time then it also create the test file now bcz we execute it second time it will override previos file data with same name and extention Asynchoprnous used callback function for error  not return anything
//fs.writeFile("./test.txt","Hey! I am Neeraj Bhatt.I am a Sofware Developer.", (err)=>{}) // Non blocking Opertions

//const result = fs.readFileSync("./test.txt","utf-8") //utf-8 was encoding to read file we used different encoding accordng to diffrent file 
//console.log(result)

//const result = fs.readFile("./test.txt","utf-8") // throw error

//Asyn.. used call back for errors
// fs.readFile("./test.txt","utf-8",(err, result)=>{
//     if (err) {
//         console.log(err)
//     }else {
//         console.log("Asyn",result)
//     }
// });

// to add more data in file below function add today date and String that we give if we run multiple time its add the multiplwe time with line break
//fs.appendFileSync("./test.txt",`${Date.now()} Today is Friday\n`);

// to create the same file like test.txt
//fs.cpSync("./test.txt","./copy.txt");

// delete the file
//fs.unlinkSync("./copy.txt");

// it will create folder inside folder my-docs - a - b
//fs.mkdirSync("my-docs/a/b",{recursive:true});

// to create single folder
//fs.mkdirSync("file")


// To Understand Blocking & Non Blcking opertions
// Blocking Opertions

// console.log(1);
// // All threads are free // result are in line 
// const result = fs.readFileSync("./test.txt","utf-8")  // Thread are acqyuired and blocked the task  so when this task happen other things can not happen
// console.log(result);
// console.log(2)

//Asyn.. Non blockimg reuqest it was not block the thread so when the reading file task in process it do all the other task so result come- 1 2 3 then file data 
// console.log(1)
// fs.readFile("./test.txt","utf-8",(err, result)=>{
//     if (err) {
//         console.log(err)
//     }else {
//         console.log("Asyn",result)
//     }
// });

// console.log(2);
// console.log(3);

// Give cpu Lenght
console.log(os.cpus().length);