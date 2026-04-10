const express = require("express");
const helmet = require("helmet");
const router = require("./routes/route");
const cors = require("cors");
const app = express();
const { globalLimiter } = require("./middleware/rateLimiter");
const connection = require("./utils/db");
const https = require("https")

app.use(express.json());
app.use(globalLimiter);
app.use(helmet());
app.use(
    cors({
        origin: ["https://clonechamp.vercel.app", "http://localhost:3000","http://13.201.49.164:3000","http://13.201.49.164"],
        
    }),
);
app.use(router);

connection();


app.listen(3001,"0.0.0.0", () => {
  console.log("Working on http://localhost:3001");
});
