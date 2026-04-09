const { Worker } = require("bullmq");
const redis = require("../utils/redis");

const playwright = require("playwright");
const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch").default || require("pixelmatch");
const sharp = require("sharp");

const User = require("../models/User");
const QuestionSchema = require("../models/question");

const worker = new Worker(
  "render-queue",
  async (job) => {
    const { uid, title, finalCode, target, htmlCode, cssCode } = job.data;

    let browser;

    try {
      const [user, question] = await Promise.all([
        User.findOne({ uid }),
        QuestionSchema.findOne({ title }),
      ]);

      if (!user || !question) throw new Error("User or Question not found");

      browser = await playwright.chromium.launch({ headless: true });

      const page = await browser.newPage({
        viewport: { width: 340, height: 340 },
      });

      await page.setContent(finalCode);
      const screenshotBuffer = await page.screenshot();

      const targetImageResponse = await fetch(target);
      const targetImageBuffer = await targetImageResponse.arrayBuffer();

      const resizedTargetBuffer = await sharp(Buffer.from(targetImageBuffer))
        .resize(340, 340)
        .png()
        .toBuffer();

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
        { threshold: 0.1 }
      );

      const totalPixels = width * height;
      const percentageMatch =
        ((totalPixels - numDiffPixels) / totalPixels) * 100;

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
          solved: percentageMatch >= 85,
        });
      }

      await user.save();

      return { percentageMatch };

    } catch (err) {
      console.error("Worker error:", err);
      throw err;
    } finally {
      if (browser) await browser.close();
    }
  },
  {
    connection: redis,
    concurrency: 2
  }
);
worker.on("completed", (job, result) => {
  console.log(`✅ Job ${job.id} completed`, result);
});

worker.on("failed", (job, err) => {
  console.log(`❌ Job ${job.id} failed`, err.message);
});