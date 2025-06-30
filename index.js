import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/get-daily-quote", async (req, res) => {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: "एक छोटा राधा-कृष्ण भक्ति वचन दो हिंदी में।"
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const quote = response.data.choices[0].message.content.trim();
        res.json({ quote });
    } catch (error) {
        console.error("Error fetching quote:", error.message);
        res.status(500).json({ error: "Failed to fetch quote." });
    }
});

app.get("/", (req, res) => {
    res.send("Prem Bhakti API is running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
