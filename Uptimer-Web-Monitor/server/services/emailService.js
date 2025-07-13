const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

async function sendDowntimeAlert(email, monitorName, url) {
  const mailOptions = {
    from: `"Uptime Monitor" <${process.env.EMAIL}>`,
    to: email,
    subject: `🚨 Downtime Alert: ${monitorName} is down!`,
    text: `Your monitor "${monitorName}" for URL "${url}" is currently experiencing downtime.`,
    html: `<p><strong>Downtime Alert:</strong></p><p>Your monitor <b>${monitorName}</b> for URL <a href="${url}" target="_blank">${url}</a> is currently experiencing downtime.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Downtime alert sent to ${email} for ${monitorName}`);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
}

module.exports = { sendDowntimeAlert };
