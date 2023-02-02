const Product = require('../models/ProductModel');

const index = async (req, res) => {
  await Product.find()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const view = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const store = async (req, res) => {
  await Product.create({ ...req.body })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Product.findByIdAndUpdate({ _id: id }, { ...req.body });
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  await Product.findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
