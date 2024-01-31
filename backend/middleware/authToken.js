const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = async (req, res, next) => {
    // console.log(req.body);
    const token = req.cookies.jwt;
    //console.log(req.cookies);
    if (!token) {
        res.status(401).json({ msg: "token not found" });
    }
    // console.log(process.env.ACCESS_TOKEN_SECRET);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        //console.log(err);
        if (err)
            return res.status(403).json({ msg: "Forbidden" });
        req.user = user;
        next();
    })
}

module.exports = authToken;

