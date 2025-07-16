import { Booking, User, Property } from '../../models/index.js';

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ data: bookings, message: 'Successfully fetched bookings' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Property, attributes: ['id', 'name', 'price'] }
      ]
    });
    res.status(200).json({ data: bookings, message: 'Successfully fetched all bookings' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all bookings', error: error.message });
  }
};

export const bookingController = {
  getUserBookings,
  getAllBookings,
}; 