import "dotenv/config";
import exp from "express";
import { connect } from "mongoose";
import cors from "cors";
import { empRoute } from "./APIs/empApp.js";
const app = exp();
const port = process.env.PORT || 4000;
//add cors middleware
app.use(
  cors({
    origin: [/\.vercel\.app$/, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
//body parser middleware
app.use(exp.json());
app.get("/", (req, res) => {
  res.status(200).json({ message: "Employee API is running" });
});
//emp api middleware
app.use("/emp-api", empRoute);

//DB connection
const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("DB connected");
    app.listen(port, () => console.log(`server listening on port ${port}..`));
  } catch (err) {
    console.log("err in DB connection", err.message);
  }
};

connectDB();

//error handling middleware
app.use((err, req, res, next) => {
  console.log("err in middleware:", err.message);

  res.status(err.status || 500).json({
    message: "error",
    reason: err.message,
  });
});
