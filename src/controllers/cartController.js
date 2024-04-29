const ObjectId = require("mongodb").ObjectId;
const Product = require("../models/Product");

module.exports.get_cart = async (req, res) => {
  let cartProductIds = req.query.product_ids;

  if(typeof(cartProductIds) === 'string' || cartProductIds instanceof String) {
    let objId = new ObjectId(cartProductIds);
    let products = await Product.find(
        {
          _id: objId,
        },
        { _id: 1, name: 1, price: 1 }
      );
      res.render("cart", { cartData: products });
  }
  else if (cartProductIds) {
    let ids = [];
    Object.entries(cartProductIds).map(([key, value]) => {
      ids.push(new ObjectId(value));
    });

    let products = await Product.find(
      {
        _id: {
          $in: ids,
        },
      },
      { _id: 1, name: 1, price: 1 }
    );
    res.render("cart", { cartData: products });
  } else {
    res.render("cart", { cartData: [] });
  }
};
