const WorkerSchema = new mongoose.Schema({
  email: String,
  adhaar: String,
  ordersDevlivered:Object,
  totalDelivered: Number,
  employTiming: String,
  monthlyEarning: Number,
});
const Worker = mongoose.model('Worker', WorkerSchema);
