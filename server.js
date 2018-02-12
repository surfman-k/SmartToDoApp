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
const jwt		  = require('jsonwebtoken');
const APIClinet   = require('omdb-api-client');
const amazon      = require('amazon-product-api');

const GooglePlacesPromises = require('googleplaces-promises');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const todoListRoutes = require("./routes/todoList");
const categoryRoutes = require("./routes/category");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

let omdb = new APIClinet();

let client = amazon.createClient({
  awsId: process.env.awsId,
  awsSecret: process.env.awsSecret,
  awsTag: "todo04c-20"
});

let placesPromises = new GooglePlacesPromises(process.env.googleAPIkey);


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

//Registration functionality
app.post("/reg", (data, res) => {
	let textpass = data.body.psw;
	let username = data.body.uname;
	let hashed = bcrypt.hashSync(textpass, 10);

	let insert1 = {name: username, password: hashed};

	knex.insert(insert1)
	.returning('id')
	.into('users')
	.then(function (id) {
		let payload = {user : data.body.uname};
		jwt.sign(payload, process.env.secretKEY, function(err, token) {
  			console.log(token);
  			res.status(201).send(id);
		});
	})
	.catch(function(error) {
  		console.error(error);
	});

});

//Login functionality
app.post("/login", (data, res) => {

	knex('users').where({name: data.body.uname}).select('*').then(function(id) {
		return {id: id[0].id, name: id[0].name, psw: id[0].password};
	})
	.then(function(pass){
		if(bcrypt.compareSync(data.body.psw, pass.psw)){
			let payload = {user : pass.name};
			console.log(payload);
			jwt.sign(payload, process.env.secretKEY, function(err, token) {
  				console.log(token);
  				res.status(201).send({id: pass.id, token: token});
			});
		} else {
			res.status(201).send('password wrong!');
		}
	})
	.catch(function(error) {
		res.status(201).send('password wrong!');
	});
});

//Editing a ToDo
app.post("/editToDo", (data, res) => {
  let changes = {id: data.body.id, category: data.body.category, comment: data.body.comment};
  knex("todolist").where("id", data.body.id)
    .update(changes)
    .then(function (error) {
      console.error(error);
    }); res.redirect("/");
});


//Creating a new ToDo
app.post("/newToDo", (data, res) => {

	let input = data.body.name;
	let flag = 1;


		placesPromises.placeSearch({keyword: input, type: ['food'], location: [45.4961,-73.5693], radius: "5000"}).then(function(response){
        	if(response.results.length > 0){

        	if(flag === 1){
				let insert1 = {name: data.body.name, user: data.body.user, category: 3, createdOn: data.body.createdOn, comment: data.body.comment, checked: false };
				flag = 5;
				knex.insert(insert1).into("todolist").then(function (id) {})
				.catch(function(error) {
			  		console.error(error.detail);
				}).then(function(){});
				res.redirect('/');
				}

        		}
    		}).then( function () {
		omdb({t: input, apikey: process.env.omdbAPI}).list().then(function(movie) {
			if(movie.imdbRating > 6){
				flag = 5;
				let insert1 = {name: data.body.name, user: data.body.user, category: 1, createdOn: data.body.createdOn, comment: data.body.comment, checked: false };

				knex.insert(insert1).into("todolist").then(function (id) {})
				.catch(function(error) {
			  		console.error(error.detail);
				})
				.then(function(){});
				res.redirect('/');
			}
		})
		}).then( function () {
    	client.itemSearch({Keywords: input}).then(function(results){
		  	if(results[0].ItemAttributes[0].ProductGroup[0] == 'Book'){

		  	if(flag === 1){
				let insert1 = {name: data.body.name, user: data.body.user, category: 2, createdOn: data.body.createdOn, comment: data.body.comment, checked: false };
				flag = 5;
				knex.insert(insert1).into("todolist").then(function (id) {})
				.catch(function(error) {
			  		console.error(error.detail);
				})
				.then(function(){});
				res.redirect('/');
				}
			}
		})
		}).then( function(){
		client.itemSearch({Keywords: input}).then(function(results){
		  	if(results[0].ItemAttributes[0].ProductGroup[0] != 'Book'){

		  	if(flag === 1){
				let insert1 = {name: data.body.name, user: data.body.user, category: 4, createdOn: data.body.createdOn, comment: data.body.comment, checked: false };

				knex.insert(insert1).into("todolist").then(function (id) {})
				.catch(function(error) {
			  		console.error(error.detail);
				})
				.then(function(){});
				res.redirect('/');
				}
			}
			}).catch(function(err){
				console.log(err.Error);
			})})
		.catch(function(err) {
		    console.log(err);
		});

});

//Deleting a todo
app.post("/delete", (data, res) => {
  let deletionId = {id: data.body.id};
  knex("todolist").where("id", data.body.id)
    .del()
    .then(function (error) {
      console.error(error);
    }); res.redirect("/");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
