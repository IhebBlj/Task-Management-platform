const express = require("express");
const {addEvent} = require("../controllers/eventController");


const router = express.Router();


router.post("/add-event",addEvent);

module.exports = router;