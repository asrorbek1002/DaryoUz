// Requirement
const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const path = require('path');
const cors = require("cors");
const ejsLayout = require('express-ejs-layouts');
const mongoose = require("mongoose")
const expressSession = require('express-session')
const mongoDbSession = require('connect-mongodb-session')(expressSession);
const constant = require("./server/utils/constant");

// Middlewares
app.use(ejsLayout);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, './server/public')));
app.set("views", path.join(__dirname, "./client"))
app.set("view engine", "ejs");
app.use(cors({ origin: '*' }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(expressSession({
    name: "my-session",
    secret: constant.sessionKeyword,
    saveUninitialized: true,
    store: new mongoDbSession({
        uri: constant.mongo,
        collection: "session"
    }),
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: constant.sessionTime,
        sameSite: "strict"
    }
}))

// Server | Database connections
const connection = async () => {
    try {
        const server = app.listen(constant.server, () => {
            console.log("Server is running ", server.address().port)
        })
        mongoose.connect(constant.mongo);
        console.log("Database is running")
    }
    catch (error) {
        console.log(error.message)
    }
}
connection()



// Server Router
app.use(require("./server/router/UserRouter"))