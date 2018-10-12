const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SideStorySchema = new Schema({
  name: String,
  client: String,
  objective: String,
  locationId: String
})

module.exports = mongoose.model('SideStory', SideStorySchema)
