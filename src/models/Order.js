const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User model

    products: [
      {
        product_name: { type: String, required: true },
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    sub_total: { type: Number, required: true },
    delivery_charges: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
