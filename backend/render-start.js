// render-start.js
const { execSync } = require("child_process");

try {
  console.log("Downloading Chromium via Playwright...");
  execSync("npx playwright install chromium", { stdio: "inherit" });
} catch (err) {
  console.error("Failed to download Chromium:", err);
}

require("./server");