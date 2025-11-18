require('dotenv').config(); //imports dotenv

const corsOptions = {
  origin: process.env.FRONTEND_URL, //url for frontend
  credentials: true, //allows credentials  
  allowedHeaders: ['Content-Type', 'Authorization'], //alows this types of headers from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] //allows this type of methods from frontned
};

module.exports = corsOptions; //exports middleware