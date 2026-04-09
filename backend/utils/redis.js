const Redis = require("ioredis");
require("dotenv").config();

const redis = new Redis(process.env.REDIS_URL,{
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
});

redis.on("connect", () => {
    console.log("✅ Redis Connected");
});

redis.on("error", (err) => {
    console.log("❌ Redis Error:", err);
});

module.exports = redis;