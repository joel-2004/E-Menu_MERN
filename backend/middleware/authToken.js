const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = async (req, res, next) => {
    try {
        // console.log(req.body);
        // console.log(req);
        console.log(req);
        const token = req.cookies.jwt;
        console.log(req.cookies);
        console.log(token);
        if (!token) {
            return res.status(401).json({ msg: "token not found" });
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
    catch (error) {
        res.status(500).json({ msg: "Internal error" });
    }
}

module.exports = authToken;

