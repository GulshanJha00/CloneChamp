const { Queue, QueueEvents } = require("bullmq");
const redis = require("../utils/redis");

console.log("Enterted queue")
const renderQueue = new Queue("render-queue", {
  connection: redis,
});
const renderQueueEvents = new QueueEvents("render-queue", {
  connection: redis,
});

module.exports = { renderQueue, renderQueueEvents };