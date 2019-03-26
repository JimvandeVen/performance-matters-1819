const fetch = require("node-fetch");
const { error } = require("../controller/errorController")

exports.renderIndex = function (req, res) {
  let url = "https://api.magicthegathering.io/v1/cards?"
  let result = fetch(url)
    .then(data => {
      return data.json();
    })
    .then(data => {
      if (data.cards.length == 0) {
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
        res.render("pages/index", {
          data: data.cards,
          cssFilepath: res.locals.cssFilepath,
          jsFilepath: res.locals.jsFilepath
        });
      }
    });
}
