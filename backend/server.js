require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Log environment variables (masked) for debugging
console.log('Environment loaded:', {
    XI_API_KEY: process.env.XI_API_KEY ? '✓ Present' : '✗ Missing',
    AGENT_ID: process.env.AGENT_ID ? '✓ Present' : '✗ Missing',
    PORT: process.env.PORT || '3000 (default)'
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Create the signed URL endpoint
app.get('/api/signed-url', async (req, res) => {
    try {
        if (!process.env.XI_API_KEY || !process.env.AGENT_ID) {
            throw new Error('Missing required environment variables (XI_API_KEY or AGENT_ID)');
        }

        console.log('Making request to ElevenLabs API...');
        console.log('Agent ID:', process.env.AGENT_ID);
        console.log('API Key (first 10 chars):', process.env.XI_API_KEY.substring(0, 10) + '...');

        const url = `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${process.env.AGENT_ID}`;
        console.log('Request URL:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'xi-api-key': process.env.XI_API_KEY,
                'Accept': 'application/json'
            }
        });

        const responseText = await response.text();
        console.log('Raw response:', responseText);

        if (!response.ok) {
            throw new Error(`ElevenLabs API error: ${response.status} - ${responseText}`);
        }

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`Invalid JSON response from ElevenLabs: ${responseText}`);
        }

        if (!data.signed_url) {
            throw new Error('No signed_url in ElevenLabs response');
        }

        console.log('Successfully got signed URL');
        res.json({ signedUrl: data.signed_url });
    } catch (error) {
        console.error('Error in /api/signed-url:', error);
        res.status(500).json({ 
            error: error.message,
            details: error.stack
        });
    }
});

// Add catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// For local development only
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

// Export for Vercel
module.exports = app;
