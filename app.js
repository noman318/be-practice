import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
const MONGO_URL = "mongodb://localhost:27017/be-practice";
mongoose
  .connect(MONGO_URL, {
    dbName: "Backend",
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => console.log("MongoDB connected Successfully"))
  .catch((err) => console.log("err", err));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("Testing root route");
});
app.use("/api/user", router);

app.listen(port, (err) => {
  if (err) {
    console.log("err", err);
  } else {
    console.log(`Server is running on Port ${port}`);
  }
});
