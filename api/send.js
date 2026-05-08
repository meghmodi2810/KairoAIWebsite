import nodemailer from 'nodemailer';

function getEnv(name, fallback = '') {
  return process.env[name] || fallback;
}

function getJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req.body === 'string' && req.body.trim()) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, phone, message } = getJsonBody(req);
  if (!email || !message) {
    return res.status(400).json({ error: 'Please provide email and a message.' });
  }

  const smtpUser = getEnv('SMTP_USER');
  const smtpPass = getEnv('SMTP_PASS');
  const smtpHost = getEnv('SMTP_HOST', 'smtp.gmail.com');
  const smtpPort = Number.parseInt(getEnv('SMTP_PORT', '465'), 10);
  const smtpSecure = getEnv('SMTP_SECURE', 'true') === 'true';
  const recipient = getEnv('CONTACT_RECIPIENT', smtpUser);

  if (!smtpUser || !smtpPass) {
    return res.status(500).json({ error: 'Mail service not configured. Please set SMTP_USER and SMTP_PASS.' });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
  });

  try {
    await transporter.sendMail({
      from: smtpUser,
      to: recipient,
      replyTo: email,
      subject: `KairoAI Support Message from ${email}`,
      text: `From: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
      html: `<p><strong>From:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><hr/><p>${String(message).replace(/\n/g, '<br/>')}</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to send mail', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
