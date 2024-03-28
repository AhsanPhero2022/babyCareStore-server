const express = require("express");
const cors = require("cors");

const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect to MongoDB
    // await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("ass8");
    const collection = db.collection("products");

   
   

    app.get("/products", async (req, res) => {
      const result = await collection.find().toArray();
      res.send(result);
    });
 
    app.get("/category", async (req, res) => {
      const result = await collection.find().toArray();
      
    
      result.sort((a, b) => {
        if (a.category < b.category) return -1;
        if (a.category > b.category) return 1;
        return 0;
      });
      
      res.send(result);
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);


app.get("/", (req, res) => {
  const serverStatus = {
    message: "Server is running smoothly",
    timestamp: new Date(),
  };
  res.json(serverStatus);
});

module.exports = app;
