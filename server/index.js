import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 5175;

app.use(cors());
app.use(express.json());

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
const SMTP_SECURE = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_RECIPIENT = process.env.CONTACT_RECIPIENT || SMTP_USER;

if (!SMTP_USER || !SMTP_PASS) {
  console.warn('Warning: SMTP_USER or SMTP_PASS not provided. Mailer will not send emails until configured.');
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
});

app.post('/api/send', async (req, res) => {
  const { email, phone, message } = req.body || {};
  if (!email || !message) {
    return res.status(400).json({ error: 'Please provide email and a message.' });
  }

  if (!SMTP_USER || !SMTP_PASS) {
    return res.status(500).json({ error: 'Mail service not configured. Please set SMTP_USER and SMTP_PASS.' });
  }

  const mailOptions = {
    from: `${email}`,
    to: CONTACT_RECIPIENT,
    subject: `KairoAI Support Message from ${email}`,
    text: `From: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
    html: `<p><strong>From:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Failed to send mail', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mailer server listening on http://localhost:${PORT}`);
});
