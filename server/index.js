"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const router = require("../router/router")
const app = express();

app.set("views", "public/view");
app.set("view engine", "ejs");

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", router)



app.listen(8000);
console.log("Server is Listening on port 8000");
