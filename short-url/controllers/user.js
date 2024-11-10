const User = require('../models/user');
const {v4: uuidv4} =require('uuid');
const {setUser} =require('../service/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect('/login'); // Redirect to login page or another page
}

async function handleUserlogin(req, res) {
    try {
        console.log("Incoming Cookies:", req.cookies);
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.render("login", {
                error: "Invalid Username or Password!",
            });
        }
       // // This is we used for statefull authetication
        // // Generate a new session ID for the user
        // const sessionId = uuidv4();
        // setUser(sessionId, user);

        // // Set the session ID in a cookie
        // res.cookie("uid", sessionId, { httpOnly: true });

        // // Redirect to a protected route after login

        // This is we used for stateless authetication
        const token = setUser(user);
        // res.cookie("uid", token, { httpOnly: true, sameSite: 'None', secure: true });
        // console.log("Set-Cookie Header:", res.getHeaders()['set-cookie']);
        res.json({token});
        return res.redirect('/');        
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
}

module.exports = {
    handleUserSignup,
    handleUserlogin,
};
