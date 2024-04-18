const express = require('express');
require('dotenv').config();
require('./database/connectDB');
const app = express();
const port = 4000;
const userRouter = require('./routes/user');

app.use(express.json());
app.use(userRouter);
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
