const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const jwt = require('jsonwebtoken');
const secretKey = 'Neeraj$1213@$';
const { restrictTo} = require("../middlewares/auth");

router.get("/",restrictTo(["NORMAL"]), async(req, res) => {
    const allUrls =await URL.find({createdBy: req.user._id});
    return res.render("home",{
        urls : allUrls,
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    console.log('Rendering login page');
    return res.render("login");
});


// Assume this function finds and authenticates a user
const authenticateUser = async (email, password) => {
  // Your authentication logic here
  // Return user object if authentication is successful
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await authenticateUser(email, password);
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    // Generate a new token
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email
      },
      secretKey,
      { expiresIn: '1h' } // Token expiry time
    );

    // Set the token as a cookie
    res.cookie('uid', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax'
    });

    res.redirect('/'); // Redirect to the desired page after login

  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/refresh-token', (req, res) => {
    const { refreshToken } = req.body;
  
    if (!refreshToken) {
      return res.status(403).send('Refresh token is required.');
    }
  
    jwt.verify(refreshToken, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid refresh token.');
      }
  
      // Generate a new access token
      const newAccessToken = jwt.sign(
        {
          _id: decoded._id,
          email: decoded.email
        },
        secretKey,
        { expiresIn: '1h' }
      );
  
      res.cookie('uid', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
      });
  
      res.send('New access token issued.');
    });
  });
  

module.exports = router;