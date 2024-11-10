//const http = require("http");
const express = require("express")
// const fs = require("fs")
//const url = require("url")
// const myServer = http.createServer((req,res)=> {
//     console.log("New Req Rec.");
//    // console.log(req.headers); // written reuqest header info
//  //  console.log(req); // wrriten whole request details
//     res.end("Hello From Server");
// });

// AFTER USING EXPRESS NODEJS WE CAN NOT USE THIS MUCH OF HANDLING FUNCTIONS
// const myServer = http.createServer((req,res)=> {
//     if (req.url=="/favicon.ico") return res.end;
//     const log=`${Date.now()}: ${req.method} ${req.url} New Request Recevied\n`
//     const myUrl = url.parse(req.url, true);
//     console.log(myUrl);
//     fs.appendFile("log.txt",log, (err,data)=>{
//         switch (myUrl.pathname){
//             case "/":
//                 if(req.method == "GET")  res.end("HOME PAGE");
//             break;
//             case "/about":
//                 const username = myUrl.query.myname;
//                 res.end(`Hi ,${username}`)
//             break;
//             case "/search":
//                 const search = myUrl.query.search_query;
//                 res.end("Here are Your result for " +search);
//                 res.end(`Hi ,${username}`)
//             break;
//             default:  res.end("404 NOT FOUND");
//         }
//     })
// });
// const myServer = http.createServer(app);
// // we can use any port no and call back are optional in it
// myServer.listen(8001,()=>console.log("Server Started"));

//we can short abouve function using nodejs
const app=express();

app.get("/", (req,res)=>{
    return res.send("HELLO FROM HOME PAGE");
});

app.get("/about", (req,res)=>{
    return res.send("HELLO FROM ABOUT PAGE. "+"HEY "+ req.query.name + " MY AGE IS "+ req.query.age+ ` YOU ARE LOOKING GOOD  ${req.query.name}`);
});

app.listen(8001,()=>console.log("Server Started"));

