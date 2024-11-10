const express = require("express");
const {handleGenerateNewShortURl,handlegGetAnalytics} = require("../controllers/url"); // double dot to export other directory file
const router = express.Router();

router.post("/",handleGenerateNewShortURl);
router.get('/analytics/:shortId',handlegGetAnalytics)
module.exports = router;