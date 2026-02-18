import { OpenRouter } from '@openrouter/sdk';
import { SYSTEM_PROMOT } from './prompts.js';
import express from 'express';
const app = express();
require('dotenv').config();
app.use(express.json())


app.get('/test', (req, res) => {
    res.status(200).json({
        message: "Working"
    })
})

app.post('/send', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        res.status(403).json({
            message: "Invalid inputs"
        })
    }
    const client = new OpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY || ""
    });
    const response = await client.chat.send({
        chatGenerationParams: {
            model: "arcee-ai/trinity-large-preview:free",
            messages: [
                { role: 'system', content: SYSTEM_PROMOT },
                { role: "user", content: prompt },
            ],
        }
    });
    res.json({
        data: response.choices[0].message.content
    })

})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})
