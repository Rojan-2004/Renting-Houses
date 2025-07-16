import { Booking } from '../../models/index.js';

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ data: bookings, message: 'Successfully fetched bookings' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

export const bookingController = {
  getUserBookings,
}; 