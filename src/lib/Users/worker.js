const WorkerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  adhaar: String,
  ordersDevlivered:Object,
  totalDelivered: Number,
  employTiming: String,
  monthlyEarning: Number,
});
const Worker = mongoose.model('Worker', WorkerSchema);
