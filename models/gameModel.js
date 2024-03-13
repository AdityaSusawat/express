import mongoose from "mongoose";

const gameSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter a game name"],
    },
    genre: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email id"],
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

export const Game = mongoose.model("games", gameSchema);
export const User = mongoose.model("myUsers", userSchema);
