const Product = require("../models/Product");

const handleErrors = (err) => {
  let errors = { name: "", price: "" };

  //duplicate error code
  if (err.code === 11000) {
    errors.name = "that product is already registered";
    return errors;
  }

  //validation errors
  if (err.message.includes("product validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.add_product = async (req, res) => {
  console.log(req.body);
  const { name, price, in_stock } = req.body;

  try {
    const product = await Product.create({ name, price, in_stock });

    res.status(201).json({ proudct: product });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.get_product = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(201).json({ products: products });
  } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
  }
};
