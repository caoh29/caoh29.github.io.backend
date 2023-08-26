// const loadEnvironments = require('./loadEnvironments');

// loadEnvironments();

import "./loadEnvironment.mjs";
import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

const SKILLS_DATA = [
  {
    range: 70,
    name: 'React',
  },
  {
    range: 60,
    name: 'JavaScript',
  },
  {
    range: 30,
    name: 'SASS',
  },
];

const EDUCATION_DATA = [
  {
    date: 2023,
    title: 'Computer Programming Diploma',
    text: 'Georgian College @ ILAC, Toronto, Canada',
  },
  {
    date: 2021,
    title: 'Bachelor in Mechanical Engineering',
    text: `
      Universidad Industrial de Santander, Bucaramanga, Colombia 
      My thesis consisted of the creation of a Digital Learning Object based on Numerical Methods using eXe Learning under IEEE's compliance standards
    `,
  },
  {
    date: 2014,
    title: 'High School Degree',
    text: 'Colegio Franciscano del Virrey Solís, Bucaramanga, Colombia',
  },
];

app.get('/api/skills', (req, res) => {

  res.send(SKILLS_DATA)
});

app.get('/api/educations', (req, res) => res.send(EDUCATION_DATA));

app.post('/api/skills', (req, res) => {
  const data = req.body;
  if (!data) res.status(422).json({ "error": "Bad skills data" });
  SKILLS_DATA.push(data);
  res.status(201).send(data);
});

app.post('/api/educations', (req, res) => {
  const data = req.body;
  if (!data) res.status(422).json({ "error": "Bad skills data" });
  EDUCATION_DATA.push(data);
  res.status(201).send(data);
});

// app.post('/unsubscribe', (req, res) => {
//     const { data } = req.body;
//     if (!data) res.status(422).json({ "error": "Email is required" });
//     if (subscribedEmails.includes(data)) {
//         const index = subscribedEmails.findIndex((item) => item === data);
//         if (index !== -1) {
//             subscribedEmails.splice(index, 1);
//         }
//         res.send({ "message": "We will miss you!" });
//     } else {
//         res.status(422).json({ "error": "Email does not exist" });
//     }
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:4000`)
});