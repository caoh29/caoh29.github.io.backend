import 'dotenv/config'
import express from 'express';
import nodemailer from 'nodemailer';
// import cors from 'cors';

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));

app.use(express.json());

app.use((req, res, next) => {
  const host = req.hostname.toLowerCase();

  if (host === 'caoh29.dev' || host === 'www.caoh29.dev') {
    return res.redirect(301, 'https://portfolio.caoh29.dev');
  }

  next();
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log(req.body);

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: Number(process.env.MAILER_PORT),
      service: process.env.MAILER_SERVICE, 
      secure: Number(process.env.MAILER_PORT) === 465,
      auth: {
        type: 'OAUTH2',
        user: process.env.MAILER_USER,
        clientId: process.env.MAILER_CLIENT_ID,
        clientSecret: process.env.MAILER_CLIENT_SECRET,
        // refreshToken: process.env.MAILER_REFRESH_TOKEN,
      }
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.MAILER_TO,
      subject: `[Portfolio Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    console.log(`>> SENDING EMAIL: name ->${name}; email -> ${email}; subject -> ${subject}`);

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on ${process.env.HOSTNAME}:${port}`)
});
