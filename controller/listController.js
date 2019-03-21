const fetch = require("node-fetch");
const {getListUrl} = require("../helpers/helpers")
const {error} = require("../controller/errorController")


exports.renderList = function (req, res) {
  let url = getListUrl(req, res)
  console.log(url, "listcontroller");

  let result = fetch(url)
    .then(data => {
      console.log(data);
      return data.json();
    })
    .then(data => {
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
        error(res, result);
      } else {
        res.render("pages/list", {
          data: data.cards,
          cssFilepath: res.locals.cssFilepath,
          jsFilepath: res.locals.jsFilepath
        });
      }
    });
}
