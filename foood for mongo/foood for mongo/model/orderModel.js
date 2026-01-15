import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: [true, "Customer reference is required"],
  },
  items: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"],
      },
      priceAtTime: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"],
      },
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
    min: [0, "Total amount cannot be negative"],
  },
  status: {
    type: String,
    enum: ["pending", "preparing", "ready", "delivered", "cancelled"],
    default: "pending",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  notes: {
    type: String,
    trim: true,
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

orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();

  // Calculate total amount
  if (this.items && this.items.length > 0) {
    this.totalAmount = this.items.reduce(
      (total, item) => total + item.priceAtTime * item.quantity,
      0
    );
  } else {
    this.totalAmount = 0;
  }

  // next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;