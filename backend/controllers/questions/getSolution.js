const playwright = require("playwright");
const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch").default || require("pixelmatch");
const sharp = require("sharp");
const QuestionSchema = require("../../models/question");
const User = require("../../models/User");
const redis = require("../../utils/redis");

const getSolution = async (req, res) => {
  let browser;

  try {
    const { uid, title, finalCode, target, htmlCode, cssCode } = req.body;

    if (!finalCode || !target || !uid || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 🔥 parallel DB fetch
    const [user, question] = await Promise.all([
      User.findOne({ uid }),
      QuestionSchema.findOne({ title })
    ]);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (!question) return res.status(404).json({ error: "Question not found" });

    // 🚀 Launch browser
    browser = await playwright.chromium.launch({ headless: true });

    const page = await browser.newPage({
      viewport: { width: 340, height: 340 }
    });

    await page.setContent(finalCode);
    const screenshotBuffer = await page.screenshot();

    // 🎯 Fetch target image
    const targetImageResponse = await fetch(target);

    if (!targetImageResponse.ok) {
      throw new Error("Failed to download target image");
    }

    const targetImageBuffer = await targetImageResponse.arrayBuffer();

    const resizedTargetBuffer = await sharp(Buffer.from(targetImageBuffer))
      .resize(340, 340)
      .png()
      .toBuffer();

    // 🧠 Pixel compare
    const userPng = PNG.sync.read(screenshotBuffer);
    const targetPng = PNG.sync.read(resizedTargetBuffer);

    const width = userPng.width;
    const height = userPng.height;

    const diff = new PNG({ width, height });

    const numDiffPixels = pixelmatch(
      userPng.data,
      targetPng.data,
      diff.data,
      width,
      height,
      {
        threshold: 0.1,
        alpha: 1.0,
        includeAA: true
      }
    );

    const totalPixels = width * height;
    const percentageMatch =
      ((totalPixels - numDiffPixels) / totalPixels) * 100;

    // 🔁 Save / Update user solution
    const existingIndex = user.solvedQuestions.findIndex(
      (entry) =>
        entry.question.toString() === question._id.toString()
    );

    if (existingIndex !== -1) {
      user.solvedQuestions[existingIndex].html_sol = htmlCode;
      user.solvedQuestions[existingIndex].css_sol = cssCode;

      if (percentageMatch >= 85) {
        user.solvedQuestions[existingIndex].solved = true;
      }
    } else {
      user.solvedQuestions.push({
        question: question._id,
        html_sol: htmlCode,
        css_sol: cssCode,
        solved: percentageMatch >= 85
      });
    }

    await user.save();

    // ✅ REDIS CACHE INVALIDATION (VERY IMPORTANT)
    await redis.del(
      `usercode:${uid}:${question._id.toString()}`
    );

    return res.status(200).json({ percentageMatch });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to process solution."
    });
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
};

module.exports = getSolution;