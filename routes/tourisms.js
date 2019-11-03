/*eslint no-console: "off" */
let Tourism = require("../models/tourisms")
let express = require("express")
let router = express.Router()
let mongoose = require("mongoose")
//let uriUtil = require("mongodb-uri")

let mongodbUri ="mongodb+srv://PengyuZhao:980628@attractions-5clzp.mongodb.net/Tourismsdb?retryWrites=true&w=majority"

mongoose.connect(mongodbUri)

//mongoose.connect('mongodb://localhost:27017/donationsdb');

let db = mongoose.connection

db.on("error", function (err) {
  console.log("Unable to Connect to Attractions", err)
})

db.once("open", function () {
  console.log("Successfully Connected to Attractions on atlas.com")
})

router.findAll = (req, res) => {
  // Return a JSON representation of our list
  res.setHeader("Content-Type", "application/json")

  Tourism.find(function(err, tourisms) {
    if (err)
      res.send(err)

    res.send(JSON.stringify(tourisms,null,5))
  })
}

router.findOne = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  Tourism.find({ "_id" : req.params.id },function(err, tourism) {
    if (err)
      res.json({ message: "Attraction NOT Found!", errmsg : err } )
    else
      res.send(JSON.stringify(tourism,null,5))
  })
}


router.addAttraction  = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  let tourism = new Tourism()

  tourism.attractionsname = req.body.attractionsname
  tourism.ticketprice = req.body.ticketprice
  tourism.remaintickets = req.body.remaintickets

  tourism.save(function(err) {
    if (err)
      res.json({ message: "Attraction NOT Added!", errmsg : err } )
    else
      res.json({ message: "Attraction Successfully Added!", data: tourism })
  })
}


router.incrementremaintickets = (req, res) => {

  Tourism.findById(req.params.id, function(err,tourism) {
    if (err)
      res.json({ message: "Attraction NOT Found!", errmsg : err } )
    else {
      tourism.remaintickets += 1
      tourism.save(function (err) {
        if (err)
          res.json({ message: "Remaintickets NOT Increase!", errmsg : err } )
        else
          res.json({ message: "Remaintickets Successfully Increase!", data: tourism })
      })
    }
  })
}
router.decreaseremaintickets = (req, res) => {

  Tourism.findById(req.params.id, function(err,tourism) {
    if (err)
      res.json({ message: "Attraction NOT Found!", errmsg : err } )
    else {
      tourism.remaintickets += -1
      tourism.save(function (err) {
        if (err)
          res.json({ message: "Remaintickets NOT Decrease!", errmsg : err } )
        else
          res.json({ message: "Remaintickets Successfully Decrease!", data: tourism })
      })
    }
  })
}

router.deleteAttraction = (req, res) => {

  Tourism.findByIdAndRemove(req.params.id, function(err) {
    if (err)
      res.json({ message: "Attraction NOT DELETED!", errmsg : err } )
    else
      res.json({ message: "Attraction Successfully Deleted!"})
  })
}



module.exports = router