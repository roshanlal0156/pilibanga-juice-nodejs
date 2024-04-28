const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    unique: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter price"],
    validate: {
      validator: function (value) {
        return value >= 0; // price should not be negative
      },
      message: "price must be a non-negative number",
    },
  },
  in_stock: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
