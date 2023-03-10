const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama harus ada'],
    minlength: 3,
    maxlength: 50,
  },
  price: {
    type: Number,
    require: true,
    min: 1000,
    max: 100000000,
  },
  stock: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
