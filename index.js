import 'dotenv/config'
import express from 'express';
import nodemailer from 'nodemailer';
// import cors from 'cors';

const app = express();
const port = process.env.APP_PORT;

// app.use(cors({ origin: 'https://caoh29.dev' }));

app.use(express.static('public'));

app.use(express.json());

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
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
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
      }
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.MAILER_TO,
      subject: `[Portfolio Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on ${process.env.HOSTNAME}:${port}`)
});