const express = require("express");

exports.error = function(res, result){
  res.render("pages/error", Object.assign({}, result))
}
