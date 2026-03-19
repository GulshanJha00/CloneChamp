const express = require("express");
const helmet = require("helmet");
const router = require("./routes/route");
const cors = require("cors");
const app = express();
const { globalLimiter } = require("./middleware/rateLimiter");
const connection = require("./utils/db");

app.use(express.json());
app.use(globalLimiter);
app.use(helmet());
app.use(
    cors({
        origin: ["https://clonechamp.vercel.app", "http://localhost:3000"],
    }),
);
app.use(router);

connection();

app.listen(3001, () => {
  console.log("Working on http://localhost:3001");
});
