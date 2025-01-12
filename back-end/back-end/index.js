const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); 

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/socmed', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if(err) {console.log(err);}
    else { console.log("Successfully connected to MongoDB"); }
  }
);

//register User model with Mongoose
require('./models/user');
require('./models/post');

//initialize server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

//allow access controls
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
  res.setHeader("Access-Control-Allow-Methods", 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader("Access-Control-Allow-Credentials", 'true');
  next();
})

require('./router')(app)

app.listen(3001, (err) => {
  if (err) { console.log(err) }
  else {console.log('Server started at port 3001')}
})