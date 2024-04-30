const Order = require("../models/Order");
const Product = require("../models/Product");

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const constants = require("../utils/constants");
const { default: mongoose } = require("mongoose");

const ObjectId = require("mongodb").ObjectId;

module.exports.place_order = async (req, res) => {
  orderProducts = req.body.products;
  const token = req.cookies.jwt;
  console.log(token);

  let user = null;
  jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
    console.log(decodedToken);

    user = await User.findById(decodedToken.id);

    let mapIdsWithQty = {};
    let ids = [];
    Object.entries(orderProducts).map(([key, value]) => {
      ids.push(new ObjectId(value.product_id));
      mapIdsWithQty[value.product_id] = value.qty;
    });

    console.log(mapIdsWithQty);
    let productsDetail = await Product.find(
      {
        _id: {
          $in: ids,
        },
      },
      { _id: 1, name: 1, price: 1 }
    );

    let total = 0;
    let subTotal = 0;
    let deliveryCharges = 20; // TODO:: calulate according to distance

    orderedProductsDetail = [];
    Object.entries(productsDetail).map(([key, value]) => {
      orderedProductsDetail.push({
        _id: value._id,
        product_name: value.name,
        price: value.price,
        qty: mapIdsWithQty[value._id.toString()],
      });
      subTotal += value.price * mapIdsWithQty[value._id.toString()];
    });

    total = subTotal + deliveryCharges;

    try {
      const order = await Order.create({
        user_id: user._id,
        products: orderedProductsDetail,
        sub_total: subTotal,
        delivery_charges: deliveryCharges,
        total: total,
        status: constants.ORDER_STATUSES.PLACED,
      });

      res.status(201).json({ order: order });
    } catch (err) {
      console.log(err);
      //   const errors = handleErrors(err); TODO:: error handler
      res.status(400).json({ err });
    }
  });
};

module.exports.get_order = (req, res) => {
  const token = req.cookies.jwt;
  
  try {
    let user = null;
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      console.log(decodedToken.id);
      const userId = mongoose.Types.ObjectId.createFromHexString(decodedToken.id);
      const orders = await Order.aggregate([
        {
          $match: { user_id: userId },
        },
        {
          $project: {
            _id: 0,
            user_id: 1,
            products: 1,
            sub_total: 1,
            delivery_charges: 1,
            total: 1,
            status: 1,
            createdAt: 1,
            order_id: 1,
          },
        },
      ]).sort({ createdAt: -1 });
      
      res.status(201).json({ orders: orders });
    });
  } catch (err) {
    console.log(err);
    //   const errors = handleErrors(err); TODO:: error handler
    res.status(400).json({ err });
  }
};
