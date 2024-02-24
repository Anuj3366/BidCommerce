const AdminSchema = new mongoose.Schema({
  email: String,
  moderaters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Moderator" }],
  featureProductId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});
const Admin = mongoose.model('Admin', AdminSchema);