// This is we used for statefull authetication
// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//     console.log(`Setting user with ID: ${id}`);
//     sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//     const user = sessionIdToUserMap.get(id);
//     console.log(`Getting user with ID: ${id}`, user);
//     return user;
// }

// module.exports = {
//     setUser,
//     getUser,
// };

// This is we used for stateless authetication
const jwt = require("jsonwebtoken");
const secret = "Neeraj$1213@$";

// Generate a JWT token for the user
function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
        },
        secret,
    );
}

// Extract and verify the JWT token from the cookies
function getUser(req) {
    if (!req.cookies || !req.cookies.uid) {
        console.log("No token found in cookies");
        return null;
    }
    const token = req.cookies.uid;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error("JWT verification error:", err.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
};