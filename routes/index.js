let express = require("express")
let router = express.Router()

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index", { title: "TourismsWeb App Lab 3" })
})

module.exports = router
