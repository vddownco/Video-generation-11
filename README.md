# AI Marketing Video Generator

A web application that generates marketing videos using AI based on user-provided text prompts. This application combines a modern web interface with AI technology to create engaging marketing content.

## Features

- Simple and intuitive user interface
- Real-time video generation from text prompts
- Modern, responsive design
- Server-side processing with OpenAI integration

## Prerequisites

- Node.js (v14 or higher)
- NPM (Node Package Manager)
- OpenAI API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter your marketing prompt in the text area
2. Click "Generate Video"
3. Wait for the AI to process your request
4. Download or preview your generated video

## Technical Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- AI Integration: OpenAI API

## Note

This is a demonstration project. The video generation feature requires integration with appropriate AI services and may need additional configuration based on the specific AI service being used.

## License

MIT