const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
    },
    category: { 
        type: String,
         required: true,
     },
    price: { 
        type: Number,
         required: true, 
        },
    stock: { 
        type: Number, 
        required: true, 
    },
});

const ProductModel = mongoose.model('products', ProductSchema);
module.exports = ProductModel;
