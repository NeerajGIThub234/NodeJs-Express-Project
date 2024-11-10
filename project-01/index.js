const express = require("express");
//const users = require("./MOCK_DATA.json");
//const fs= require("fs");
const app = express();
const mongoose = require('mongoose');
//const os = require("os");

// MongoDB Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/youtube-app-1", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Mongo Error", err));

// Create Schema 
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Create Model
const User = mongoose.model("user", userSchema);

// Define PORT
const PORT = 8000;

// Route to Get All Users
app.get("/api/users", async (req, res) => {
    try {
        const allDbUsers = await User.find({});
        const html = `
        <ul>
            ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
        </ul>`;
        res.send(html);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Server Error: Unable to fetch users.");
    }
});

app.get("/users" ,async (req,res)=>{
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.post("/api/users", async (req, res) => {
    const body = req.body;
    
    // Correct the condition to check if any field is missing
    if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        console.log("All Fields Are Required!");
        return res.status(400).json({ msg: "All Fields Are Required!" });
    }

    try {
        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            jobTitle: body.job_title,
            gender: body.gender,
        });
        
        console.log(result);
        return res.status(201).json({ status: "Success" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ msg: "Server Error" });
    }
});
 app
    .route("/api/users/:id")
    .get(async(req, res) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({msg : "User Not Found!"})
        }
        return res.json(user)
    })
    .patch(async(req, res) => {
        await User.findByIdAndUpdate(req.params.id,{lastName: "Changed"}); //hardcode
        return res.json({ status: "Success" });
    })
  .delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
});


// Below api we create for json file 
// // for Server Side render only for browers
// app.get("/api/users", (req, res) => {
//     const html = `
//     <ul>${users.map((user) => `<li>${user.first_name}</li>`).join('')}
//     </ul>
//     `;
//     res.send(html);
// });


// //Middleware-plugin
// app.use(express.json()); // For parsing application/json
// app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// app.use((req,res, next)=>{
//     fs.appendFile("log.txt",
//         `\n${Date.now()}: ${req.ip} ${req.method} ${req.path}`,
//         (err,data)=>{
//             next();
//         }
//     );
// });
// // for Client Side rendering
// app.get("/users" , (req,res)=>{
//     console.log(req.headers);
//     res.setHeader("X-myheader","Neeraj Bhatt");
//     return res.json(users);
// });
// app
//     .route("/api/users/:id")
//     .get((req, res) => {
//         const id=Number(req.params.id);
//         const user= users.find((user)=> user.id == id);
//         if (!user) {
//             return res.status(404).json({msg : "User Not Found!"})
//         }
//         return res.json(user)
//     })
//     .patch((req, res) => {
//         const body = req.body;
//         const id = Number(req.params.id);
    
//         const userIndex = users.findIndex((user) => user.id === id);
    
//         if (userIndex === -1) {
//             return res.status(404).json({ status: "Error", message: "User not found" });
//         }
    
//         users[userIndex] = { ...users[userIndex], ...body };
    
//         fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
//             if (err) {
//                 return res.status(500).json({ status: "Error", message: "Failed to write to file" });
//             }
//             return res.json({ status: "Success", user: users[userIndex] });
//         });
//     })  
//   .delete((req, res) => {
//     const id = Number(req.params.id);
    
//     // Find the index of the user to delete
//     const userIndex = users.findIndex((user) => user.id === id);

//     if (userIndex === -1) {
//         // User not found
//         return res.status(404).json({ status: "Error", message: "User not found" });
//     }

//     // Remove the user from the array
//     users.splice(userIndex, 1);

//     // Write the updated users array to the file
//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
//         if (err) {
//             return res.status(500).json({ status: "Error", message: "Failed to write to file" });
//         }
//         return res.json({ status: "Success", message: "User deleted successfully" });
//     });
// });

// //Middleware-plugin
// app.use(express.urlencoded({extended: false}));

// app.use(express.json()); // For parsing application/json
// app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
// app.post("/api/users", (req, res) => {
//     const body = req.body;
//     if (!body || body.first_name || body.last_name || body.email || body.gender || body.job_title) {
//         return res.status(400).json({ msg : "All Fields Are required!"})
//     }
//     users.push({ id: users.length + 1, ...body });

//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
//         if (err) {
//             return res.status(500).json({ status: "Error", message: "Failed to write to file" });
//         }
//         return res.status(201).json({ status: "Success", id: users.length });
//     });
// });
// // Routes 

app.listen(PORT,()=> console.log(`Server started at  PORT: ${PORT}`));