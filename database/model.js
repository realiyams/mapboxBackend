const mongoose = require('./connection')

const buildingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  coordinate: [{ type: String, required: true }]
})

const building = mongoose.model('building', buildingSchema)

module.exports = {
  building,
}