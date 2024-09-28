import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
 username: {
  type: String,
  required: true,
 },
 email: {
  type: String,
  required: true,
 },
 password: {
  type: String,
  required: true,
 },
 role: {
  type: String,
  default: "user",
 },
 rsvpEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
 }]
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;