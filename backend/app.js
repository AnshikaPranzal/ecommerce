const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');


// then() acts like callback
//DB Connection bro
mongoose.connect('mongodb://localhost:27017/tshirt', 
{useNewUrlParser: true,
 useUnifiedTopology: true,
 useCreateIndex: true
}).then(()=>{
    console.log("DB CONNECTED");
});
//Middlewaresssss
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



//My Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', paymentRoutes);


//Port
const port = 8000;

//Start Server yaar
app.listen(port, ()=>{
    console.log(`Started on ${port}...`);
})