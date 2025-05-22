const express = require("express");

const { BookingController } = require("../../controllers/index");

const router = express.Router();

roouter.post("/bookings", BookingController.create);

module.exports = router;
