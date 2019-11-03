let Order= require("../models/orders")
let express = require("express")
let router = express.Router()
let mongoose = require("mongoose")
//let uriUtil = require("mongodb-uri")

var mongodbUri ="mongodb+srv://PengyuZhao:980628@attractions-5clzp.mongodb.net/Tourismsdb?retryWrites=true&w=majority"

mongoose.connect(mongodbUri)


//let db = mongoose.connection;


router.findOneWithPart = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  var reg = new RegExp(req.body.Scheduler, "i")

  Order.find({Scheduler: {$regex: reg}}, function (err, order) {
    if (err)
      res.json({message: "Order NOT Found!", errmsg: err})
    else
      res.send(JSON.stringify(order, null, 5))
  })
}
module.exports = router