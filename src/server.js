import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
