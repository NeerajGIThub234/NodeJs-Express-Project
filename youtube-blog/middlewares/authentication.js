const { validateToken }= require("../services/authentication");

function checkForAuthenticationCookie(req,res) {
    return (req,res,next)=>{
        const cookieName = 'token';
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue)  return next();
        try {
            const userPayload= validateToken(tokenCookieValue);
            req.user = userPayload
        } catch (error) {
            
        }
        return next();
    };
};

module.exports={
    checkForAuthenticationCookie,
}