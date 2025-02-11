import mongoose from "mongoose";

const UserScheama = new mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, select: false },
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    type: String,
  },
  avatarPublicId: String,
});

const User = mongoose.model("User", UserScheama);

export default User;
