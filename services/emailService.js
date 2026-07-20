const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendContactEmail = async (contactData) => {
  const { name, email, subject, message, timezone } = contactData;

  // Universal timestamp
  const utcTime = new Date().toISOString();

  // Your local time (India)
  const istTime = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date());

  const { data, error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: "📩 New Portfolio Contact Message",
    text: `
            New Contact Form Submission
            ━━━━━━━━━━━━━━━━━━━━━━
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            Message: ${message}
            ━━━━━━━━━━━━━━━━━━━━━━
            Submitted At (UTC): ${utcTime}
            User Time Zone: ${timezone || "Unknown"}
            Your Time (IST): ${istTime}
            ━━━━━━━━━━━━━━━━━━━━━━
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