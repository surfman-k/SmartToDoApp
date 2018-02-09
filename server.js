"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const bcrypt 	  = require('bcrypt');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const todoListRoutes = require("./routes/todoList");
const categoryRoutes = require("./routes/category");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));


// Bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/todoList", todoListRoutes(knex));
app.use("/api/category", categoryRoutes(knex));
// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/reg", (req, res) => {
	let textpass = req.body.psw;
	let username = req.body.uname;
	let hashed = bcrypt.hashSync(textpass, 10);

	let insert1 = {name: username, password: hashed};

	knex.insert(insert1).into("users").then(function (id) {})
	.finally(function() {
	  knex.destroy();
	});

	res.redirect("/");
});

app.post("/login", (req, res) => {
	knex('users').where({name: req.body.uname}).select('password').then(function(id) {
		return id[0].password;
	})
	.then(function(pass){
		if(bcrypt.compareSync(req.body.psw, pass)){
			console.log('true');
		} else {
			console.log('nope');
		}
	});
	res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
