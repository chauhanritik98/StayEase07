import express from "express";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import chatbotRoutes from "./chatbot.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import admin from "firebase-admin";
import fs from "fs";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
dotenv.config();

const PORT = process.env.PORT || 4000;
connectDB();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173",
    "https://stay-ease07.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/properties", propertyRoutes);
app.use("/admin", adminRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.use("/api", chatbotRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.rainbow.italic.underline);
});



const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf-8")
);
// 🔥 Firebase init
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// 🔥 Gemini init
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/ai-search", async (req, res) => {
  try {
    const { message } = req.body;
    const text = message.toLowerCase();

    let filters = {
      location: "",
      type: "",
      maxPrice: "",
      amenities: []
    };

    // 📍 LOCATION
    if (text.includes("noida")) filters.location = "Noida";
    if (text.includes("delhi")) filters.location = "Delhi";
    if (text.includes("aurangabad")) filters.location = "Aurangabad";

    // 🏠 BHK TYPE
    if (text.includes("1bhk")) filters.type = "1BHK";
    if (text.includes("2bhk")) filters.type = "2BHK";
    if (text.includes("3bhk")) filters.type = "3BHK";

    // 💰 PRICE
    const priceMatch = text.match(/\d+/);
    if (priceMatch) filters.maxPrice = parseInt(priceMatch[0]);

    // 🏢 AMENITIES
    if (text.includes("wifi")) filters.amenities.push("wifi");
    if (text.includes("parking")) filters.amenities.push("parking");
    if (text.includes("gym")) filters.amenities.push("gym");

    // 🔍 FIREBASE QUERY
    let query = db.collection("properties");

    if (filters.location) {
      query = query.where("location", "==", filters.location);
    }

    if (filters.type) {
      query = query.where("type", "==", filters.type);
    }

    if (filters.maxPrice) {
      query = query.where("price", "<=", filters.maxPrice);
    }

    const snapshot = await query.get();
    let results = snapshot.docs.map(doc => doc.data());

    // 🔥 AMENITY FILTER (manual)
    if (filters.amenities.length > 0) {
      results = results.filter(property =>
        filters.amenities.every(a =>
          property.amenities?.includes(a)
        )
      );
    }

    res.json({
      filters,
      results
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

