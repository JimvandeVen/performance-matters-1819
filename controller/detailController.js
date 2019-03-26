const fetch = require("node-fetch");
const { getDetailUrl } = require("../helpers/helpers")
const { error } = require("../controller/errorController")


exports.renderDetail = function (req, res) {
  let url = getDetailUrl(req, res)
  let result = fetch(url)
    .then(data => {
      return data.json()
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
        error(res, result)
      } else {
        res.render("pages/detail", {
          data: data.cards[0],
          cssFilepath: res.locals.cssFilepath,
          jsFilepath: res.locals.jsFilepath
        });
      }
    })
}
