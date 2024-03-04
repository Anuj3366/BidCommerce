const mongoose = require('mongoose');

const ModeratorSchema = new mongoose.Schema({
  email: {type:String, required:true},
  password: {type:String, required:true},
  adhaar: {type:String, required:true},
  verified: {type:Boolean, required:true},
});

const Moderator = mongoose.model('Moderator', ModeratorSchema);

module.exports = Moderator;
