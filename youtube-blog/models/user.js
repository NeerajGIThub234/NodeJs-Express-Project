const{ Schema, model}= require("mongoose");
const {createHmac,randomBytes}= require('crypto');
const { createTokenForUser } = require("../services/authentication");
const userSchema= new Schema(
    {
        fullName:{
            type : String,
            required : true,
        },
        email:{
            type : String,
            required : true,
            unique : true,
        },
        salt:{
            type : String,
        },
        password:{
            type : String,
            required : true,
        },
        profileImageURL:{
            type : String,
            default :"/images/default.png",
        },
        role:{
            type : String,
            enum :["USER","ADMIN"],
            default :"USER",
        },
    },
    {timestamps:true}
);

// to encryot the password
userSchema.pre("save", function (next) {
    const user =this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword=createHmac("sha256", salt).update(user.password).digest("hex");

    this.salt=salt;
    this.password = hashedPassword;

    next();
});

// to match password 
userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User Not Found!');

    const userProvidedHash = createHmac("sha256", user.salt)
        .update(password)
        .digest("hex");

    if (user.password !== userProvidedHash) throw new Error('Incorrect Password!');
    
    const token = createTokenForUser(user);
    return token;
});

const User = model("user",userSchema);
module.exports = User;