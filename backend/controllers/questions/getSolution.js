const renderQueue = require("../../queue/renderQueue");

const getSolution = async (req, res) => {
  try {
    const { uid, title, finalCode, target, htmlCode, cssCode } = req.body;

    if (!finalCode || !target || !uid || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

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

    return res.status(200).json({
      message: "Processing started",
      jobId: job.id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to queue job",
    });
  }
};

module.exports = getSolution;
