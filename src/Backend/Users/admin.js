const AdminSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  moderaters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Moderator" }],
});
const Admin = mongoose.model('Admin', AdminSchema);