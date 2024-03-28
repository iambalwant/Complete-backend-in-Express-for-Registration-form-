
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.authorization || req.headers.Authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }

        token = authHeader.split(" ")[1];

        if (!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            console.log(decoded);
            req.user = decoded.user;
            next(); // It will run or execute the code after all the middleware function is finished
        });
    } catch (error) {
        next(error); // Pass the error to Express error handling middleware
    }
});

module.exports = validateToken;