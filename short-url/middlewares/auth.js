const {getUser} =require('../service/auth');

//for statefull
// function restrictToLoggedinUserOnly(req, res, next) {
//     const user = getUser(req);
//     if (!user) {
//         res.clearCookie('uid');
//         return res.redirect('/login');
//     }
//     req.user = user;  // Attach the user to the request object if you need to use it later
//     next();
// }

//module.exports = { restrictToLoggedinUserOnly };

// // Stateless
// async function restrictToLoggedinUserOnly(req, res, next) {
//     const userUid = req.headers['authorization'];

//     console.log('Authorization header:', userUid);

//     if (!userUid) {
//         return res.redirect("/login");
//     }
    
//     if (!userUid.startsWith('Bearer ')) {
//         console.log('Invalid Authorization format');
//         return res.redirect("/login");
//     }
    
//     const token = userUid.split('Bearer ')[1];   // Extract the token
//     console.log('Extracted Token:', token);

//     try {
//         const user = await getUser(token);  // Assuming getUser is async
//         console.log('Retrieved user:', user);

//         if (!user) {
//             return res.redirect("/login");
//         }

//         req.user = user;
//         next();
//     } catch (err) {
//         console.error('Error fetching user:', err);
//         res.redirect("/login");
//     }
// }

// // Stateless
// function checkAuth(req, res, next) {
//     console.log(req.headers);
//     const userUid = req.headers['authorization'];

//     if (!userUid) {
//         return res.status(401).send('Unauthorized');
//     }
   
    
//     const token = userUid.split('Bearer ')[1];   // Extract the token
//     console.log("Token:", token);
//     const user = getUser(token);  // Assuming getUser is sync
//     req.user = user;
//     next();
// }

// module.exports = {
//     restrictToLoggedinUserOnly,
//     checkAuth,
// };

function checkForAuthentication(req, res, next) {
    const userUid = req.headers['authorization'];
    req.user = null;
    if (!authorizationHeaderValue|| !authorizationHeaderValue.startsWith("Bearer")) {
        return next();
    }
    const token =authorizationHeaderValue.split('Bearer ')[1]; 
    const user = getUser(token);
    req.user = user;
    next();
    
}

function restrictTo(roles=[]){
    return function(req, res, next) {
        if (!req.user) {
            return res.redirect("/login");
        }
        if (!roles.includes(req.user.role)) {
            return res.end("Unauthorized");
        }
        return next();
    };
};

module.exports = {
    // restrictToLoggedinUserOnly,
    // checkAuth,
    checkForAuthentication,
    restrictTo,
};
