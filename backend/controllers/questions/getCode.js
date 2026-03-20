const Ques = require('../../models/question');
const User = require("../../models/User");
const redis = require("../../utils/redis");

const getCode = async (req, res) => {

    const { uid, qn_id } = req.body;

    if (!uid || !qn_id) {
        return res.status(400).json({ error: "Question Not Found" });
    }

    const cacheKey = `usercode:${uid}:${qn_id}`;

    try {

        const cached = await redis.get(cacheKey);

        if (cached) {
            console.log("Served from Redis");
            return res.status(200).json(JSON.parse(cached));
        }

        const user = await User.findOne({ uid });
        if (!user) return res.status(404).json({ error: "User not found" });

        const question = await Ques.findById(qn_id);
        if (!question) return res.status(404).json({ error: "Question not found" });

        const solvedQn = user.solvedQuestions.find(
            (q) => q.question.toString() === qn_id.toString()
        );

        const responseData = {
            html_sol: solvedQn?.html_sol || "",
            css_sol: solvedQn?.css_sol || ""
        };

        // ✅ store in redis
        await redis.set(
            cacheKey,
            JSON.stringify(responseData),
            "EX",
            1800   // 30 minutes cache
        );

        return res.status(200).json(responseData);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
    }
};

module.exports = getCode;