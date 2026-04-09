const { Queue } = require("bullmq");
const redis = require("../../utils/redis");

const queue = new Queue("render-queue", {
  connection: redis,
});

const getJobStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await queue.getJob(id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const state = await job.getState();

    return res.json({
      state,
      result: job.returnvalue || null,
    });

  } catch (err) {
    return res.status(500).json({ error: "Error fetching job status" });
  }
};

module.exports = getJobStatus;