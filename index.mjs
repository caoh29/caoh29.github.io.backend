// const loadEnvironments = require('./loadEnvironments');

// loadEnvironments();

import 'dotenv/config'
import './loadEnvironment.mjs';
import express from 'express';
import cors from 'cors';

import db from './db/connect.mjs';

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: 'https://caoh29.github.io/inner' }));

app.use(express.json());

app.get('/api/skills', async (req, res) => {
  const collection = db.collection("skills");
  const results = await collection.find({}).toArray();
  res.send(results).status(200);
});

app.get('/api/educations', async (req, res) => {
  const collection = db.collection("education");
  const results = await collection.find({}).toArray();
  res.send(results).status(200);
});

app.post('/api/skills', (req, res) => {
  const data = req.body;
  if (!data) res.status(422).json({ "error": "Bad skills data" });
  const collection = db.collection("skills");
  collection.insertOne(data);
  res.status(201).send(data);
});

app.post('/api/educations', (req, res) => {
  const data = req.body;
  if (!data) res.status(422).json({ "error": "Bad education data" });
  const collection = db.collection("education");
  collection.insertOne(data);
  res.status(201).send(data);
});

app.listen(port, () => {
  console.log(`Server is running on ${process.env.HOST}:${port}`)
});