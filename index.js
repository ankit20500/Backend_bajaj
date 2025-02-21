import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// GET Route
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST Route
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input" });
        }

        // Separate Numbers & Alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));

        // Find highest alphabet
        const highest_alphabet = alphabets.length > 0 ? [alphabets.sort().reverse()[0]] : [];

        const response = {
            is_success: true,
            user_id: "ankit_kumar_01012000", // Replace with your details
            email: "ankit@example.com",
            roll_number: "ABCD123",
            numbers,
            alphabets,
            highest_alphabet
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server Error" });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
