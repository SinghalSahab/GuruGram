import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASSWORD,
  },
});

const baseStyle = `
  body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #4B5563; background-color: #F3F4F6; }
  .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FFFFFF; border-radius: 8px; }
  h1 { color: #2563EB; font-size: 24px; font-weight: bold; }
  .cta-button { display: inline-block; padding: 10px 20px; background-color: #2563EB; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; }
  .cta-button:hover { background-color: #1D4ED8; }
  .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #6B7280; }
`;

async function sendMail(name, toEmail, purpose) {
  let content = '';
  let subject = '';

  switch (purpose) {
    case 'CreateAccount':
      subject = 'Welcome to GuruGram - Your Mentorship Journey Begins!';
      content = `
        <html>
          <head>
            <style>${baseStyle}</style>
          </head>
          <body>
            <div class="container">
              <h1>Welcome to GuruGram, ${name}!</h1>
              <p>We're thrilled to have you join our community of students and industry professionals.</p>
              <p>With GuruGram, you can:</p>
              <ul>
                <li>Connect with personalized mentors</li>
                <li>Develop industry-standard skills</li>
                <li>Get career guidance from top professionals</li>
                <li>Access mentorship sessions remotely</li>
                <li>Benefit from our smart matching algorithm</li>
              </ul>
              <p>Ready to start your mentorship journey? Click the button below:</p>
              <p><a href="https://gurugram.vercel.app" class="cta-button">Explore GuruGram</a></p>
              <p>If you have any questions, our support team is always here to help.</p>
              <div class="footer">
                <p>Best regards,</p>
                <p>The GuruGram Team</p>
              </div>
            </div>
          </body>
        </html>
      `;
      break;

    case 'Login':
      subject = 'Welcome Back to GuruGram!';
      content = `
        <html>
          <head>
            <style>${baseStyle}</style>
          </head>
          <body>
            <div class="container">
              <h1>Welcome back, ${name}!</h1>
              <p>We're glad to see you again on GuruGram. Your mentorship journey continues!</p>
              <p>Here's what's new since your last visit:</p>
              <ul>
                <li>5 new mentor recommendations based on your interests</li>
                <li>3 upcoming webinars in your field</li>
                <li>New feature: Skill Assessment - track your progress and identify areas for improvement</li>
              </ul>
              <p>Ready to continue your growth? Click the button below:</p>
              <p><a href="https://gurugram.vercel.app" class="cta-button">Go to My Dashboard</a></p>
              <p>Remember, consistent engagement leads to the best mentorship experience!</p>
              <div class="footer">
                <p>Best regards,</p>
                <p>The GuruGram Team</p>
              </div>
            </div>
          </body>
        </html>
      `;
      break;

    default:
      subject = 'GuruGram Update';
      content = `
        <html>
          <head>
            <style>${baseStyle}</style>
          </head>
          <body>
            <div class="container">
              <h1>Hello, ${name}!</h1>
              <p>We hope you're having a great experience with GuruGram.</p>
              <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
              <div class="footer">
                <p>Best regards,</p>
                <p>The GuruGram Team</p>
              </div>
            </div>
          </body>
        </html>
      `;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: toEmail,
      subject: subject,
      html: content,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export { sendMail };
