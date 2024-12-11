import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/waitlist', async (req, res) => {
  const { email } = req.body;
  console.log('Received email:', email);
  console.log('Using credentials:', {
    user: process.env.EMAIL_USER,
    passLength: process.env.EMAIL_PASS?.length || 0
  });

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS?.trim(), // Trim any whitespace
      },
      debug: true, // Enable debug logs
    });

    // Test the connection
    await transporter.verify();
    console.log('SMTP connection verified');

    const info = await transporter.sendMail({
        from: `"VoiceAI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to VoiceAI Waitlist! 🎉',
        html: `
          <!DOCTYPE html>
          <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <img src="/public/voice.png" alt="VoiceAI Logo" style="max-width: 150px;">
              </div>
              
              <h2 style="color: #333; text-align: center;">Welcome to VoiceAI! 🎉</h2>
              
              <p>Hi there,</p>
              
              <p>Thank you for joining the VoiceAI waitlist! We're thrilled to have you as part of our growing community of voice technology enthusiasts.</p>
              
              <p>Here's what you can expect:</p>
              <ul>
                <li>Early access to our platform when we launch</li>
                <li>Exclusive updates about our development progress</li>
                <li>Special founding member benefits</li>
                <li>First look at new features and capabilities</li>
              </ul>
              
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Stay Connected:</strong></p>
                <p style="margin: 10px 0;">
                  Follow us on social media for the latest updates:<br>
                  <a href="YOUR_TWITTER_URL" style="color: #0066cc;">Twitter</a> | 
                  <a href="YOUR_LINKEDIN_URL" style="color: #0066cc;">LinkedIn</a> | 
                  <a href="YOUR_INSTAGRAM_URL" style="color: #0066cc;">Instagram</a>
                </p>
              </div>
              
              <p>If you have any questions, feel free to reply to this email or reach out to us on social media.</p>
              
              <p>Best regards,<br>The VoiceAI Team</p>
              
              <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; font-size: 12px; color: #666; text-align: center;">
                <p>© ${new Date().getFullYear()} VoiceAI. All rights reserved.</p>
                <p>
                  Our address: [Your Company Address]<br>
                  <a href="YOUR_UNSUBSCRIBE_URL" style="color: #666;">Unsubscribe</a> | 
                  <a href="YOUR_PRIVACY_POLICY_URL" style="color: #666;">Privacy Policy</a>
                </p>
              </div>
            </body>
          </html>
        `
      });

    console.log('Message sent: %s', info.messageId);
    res.json({ success: true, message: 'Successfully joined waitlist' });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to join waitlist',
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment check:', {
    hasUser: !!process.env.EMAIL_USER,
    hasPass: !!process.env.EMAIL_PASS,
  });
}); 