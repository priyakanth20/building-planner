const mongoose = require('mongoose');

const shapeSchema = new mongoose.Schema({
    type: String,
    coords: Array,
    annotation: String
});

const Drawing = mongoose.model('drawing', {
    shapes: [shapeSchema]
});

module.exports = Drawing;
