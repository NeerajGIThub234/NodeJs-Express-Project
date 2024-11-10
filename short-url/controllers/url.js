const shortid = require("shortid");
const URL = require("../models/url");
const crypto = require("crypto");

async function handleGenerateNewShortURl(req, res) {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ err: "URL is required!" });
    }

    // Generate a random 8-character string using crypto
    const shortId = crypto.randomBytes(4).toString("hex");

    try {
        const newUrl = await URL.create({
            shortId: shortId,
            redirectUrl: url,
            visitHistory: [],
            createdBy: req.user._id,
        });

        return res.render('home',{ id: shortId});
    } catch (error) {
        return res.status(500).json({ err: "Server error occurred" });
    }
}

async function handlegGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        anayltics : result.visitHistory,
    })
}

module.exports = {
    handleGenerateNewShortURl,
    handlegGetAnalytics,
};
