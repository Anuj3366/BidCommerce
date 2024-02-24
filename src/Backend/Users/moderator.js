const ModeratorSchema = new mongoose.Schema({
  email: String,
  sellerToVerify: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seller" }],
  workerToVerify: [{ type: mongoose.Schema.Types.ObjectId, ref: "Worker" }],
});
const Moderator = mongoose.model('Moderator', ModeratorSchema);