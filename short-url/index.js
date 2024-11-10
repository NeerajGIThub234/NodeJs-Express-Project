const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const {connectToMongoDB} = require("./connect");
const { checkForAuthentication,restrictTo,} = require("./middlewares/auth");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app= express();
const PORT =8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("MongoDB connected!"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use( checkForAuthentication);
app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);



app.use((req, res, next) => {
    console.log("Request Cookies:", req.cookies);
    next();
});
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true } // This option returns the updated document
        );

        if (!entry) {
            return res.status(404).send('Short URL not found');
        }

        res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error('Error fetching or updating URL:', error);
        res.status(500).send('Server error occurred');
    }
});


app.listen(PORT,()=> console.log(`Server started at ${PORT}`));