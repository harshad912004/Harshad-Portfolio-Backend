const { validationResult } = require('express-validator');
const Contact = require('../models/contactModel');
const { sendContactEmail } = require('../services/emailService');

// @desc    Create a new contact message
// @route   POST /api/contact
// @access  Public
exports.createContact = async (req, res, next) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Save to database
    await Contact.create({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: "Message sent successfully"
    });

    // Send email in the background
    sendContactEmail({ name, email, subject, message })
      .catch(err => {
        console.error("Failed to send email:", err);
      });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Public (or Protected depending on requirements, defaulted to public here)
exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single contact message by ID
// @route   GET /api/contact/:id
// @access  Public
exports.getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: `Contact message with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a contact message
// @route   DELETE /api/contact/:id
// @access  Public
exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.deleteById(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Contact message with ID ${id} not found or already deleted`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};