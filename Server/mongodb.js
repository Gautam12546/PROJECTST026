const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Restro")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect database");
})

const menuItemSchema = mongoose.Schema({
    productName: {
      type: String,
      required: true,
      trim: true
    },
    productPrice: {
      type: Number,
      required: true,
      min: 0
    },
    productCategory:{
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
  });

  const categoryItemSchema = mongoose.Schema({
    categoryName: {
      type: String,
      required: true,
      trim: true
    },
    categoryImage: {
      type: String,
      required: true,
    },
  });
  
  const shopUserSchema = mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    //   trim: true,
    //   lowercase: true,
    //   match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: true
    },
    shopName: {
      type: String,
      required: true,
    //   trim: true
    },
    number: {
      type: String,
      required: true,
    //   match: [/^\d{10}$/, 'Please fill a valid 10-digit number']
    },
    category: {
      type: [categoryItemSchema],
      default: []
    },
    menu: {
      type: [menuItemSchema],
      default: []
    },
    verificationToken: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false
    },
  }, {
    timestamps: true
  });
  
  const ShopUser = mongoose.model('ShopUser', shopUserSchema);
  
  module.exports = ShopUser;