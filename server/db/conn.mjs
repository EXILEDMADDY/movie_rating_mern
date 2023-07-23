import { MongoClient } from "mongodb";



const client = new MongoClient("mongodb+srv://manavchotu999:AhrCkvSWyIIw7leP@cluster0.r0uks7z.mongodb.net/");


let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("sample_training");

export default db;