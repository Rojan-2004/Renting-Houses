import express from "express";
import { bookingController } from "../../controller/booking/bookingController.js";

const router = express.Router();

// Get all bookings for the logged-in user
router.get("/", bookingController.getUserBookings);

export { router as bookingRouter }; 