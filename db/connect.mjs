import { MongoClient } from "mongodb";

const connectionString = process.env.DATABASE_URL || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("Profile");

export default db;