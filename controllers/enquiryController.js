const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEnquiryEmail = async (req, res) => {
  const { name, email, message,phoneNo } = req.body;

  if (!name || !email || !message || !phoneNo) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "New Enquiry Received",
      html: `
        <h3>New Enquiry Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Message:</strong> ${phoneNo}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: "Enquiry sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send enquiry." });
  }
};

module.exports = { sendEnquiryEmail };
