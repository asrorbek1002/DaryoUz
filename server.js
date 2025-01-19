// Requirement
const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const path = require('path');
const cors = require("cors");
const ejsLayout = require('express-ejs-layouts');
const { Pool } = require('pg');
const expressSession = require('express-session');
const constant = require("./server/utils/constant");
const connect = require("./server/utils/DatabaseConnect");
const create_table = require("./server/utils/create_table");

// Middlewares
app.use(ejsLayout);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, './server/public')));
app.set("views", path.join(__dirname, "./client"));
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
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: constant.sessionTime,
        sameSite: "strict"
    }
}));

// Server | Database connections
const connection = async () => {
    try {
        const server = app.listen(constant.server, () => {
            console.log("Server is running ", server.address().port);
        });

        const client = await connect.connect(); 
        console.log('PostgreSQL serveriga ulanish muvaffaqiyatli!');
        client.release(); 
    } catch (error) {
        console.log(error.message);
    }
};
connection();
create_table()

// Server Router
app.use(require("./server/router/UserRouter"));
app.use(require("./server/router/CategoryRouter"));
