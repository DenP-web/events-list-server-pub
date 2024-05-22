import { config } from "dotenv";
import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routers/index.js";

config();
const app = express();
const PORT = 5000 || process.env.PORT;
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.xnzfpck.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use(json());
app.use(cors({
  origin: 'https://events-list-test.netlify.app'
}));

app.use('/api', router)

async function startServer() {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => {
      console.log("server work");
    });
  } catch (err) {
    console.log(err);
  }
}
startServer()