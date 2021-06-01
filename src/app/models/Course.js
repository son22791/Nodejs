const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Schema = mongoose.Schema;

const Course = new Schema({
  _id :{ type:Number, },
  name:{ type: String, required: true},
  description:{ type: String, maxLength: 600 },
  image:{ type: String },
  videoId:{ type: String },
  level:{ type: String, maxLength:255},
  slug:{ type: String, slug:'name', unique: true},
}, {
  _id :false,
  timestamps:true,
});
// Add plugins
mongoose.plugin(slug);
Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete ,{
  deletedAt : true,
  overrideMethods: 'all',
 });

module.exports =mongoose.model('Course',Course);