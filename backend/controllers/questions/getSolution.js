const { renderQueue, renderQueueEvents }  = require("../../queue/renderQueue");

const getSolution = async (req, res) => {
  try {
    const { uid, title, finalCode, target, htmlCode, cssCode } = req.body;

    if (!finalCode || !target || !uid || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    console.log("Job is in queue")

    const job = await renderQueue.add(
      "evaluate",
      {
        uid,
        title,
        finalCode,
        target,
        htmlCode,
        cssCode,
      },
      {
        attempts: 3, // 🔁 retry 3 times
        backoff: {
          type: "exponential",
          delay: 2000,
        },
        removeOnComplete: true, // optional cleanup
        removeOnFail: false, // keep failed jobs for debugging
      },
    );

    const result = await job.waitUntilFinished(renderQueueEvents);


return res.status(200).json({
  percentageMatch: result.percentageMatch,
});

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to queue job",
    });
  }
};

module.exports = getSolution;
