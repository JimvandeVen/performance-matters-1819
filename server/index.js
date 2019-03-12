"use strict";

const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("views", "view");
app.set("view engine", "ejs");

app.get("/", index);
app.post("/", list);
app.get("/:id", detailPage);

app.listen(8000);
console.log("Server is Listening on port 8000");

function index(req, res) {
  let result = {
    errors: [],
    data: undefined
  };
  res.render("pages/index.ejs", result);
}

function list(req, res) {
  const config = {
    endpoint: "https://api.magicthegathering.io/v1/cards",
    cmc: req.body.CMC ? req.body.CMC : "",
    rarity: req.body.rarity ? req.body.rarity : "",
    type: req.body.type ? req.body.type : "",
    colors: req.body.colors ? req.body.colors : ""
  };

  let url = `${config.endpoint}?types=${config.type}&rarity=${config.rarity}&cmc=${config.cmc}&colors=${config.colors}`;
  console.log(url);

  getData(url)

  function getData(url) {
    let result = fetch(url)
      .then(data => {
        return data.json();
      })
      .then(data => {
        res.render("pages/index", {
          data: data.cards
        });
      });

  }
}

function detailPage(req, res) {
  let multiverseid = req.params.id;
  let badRequest = isNaN(multiverseid);

  let url = `https://api.magicthegathering.io/v1/cards?multiverseid=${multiverseid}`

  if (badRequest) {
    let result = {
      errors: [
        {
          id: 400,
          title: "Bad Request",
          detail: "Bad Request"
        }
      ]
    };
    res.render("pages/error", Object.assign({}, result));
    return;
  } else {
    apiCall(url)
    function apiCall(url){
      let result = fetch(url)
        .then(data =>{
          return data.json()
        })
        .then(data =>{
          console.log(data.cards);
          res.render("pages/detail", {
            data: data.cards[0]
          });
        })
    }
  }
}
