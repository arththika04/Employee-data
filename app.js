import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();

const app = express();
;

/* Middleware */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Routes */
app.use("/employees", employeeRoutes);

/* MongoDB Connection */

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => {
 console.error("DB Connection Error:", err.message);
 process.exit(1);
}
);
// Start Server
const PORT = process.env.PORT || 5008;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));