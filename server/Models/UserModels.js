import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName:  { type: String, required: [true, "Please add a full name"] },
  email:     { type: String, required: [true, "Please add an email"], unique: true, trim: true },
  password:  { type: String, required: [true, "Please add a password"], minlength: [6, "Password must be at least 6 characters"] },
  image:     { type: String },

  // Reference tới gói tài khoản
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountPlan',
    default: null
  },

  // Khi user đã chọn gói thì active = true
  isAccountActive: {
    type: Boolean,
    default: false,
  },

  isAdmin: { type: Boolean, default: false },
  likedMovies: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Movies" },
  ],

}, {
  timestamps: true,
});

export default mongoose.model("User", UserSchema);
