import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create the transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use TLS (secure connection)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Function to send a beautifully formatted email
const sendEmail = async (to, subject, text) => {
  try {
    // Define the HTML content for the email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          
          <!-- Email Header -->
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #4caf50; font-size: 24px;">Greetings from Zambia Institute of Planners</h1>
          </div>

          <!-- Email Body -->
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            ${text}
          </p>

          <!-- Footer / Signature -->
          <div style="margin-top: 30px; text-align: center; font-size: 14px; color: #888;">
            <p>Best Regards,</p>
            <p><strong>Zambia Institute of Planners</strong></p>
            <p>www.zambiaplanners.org</p>
          </div>

        </div>
      </div>
    `;

    // Send the email
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER, // sender address
      to, // list of recipients
      subject, // Subject line
      text, // plain text body (for email clients that don’t support HTML)
      html: htmlContent, // HTML content body
    });

    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export { sendEmail };
