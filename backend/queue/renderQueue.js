const { Queue } = require("bullmq");
const redis = require("../utils/redis");

const renderQueue = new Queue("render-queue", {
  connection: redis,
});

module.exports = renderQueue;