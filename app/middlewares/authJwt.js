const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};
checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email_address: req.body.email_address
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
    });
}

const authJwt = {
    checkDuplicateEmail: checkDuplicateEmail,
    verifyToken: verifyToken,
};
module.exports = authJwt;