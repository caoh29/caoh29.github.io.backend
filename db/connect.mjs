const MongoClient = require('mongodb').MongoClient;

const connectionString = process.env.DATABASE_URL || "";

const client = new MongoClient(connectionString);

let conn;
try {
  client.connect(function(err, client) {
    if (err) {
      console.error(err);
      return;
    }
    conn = client.db("sample_training");
  });
} catch(e) {
  console.error(e);
}

module.exports = conn;