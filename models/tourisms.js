let mongoose = require('mongoose');

let TourismSchema = new mongoose.Schema({
        attractionsname: String,
        ticketprice: Number,
        remaintickets: {type: Number, default: 0}
    },
    { collection: 'Attractions' });

module.exports = mongoose.model('Tourism', TourismSchema);