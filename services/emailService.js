const nodemailer = require('nodemailer');

// Configure Gmail transport using environment variables
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP verify failed:", err);
  } else {
    console.log("SMTP server is ready.");
  }
});

/**
 * Sends a contact notification email to the developer's email address.
 * @param {Object} contactData - The details of the contact form submission.
 * @param {string} contactData.name - The name of the sender.
 * @param {string} contactData.email - The email of the sender.
 * @param {string} contactData.subject - The subject of the message.
 * @param {string} contactData.message - The message content.
 */
const sendContactEmail = async (contactData) => {
  const { name, email, subject, message } = contactData;
  const currentTime = new Date().toLocaleString();

  const mailOptions = {
    from: contactData.email, // Sender's email address
    to: process.env.EMAIL_USER, // Sends email to developer's own address
    subject: '📩 New Portfolio Contact Message',
    text: `
            New contact form submission
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            Message: ${message}
            Submitted At: ${currentTime}
          `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendContactEmail,
};