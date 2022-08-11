const db = require("../models");
const config = require("../configs/auth.config");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.CreateUser = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email_address: req.body.email_address,
        password: bcrypt.hashSync(req.body.password, 12),
    })
        .then(user => {
            res.status(200).send({ user });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.Signin = (req, res) => {
    User.findOne({
        where: {
            email_address: req.body.email_address
        },
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "account Not found." });
            }
            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).send({
                id: user.id,
                username: user.username,
                email_address: user.email_address,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
//GET all Users
exports.FindAll = (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
    })
        .then(user => {
            res.status(200).json({
                user
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

//GET one User
exports.FindOne = (req, res) => {
    User.findOne({
        where: {
            id: req.body.id,
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'password']
        },
    })
        .then(user => {
            res.status(200).json({
                user
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

//Delete User
exports.Destroyed = (req, res) => {
    User.destroy({
        where: {
            id: req.body.id
        }
    }).then(user => {
        res.status(200).send({ message: "Delete Successfully" });

    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}