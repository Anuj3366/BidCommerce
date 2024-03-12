const mongoose = require('mongoose');
const WorkerSchema = new mongoose.Schema({
  email: {type:String, required:true},
  password: {type:String, required:true},
  adhaar: {type:String, required:true},
  verified: {type:Boolean, required:true},
});
const Worker = mongoose.model('Worker', WorkerSchema);

module.exports = Worker;