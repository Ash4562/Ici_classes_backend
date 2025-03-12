const express = require("express");
const { sendEnquiryEmail } = require("../controllers/enquiryController");

const router = express.Router();

router.post("/", sendEnquiryEmail);

module.exports = router;
