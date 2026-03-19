const rateLimit = require("express-rate-limit");

// 🔥 Global limiter (light)
const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // max 200 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
});


module.exports = {
  globalLimiter,
};