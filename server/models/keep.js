let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
import { models } from '../config/constants'

let schema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String },
  articleLink: { type: String },
  tags: { type: String },
  public: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  timesVaulted: { type: Number, default: 1 },
  // Relations
  userId: { type: ObjectId, ref: models.user.name, required: true },
})

module.exports = mongoose.model(models.keep.name, schema)