require('dotenv').config();

const path = require("path");
const express= require("express");
const userRoute= require("./routes/user");
const blogRoute= require("./routes/blog");
const mongoose= require("mongoose");
const cookieParser= require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const app= express();
//const PORT= 8000;
// To Deploy Our Project on Aws
const PORT=process.env.PORT|| 8001;
const Blog = require("./models/blog");

// to ren on local server-// .connect("mongodb://localhost:27017/blogify")
mongoose
   .connect(process.env.MONGO_URL)
    .then((e)=>console.log("MongoDb Connected"))

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/",async(req,res)=>{
    const allBlogs = await Blog.find({});
    return res.render("home",{
        blogs: allBlogs,
        user :req.user,
    });
})

app.use("/user",userRoute);
app.use("/blog",blogRoute);

app.listen(PORT,()=> console.log(`Server started at PORT ${PORT}`));