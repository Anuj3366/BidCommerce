const ModeratorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  sellerToVerify: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seller" }],
  workerToVerify: [{ type: mongoose.Schema.Types.ObjectId, ref: "Worker" }],
});
const Moderator = mongoose.model('Moderator', ModeratorSchema);