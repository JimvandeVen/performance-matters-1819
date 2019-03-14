const express = require("express");
const bodyParser = require("body-parser");
const {error} = require("../controller/errorController")

exports.getListUrl = function (req, res) {
  const config = {
    endpoint: "https://api.magicthegathering.io/v1/cards",
    cmc: req.body.CMC ? req.body.CMC : "",
    rarity: req.body.rarity ? req.body.rarity : "",
    type: req.body.type ? req.body.type : "",
    colors: req.body.colors ? req.body.colors : ""
  };

  let url =  `${config.endpoint}?types=${config.type}&rarity=${config.rarity}&cmc=${config.cmc}&colors=${config.colors}`;
  console.log(url);

  return url
}

exports.getDetailUrl = function(req, res) {
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
    error(res, result)
    return;
  } else {
    return url
  }
}
