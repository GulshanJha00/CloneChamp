const renderQueue = require("../../queue/renderQueue");

const getSolution = async (req, res) => {
  try {
    const { uid, title, finalCode, target, htmlCode, cssCode } = req.body;

    if (!finalCode || !target || !uid || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const job = await renderQueue.add("evaluate", {
      uid,
      title,
      finalCode,
      target,
      htmlCode,
      cssCode,
    });

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