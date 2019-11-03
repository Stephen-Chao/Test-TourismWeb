let Order= require("../models/orders")
let express = require("express")
let router = express.Router()
let mongoose = require("mongoose")
//let uriUtil = require("mongodb-uri")

var mongodbUri ="mongodb+srv://PengyuZhao:980628@attractions-5clzp.mongodb.net/Tourismsdb?retryWrites=true&w=majority"

mongoose.connect(mongodbUri)

//mongoose.connect('mongodb://localhost:27017/donationsdb');

let db = mongoose.connection

db.on("error", function (err) {
  console.log("Unable to Connect to Orders", err)
})

db.once("open", function () {
  console.log("Successfully Connected to Orders on atlas.com")
})

router.findAll = (req, res) => {
  // Return a JSON representation of our list
  res.setHeader("Content-Type", "application/json")

  Order.find(function(err, orders) {
    if (err)
      res.send(err)

    res.send(JSON.stringify(orders,null,5))
  })
}

router.findOne = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  Order.find({ "_id" : req.params.id },function(err, order) {
    if (err)
      res.json({ message: "Order NOT Found!", errmsg : err } )
    else
      res.send(JSON.stringify(order,null,5))
  })
}
router.deleteOrder = (req, res) => {

  Order.findByIdAndRemove(req.params.id, function(err) {
    if (err)
      res.json({ message: "Order NOT DELETED!", errmsg : err } )
    else
      res.json({ message: "Order Successfully Deleted!"})
  })
}
router.addOrder = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  var order = new Order()

  order.NumOfBooked = req.body.NumOfBooked
  order.Scheduler = req.body.Scheduler
  order.PaymentMethod = req.body.PaymentMethod
  order.Attraction = req.body.Attraction

  order.save(function(err) {
    if (err)
      res.json({ message: "Order NOT Added!", errmsg : err } )
    else
      res.json({ message: "Order Successfully Added!", data: order })
  })
}
router.incrementNumOfBooked = (req, res) => {

  Order.findById(req.params.id, function(err,order) {
    if (err)
      res.json({ message: "Order NOT Found!", errmsg : err } )
    else {
      order.NumOfBooked += 1
      order.save(function (err) {
        if (err)
          res.json({ message: "NumOfBooked NOT Increase!", errmsg : err } )
        else
          res.json({ message: "NumOfBooked Successfully Increase!", data: order })
      })
    }
  })
}
router.decreaseNumOfBooked = (req, res) => {

  Order.findById(req.params.id, function(err,order) {
    if (err)
      res.json({ message: "Order NOT Found!", errmsg : err } )
    else {
      order.NumOfBooked += -1
      order.save(function (err) {
        if (err)
          res.json({ message: "NumOfBooked NOT Decrease!", errmsg : err } )
        else
          res.json({ message: "NumOfBooked Successfully Decrease!", data: order })
      })
    }
  })
}


module.exports = router