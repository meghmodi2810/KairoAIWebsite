# Mailer and APK setup

Steps to finish configuring the contact form and APK download:

1. Place the Android APK

- Copy your `KairoAI.apk` into the project's `public/` folder. The frontend download button links to `/KairoAI.apk`.

2. Configure SMTP for the mailer

- Copy `.env.example` to `.env` at the project root and replace the placeholder values:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@example.com
SMTP_PASS=your_smtp_password_here
CONTACT_RECIPIENT=notify-me@example.com
SERVER_PORT=5175
```

- Ensure `.env` is NOT committed (it's in `.gitignore`).

3. Start dev servers

- Frontend (Vite):
```bash
npm run dev
```

- Mailer server:
```bash
npm run start:server
```

- Or run both concurrently (requires `npm run dev:all`):
```bash
npm run dev:all
```

4. Test the contact form

- Open the site (Vite will show the URL, e.g. `http://localhost:5174/`).
- Fill in the contact form and submit. If SMTP is configured, the server will send the message to `CONTACT_RECIPIENT`.

Notes
- If using Gmail, you may need an App Password or to enable access via your Google account security settings.
- The mailer server listens on `SERVER_PORT` (default 5175) and Vite proxies `/api` to it during development.
