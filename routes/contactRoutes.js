const express = require('express');
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');

const router = express.Router();

// Validation schema for creating a contact
const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
];

// POST /api/contact - Submit contact form message
router.post(
  '/contact',
  contactValidationRules,
  contactController.createContact
);

// GET /api/contact - Retrieve all contact messages
router.get('/contact', contactController.getAllContacts);

// GET /api/contact/:id - Retrieve a single contact message by ID
router.get('/contact/:id', contactController.getContactById);

// DELETE /api/contact/:id - Delete a contact message by ID
router.delete('/contact/:id', contactController.deleteContact);

module.exports = router;
