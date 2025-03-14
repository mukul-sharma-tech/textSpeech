// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(cors());


// // Serve frontend files
// app.use(express.static(path.join(__dirname, "public")));

// // Serve head.html as the root page
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
// });

// // MongoDB Connection
// mongoose
//   .connect('mongodb+srv://mukul:1010@nodecluster0.hurza.mongodb.net/?retryWrites=true&w=majority&appName=NodeCluster0')
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// const SpeechSchema = new mongoose.Schema({ text: String });
// const Speech = mongoose.model("Speech", SpeechSchema);

// app.post("/save", async (req, res) => {
//   try {
//     const { text } = req.body;
//     const newSpeech = new Speech({ text });
//     await newSpeech.save();
//     res.json({ message: "Saved successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.use(express.static("public"));
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));





const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Serve head.html as the root page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// MongoDB Connection
mongoose
  .connect('mongodb+srv://mukul:1010@nodecluster0.hurza.mongodb.net/?retryWrites=true&w=majority&appName=NodeCluster0')
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema for storing HR question and candidate's answer
const InterviewSchema = new mongoose.Schema({
  hrQuestion: String,
  candidateAnswer: String,
});

const Interview = mongoose.model("Interview", InterviewSchema);

// POST request to save HR question and candidate answer
app.post("/save", async (req, res) => {
  try {
    const { hrQuestion, candidateAnswer } = req.body;

    if (!hrQuestion || !candidateAnswer) {
      return res.status(400).json({ error: "HR question and candidate answer are required" });
    }

    const newInterview = new Interview({ hrQuestion, candidateAnswer });
    await newInterview.save();
    res.json({ message: "Question and answer saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static files from the "public" directory
app.use(express.static("public"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
