const playwright = require("playwright");
const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch");
const fs = require("fs");
const sharp = require('sharp');

const getSolution = async (req, res) => {
  let browser;
  try {
    const { finalCode, target } = req.body;
    if (!finalCode || !target) {
      return res
        .status(400)
        .json({ error: "Missing finalCode or targetImageUrl" });
    }

    // Setting headless browser
    browser = await playwright.chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 320, height: 320 } });
    await page.setContent(finalCode);

    // Taking screenshot
    const screenshotBuffer = await page.screenshot();
    fs.writeFileSync("screenshot.png", screenshotBuffer);
    console.log("Screenshot saved to screenshot.png");
    console.log("Screenshot buffer size:", screenshotBuffer.length); // Log size

    // Fetching and resizing target image
    const targetImageResponse = await fetch(target);
    if (!targetImageResponse.ok) {
      throw new Error(
        `Failed to download target image: ${targetImageResponse.status}`
      );
    }
    const targetImageBuffer = await targetImageResponse.arrayBuffer();
    const resizedTargetBuffer = await sharp(Buffer.from(targetImageBuffer))
      .resize(320, 320)
      .toBuffer();
    fs.writeFileSync("resized_target.png", Buffer.from(resizedTargetBuffer)); // Save resized
    console.log("Resized target image saved to resized_target.png");
    console.log("Resized target buffer size:", resizedTargetBuffer.length); // Log size

    // Read PNGs
    const userPng = PNG.sync.read(screenshotBuffer);
    const targetPng = PNG.sync.read(resizedTargetBuffer);

    const width = userPng.width;
    const height = userPng.height;
    const diff = new PNG({ width, height });

    console.log(`User PNG dimensions: ${userPng.width}x${userPng.height}`);
    console.log(`Target PNG dimensions: ${targetPng.width}x${targetPng.height}`);

    const numDiffPixels = pixelmatch(
      userPng.data,
      targetPng.data,
      diff.data,
      width,
      height,
      { threshold: 0.3 }
    );

    // Save the difference image
    fs.writeFileSync("difference.png", PNG.sync.write(diff));
    console.log("Difference image saved to difference.png");

    const totalPixels = width * height;
    const percentageMatch = ((totalPixels - numDiffPixels) / totalPixels) * 100;

    console.log(" Match Percentage Is :- " + percentageMatch);
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
