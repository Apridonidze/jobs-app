const rateLimiter = require('express-rate-limit') ; //importing express library

const postRateLimiter = rateLimiter({
    windowMs : 10 * 1000,  // seconds to send another request
    max : 1, //request amount per windowms
    message : 'Please Wait 10 seconds before trying again' //message when rate limiter prevents user from spamming
}); // middleware is used to avoid request spamming from frontend , to avoid server crashing and slowing down  . middleware prevents user to send more than 1 request per 10 secondds


module.exports = postRateLimiter ; //exporting middleware