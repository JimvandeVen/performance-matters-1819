const express = require("express");
const router = express.Router();
const { renderIndex } = require("../controller/indexController")
const { renderList } = require("../controller/listController")
const { renderDetail } = require("../controller/detailController")
// const { renderOffline } = require("../controller/offlineController")

router.get("/", renderIndex);
router.post("/", renderList);
router.get("/:id", renderDetail);

module.exports = router;
