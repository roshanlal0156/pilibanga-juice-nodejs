const mongoose = require("mongoose");
const constants = require("../utils/constants");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User model

    products: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        product_name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    sub_total: { type: Number, required: true },
    delivery_charges: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: Object.values(constants.ORDER_STATUSES), default: 'pending' },
    order_id: { type: Number}
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('save', async function (next) {
  try {
    // If the document is new, generate the order_id
    if (this.isNew) {
      // Find the count of documents in the collection
      const count = await Order.countDocuments();
      // Set the order_id as count + 1
      this.order_id = count + 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
