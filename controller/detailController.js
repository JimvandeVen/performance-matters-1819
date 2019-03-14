const express = require("express");
const fetch = require("node-fetch");
const {getDetailUrl} = require("../helpers/helpers")
const {error} = require("../controller/errorController")


exports.renderDetail = function (req, res){
  let url = getDetailUrl(req, res)
    console.log(req.params, "detailcontroller");
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
        error(res, result)
      }else {
        res.render("pages/detail", {
          data: data.cards[0]
        });
      }
    })
}
