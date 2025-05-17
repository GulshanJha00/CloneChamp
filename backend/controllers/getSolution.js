const playwright = require("playwright");
const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch").default || require("pixelmatch");
const sharp = require('sharp');
const QuestionSchema = require("../models/question");

const getSolution = async (req, res) => {
  let browser;
  try {
    const {title, finalCode,target,htmlCode,cssCode } = req.body;
    if (!finalCode || !target) {
      return res
        .status(400)
        .json({ error: "Missing finalCode or targetImageUrl" });
    }
    console.log(title)
    const schema = await QuestionSchema.findOne({title : title})
    
    schema.html_sol = htmlCode
    schema.css_sol = cssCode
    await schema.save();
    console.log("Rreached before chromium")



    browser = await playwright.chromium.launch({ headless: true }); //headless browser
    const page = await browser.newPage({ viewport: { width: 340, height: 340 } }); //
    await page.setContent(finalCode);

    // Taking screenshot
    const screenshotBuffer = await page.screenshot();
    console.log("Rreached after chromium screenshot taken")


    // Fetching and resizing target image
    const targetImageResponse = await fetch(target);
    if (!targetImageResponse.ok) {
      throw new Error(
        `Failed to download target image: ${targetImageResponse.status}`
      );
    }
    const targetImageBuffer = await targetImageResponse.arrayBuffer();
    const resizedTargetBuffer = await sharp(Buffer.from(targetImageBuffer))
    .resize(340, 340)
    .png()
    .toBuffer();

    // Read PNGs
    const userPng = PNG.sync.read(screenshotBuffer);
    const targetPng = PNG.sync.read(resizedTargetBuffer);
    console.log("Rreached after chromium buffer created")


    const width = userPng.width;
    const height = userPng.height;
    const diff = new PNG({ width, height });

    const pixelmatchOptions = {
      threshold: 0.1,
      alpha: 1.0,
      includeAA: true 
    };
    const numDiffPixels = pixelmatch(
      userPng.data,
      targetPng.data,
      diff.data,
      width,
      height,
      pixelmatchOptions
    );
    console.log("Rreached after chromium macthed done")



    const totalPixels = width * height;
    const percentageMatch = ((totalPixels - numDiffPixels) / totalPixels) * 100;
    if(percentageMatch >= 85){
      schema.solved = true;
      await schema.save()
    }

    res.status(200).json({ percentageMatch });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch questions." });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
module.exports = getSolution;
