const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
var corsOptions = {
    origin: "*"
};


app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// use sync({ force: true }) for reset database, only in development
db.sequelize.sync().then(() => {
});

// import routes
require('./app/routes/user.route')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3888;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});