import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import userDetailRouter from "./routes/userDetailsRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
// import seedDatabase from "./seedDatabase.js";
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

// seedDatabase();

app.use("/api/user", userRouter);
app.use("/api/userDetails", userDetailRouter)
app.use("/api/admin", adminRouter)

app.listen(PORT, () => {
    console.log(`Server started at Port ${PORT}`);
});
