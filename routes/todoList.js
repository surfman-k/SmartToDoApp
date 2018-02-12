"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("todolist")
      .orderBy("id", "ASC")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
