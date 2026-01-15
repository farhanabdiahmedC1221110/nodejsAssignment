import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  category: {
    type: String,
    enum: ["Appetizer", "Main Course", "Dessert", "Beverage", "Side"],
    required: [true, "Category is required"],
  },
  available: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

foodSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  // next();
});

const Food = mongoose.model("Food", foodSchema);

export default Food;
