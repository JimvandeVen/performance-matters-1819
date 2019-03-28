exports.renderOffline = function (req, res) {
    res.render("pages/offline", {
        cssFilepath: res.locals.cssFilepath,
        jsFilepath: res.locals.jsFilepath
    });
}
