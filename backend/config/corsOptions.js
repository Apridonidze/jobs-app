require('dotenv').config(); //imports dotenv

const corsOptions = {
  origin: process.env.FRONTEND_URL, //url for frontend
  credentials: true, //allows credentials  
  allowedHeaders: ['Content-Type', 'Authorization'], //alows this types of headers from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] //allows this type of methods from frontned
}; //these options are used for safety, to avoid any type of reqquests from another source and to prvenet what type of requests are seneded to server

module.exports = corsOptions; //exports middleware