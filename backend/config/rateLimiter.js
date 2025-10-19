const rateLimiter = require('express-rate-limit')

const postRateLimiter = rateLimiter({
    windowMs : 10 * 1000, 
    max : 1,
    message : 'Please Wait 10 seconds before trying again'
})


module.exports = postRateLimiter