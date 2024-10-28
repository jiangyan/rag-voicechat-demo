# Voice-Enabled AI Chat Application

A web application that implements ElevenLabs Conversational AI for voice-enabled conversations with an AI agent. Built using the `@11labs/client` SDK, this application provides a seamless interface for voice interactions.

## Features

- 🎤 Real-time voice conversations with AI
- 🔄 Live status indicators for connection and speaking states
- 🎯 Secure API key handling through backend proxy
- 🔒 Microphone permission management
- 🌐 WebSocket-based real-time communication
- 🎨 Clean and responsive user interface
- 🔊 High-quality text-to-speech using ElevenLabs
- 🛡️ Environment-based configuration

## Prerequisites

- Node.js installed on your system
- ElevenLabs API key
- Agent ID from ElevenLabs platform

## Tech Stack

- Frontend: React/JavaScript
- Backend: Express.js
- Build Tool: Webpack
- Voice Technology: ElevenLabs API

## Getting Started

1. Clone the repository:

git clone https://github.com/jiangyan/rag-voicechat-demo.git
cd rag-voicechat-demo

2. Install dependencies:

npm install

3. Create environment configuration:
   - Copy `.env.example` to `.env`
   - Add your API credentials:

XI_API_KEY=your_elevenlabs_api_key
AGENT_ID=your_agent_id
PORT=3000

4. Start the development server:

npm run dev

The application will be available at:
- Frontend: http://localhost:8080
- Backend: http://localhost:3000

## Project Structure

rag-voicechat-demo/
│── src/                    # Frontend source code
│   ├── app.tsx            # Main application component
│   ├── index.html         # HTML template
│   └── styles.css         # Global styles
│── backend/               # Backend server code
│   └── server.js          # Express server implementation
│── webpack.config.js      # Webpack configuration
│── package.json           # Project dependencies and scripts
│── .env                   # Environment variables
│── tsconfig.json          # TypeScript configuration
│── tailwind.config.js     # Tailwind CSS configuration

## Technologies Used

- TypeScript (60.5%)
- JavaScript (33.6%)
- CSS (4.5%)
- HTML (1.4%)
- Tailwind CSS for styling
- React for UI components
- Express.js for backend server
- ElevenLabs API for voice synthesis

## Troubleshooting

### Microphone Issues
- Ensure browser has microphone permissions
- Check microphone connectivity
- Use HTTPS in production

### Connection Problems
- Verify API credentials in `.env` file
- Check network connectivity
- Monitor CORS-related console errors

### Audio Issues
- Verify browser audio output settings
- Check for conflicting applications using the microphone
- Ensure browser compatibility (Chrome recommended)

## Credits

This project is built using the [ElevenLabs Conversational AI SDK](https://elevenlabs.io/docs/conversational-ai-sdks/conversational-ai-guide).

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
