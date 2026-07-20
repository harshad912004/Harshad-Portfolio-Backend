const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendContactEmail = async (contactData) => {
  const { name, email, subject, message } = contactData;

  const { data, error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: "📩 New Portfolio Contact Message",
    text: `
            New contact form submission
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            Message: ${message}
            Submitted At: ${new Date().toLocaleString()}
          `,
  });

  if (error) {
    console.error("Resend error:", error);
    throw error;
  }

  console.log("Resend success:", data);
};

module.exports = {
  sendContactEmail,
};