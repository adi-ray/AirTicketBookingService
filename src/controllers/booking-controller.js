const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services/index");

const { createChannel } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController {
  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const payload = {
      data: {
        subject: "This is a notification from queue",
        content: "Some queue will subscribe this",
        recepientEmail: "adityadns03@gmail.com",
        notificationTime: "2025-05-26T02:49:00",
      },
      service: "CREATE_TICKET",
    };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    return res.status(200).json({
      message: "Succesfully published the event",
    });
  }

  async create(req, res) {
    try {
      const response = await bookingService.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        data: response,
        success: true,
        message: "Booking completed successfully",
        err: {},
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        data: {},
        success: false,
        message: error.message,
        err: error.explanation,
      });
    }
  }
}

module.exports = BookingController;
