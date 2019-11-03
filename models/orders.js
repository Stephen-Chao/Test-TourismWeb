let mongoose = require("mongoose")

let OrderSchema = new mongoose.Schema({
  NumOfBooked:{type: Number, default: 0},
  Scheduler : String,
  PaymentMethod : String,
  Attraction : String,

},
{ collection: "Orders" })

module.exports = mongoose.model("Order", OrderSchema)