require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Helper function to validate prompts
function isValidPrompt(prompt) {
    return typeof prompt === 'string' && prompt.trim().length >= 5;
}

// API endpoint for video generation (uses image as placeholder)
app.post('/api/generate-video', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!isValidPrompt(prompt)) {
            return res.status(400).json({ error: 'A valid and descriptive prompt is required' });
        }

        console.log("Video prompt received:", prompt);

        // Image generation used as video placeholder
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
            response_format: "url"
        });

        res.json({
            success: true,
            video: response.data[0].url
        });

    } catch (error) {
        console.error('Error generating video:', error?.error || error);
        res.status(500).json({
            success: false,
            error: error?.error?.message || error.message || 'Failed to generate video'
        });
    }
});

// API endpoint for image generation
app.post('/api/generate-image', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!isValidPrompt(prompt)) {
            return res.status(400).json({ error: 'A valid and descriptive prompt is required' });
        }

        console.log("Image prompt received:", prompt);

        const response = await openai.images.generate({
            model: "dall-e-2",  // Switch to DALL-E 2 model
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "url"
        });

        res.json({
            success: true,
            image: response.data[0].url
        });

    } catch (error) {
        console.error('Error generating image:', error?.error || error);
        res.status(500).json({
            success: false,
            error: error?.error?.message || error.message || 'Failed to generate image'
        });
    }
});

// Start server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:3000 (Port: 3000)`);
});
app.post('/api/generate-image', async (req, res) => {
    try {
        const { prompt } = req.body;

        console.log("🟡 Prompt received:", prompt);

        if (!prompt || typeof prompt !== "string" || prompt.trim().length < 5) {
            return res.status(400).json({ error: 'A valid and descriptive prompt is required' });
        }

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
            response_format: "url"
        });

        console.log("🟢 Image URL:", response.data[0].url);

        res.json({
            success: true,
            image: response.data[0].url
        });

    } catch (error) {
        console.error('🔴 OpenAI Error:', error);
        res.status(500).json({
            success: false,
            error: error?.error?.message || error.message || 'Failed to generate image'
        });
    }
});
