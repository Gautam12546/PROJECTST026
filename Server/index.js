const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');
const crypto = require("crypto");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const ShopUser = require('./mongodb');
const app = express();
const port = process.env.port;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}); 

app.post('/register', async (req, res) => {
  const { email, password, shopName, number } = req.body;
  const verificationToken = crypto.randomBytes(20).toString('hex');
  const user = await ShopUser.findOne({ email });
  if (user) {
    return res.send({ message: "User Already Exist" });
  }
  bcrypt.hash(password, 10, async function(err, hash) {
    const newuser = await ShopUser.create({
      email,
      password:hash,
      shopName,
      number,
      verificationToken,
    });
    res.send({ message: "Verify your Email", data: newuser });
    const encodedToken = encodeURIComponent(verificationToken);
    const verificationLink = `http://localhost:3000/verify/${encodedToken}`;
    const transporter = nodemailer.createTransport({
      service:'Gmail',
      host:'smtp.gmail.com',
      port:465,
      auth:{
        user:EMAIL,
        pass:PASSWORD
      }
    });
    const mailOption = {
      from:EMAIL,
      to:email,
      subject:'Account Verification',
      html:`Click <a href ="${verificationLink}">here</a> to verify your Account.`
    };

    await transporter.sendMail(mailOption,(error,info)=>{
      if(error){
        console.log(error);
        res.status(500).json({success: false,message:'Error sending verification email'});
      }else{
        console.log('Verification email sent: '+ info.response);
        // res.status(200).json({success:true,message:'Verification email sent successfully'});
      }
    })
  
});
  
});

app.get('/verify/:id',async(req,res)=>{
  const {id: token} = req.params;
  const user = await ShopUser.findOne({verificationToken: token});
  if (!user || user.verified) {
    return res.status(404).json({ success: false, message: 'Invalid verification token.' });
  }
  user.verified = true;
    await user.save();
    res.status(200).send('Account verified successfully.');
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await ShopUser.findOne({ email });
  if (!user) {
    return res.send({ message: "Incorrect Data" });
  }
  bcrypt.compare(password, user.password, function(err, result) {
    if(result && user.verified){
      const token = jwt.sign({
        data: user._id
      }, process.env.JWT_SECRET);
      res.send({ message: "Login successfully", data: user, token: token });
    }
    else{
      res.send({ message: "Incorrect Data" });
    }
});  
});



app.post('/addmenu',upload.single('file'), async (req, res) => {
  try {
    const { itemname, price, category, value } = req.body;
    const user = await ShopUser.findOne({ _id: new mongoose.Types.ObjectId(value) });
    if (!user) {
      return res.status(404).send({ data: null, message: 'User not found' });
    }

    const newMenuItem = {
      productName: itemname,
      productPrice: price,
      productCategory: category,
      productImage: req.file.filename,
    };

    user.menu.push(newMenuItem);

    await user.save();

    res.send({ data: user, message: 'Item Added Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.post('/addcategory',upload.single('file'), async (req, res) => {
  try {
    const { itemname, value } = req.body;
    const user = await ShopUser.findOne({ _id: new mongoose.Types.ObjectId(value) });
    if (!user) {
      return res.status(404).send({ data: null, message: 'User not found' });
    }

    const newCategoryItem = {
      categoryName: itemname,
      categoryImage: req.file.filename,
    };

    user.category.push(newCategoryItem);

    await user.save();

    res.send({ data: newCategoryItem , message: 'New Category Addede' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.get('/menu', async (req, res) => {
  const value = req.query.value;

  try {
    const user = await ShopUser.findOne({ _id: new mongoose.Types.ObjectId(value) });
    if (!user) {
      return res.status(404).send({ data: null, message: 'User not found' });
    }
    res.send({ data: user.menu });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.get('/usermenu', async (req, res) => {
  const id = req.query.value;

  try {
    const user = await ShopUser.findOne({ _id: new mongoose.Types.ObjectId(id) });
    if (!user) {
      return res.status(404).send({ data: null, message: 'User not found' });
    }
    res.send({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.get('/getdata', async (req, res) => {
  const id = req.query.value;

  try {
    const user = await ShopUser.findOne({ _id: new mongoose.Types.ObjectId(id) });
    if (!user) {
      return res.status(404).send({ data: null, message: 'User not found' });
    }
    res.send({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.get('/itemdetail', async (req, res) => {
  const id = req.query.value;

  try {
    const user = await ShopUser.findOne({ 'menu._id': id }, { 'menu.$': 1 });
    if (!user) {
      return res.status(404).send({ data: null, message: 'User not found' });
    }

    const item = user.menu[0];
    if (!item) {
      return res.status(404).send({ data: null, message: 'Item not found' });
    }

    res.send({ data: item });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Update a menu item by ID
app.put('/menu/:id', upload.single('file') , async (req, res) => {
  const itemId = req.params.id;
  const { itemname, price, category } = req.body;

  try {
    const user = await ShopUser.findOne({ 'menu._id': itemId });
    if (!user) {
      return res.status(404).send({ message: 'Item not found' });
    }

    const menuItem = user.menu.find(item => item._id.toString() === itemId);
    if (!menuItem) {
      return res.status(404).send({ message: 'Item not found' });
    }

    // Update the fields
    menuItem.productName = itemname;
    menuItem.productPrice = price;
    menuItem.productCategory = category;
    menuItem.productImage = req.file.filename;

    await user.save();

    res.send({ message: 'Item updated successfully', data: menuItem });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Delete a menu item by ID
app.delete('/menu/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const value = req.query.value;

  try {
    const user = await ShopUser.findOne({ _id: new mongoose.Types.ObjectId(value) });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const menuIndex = user.menu.findIndex(item => item._id.toString() === itemId);

    if (menuIndex === -1) {
      return res.status(404).send({ message: 'Menu item not found' });
    }

    user.menu.splice(menuIndex, 1); // Remove the item from the menu

    await user.save(); // Save the user document with the updated menu

    res.send({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.delete('/category/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const value = req.query.value;

  try {
    const user = await ShopUser.findOne({ _id: new mongoose.Types.ObjectId(value) });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const categoryIndex = user.category.findIndex(item => item._id.toString() === itemId);

    if (categoryIndex === -1) {
      return res.status(404).send({ message: 'Menu item not found' });
    }

    user.category.splice(categoryIndex, 1); // Remove the item from the menu

    await user.save(); // Save the user document with the updated menu

    res.send({ message: 'category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
