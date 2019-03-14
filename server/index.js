"use strict";

const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.set("views", "view");
app.set("view engine", "ejs");

app.get("/", list);
app.post("/", list);
app.get("/:id", detailPage);

app.listen(8000);
console.log("Server is Listening on port 8000");

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

  getData(req, res, url)
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
          if (data.cards.length == 0){
            let result = {
              errors: [
                {
                  id: 404,
                  title: "Not Found",
                  detail: "Not Found"
                }
              ]
            };
            res.render("pages/error", Object.assign({}, result));
          }else {
            res.render("pages/detail", {
              data: data.cards[0]
            });
          }
        })
    }
  }
}

function getData(req, res, url) {

  let result = fetch(url)
    .then(data => {
      return data.json();
    })
    .then(data => {
      console.log(data);
      if (data.cards.length == 0){
        let result = {
          errors: [
            {
              id: 404,
              title: "Not Found",
              detail: "Not Found"
            }
          ]
        };
        res.render("pages/error", Object.assign({}, result));
      } else {
        res.render("pages/index", {
          data: data.cards
        });
      }
    });
}
