import "./loadEnvironment.mjs";
import db from './db/connect.mjs';

const SKILLS_DATA = [
  {
    range: 70,
    name: 'React',
  },
  {
    range: 60,
    name: 'JavaScript',
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

const SEED_DATA = [
  {
    collectionName: 'skills',
    data: SKILLS_DATA,
  },
  {
    collectionName: 'education',
    data: EDUCATION_DATA,
  },
];

async function seed() {
  for (const { collectionName, data } of SEED_DATA) {
    const collection = db.collection(collectionName);
    await collection.deleteMany({});
    await collection.insertMany(data);
  }
}

seed();