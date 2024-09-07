Here’s a `README.md` file for the frontend:

```markdown
# Frontend

## Overview

This is the frontend for the chatbot application. It provides a user interface for recording and playing audio, as well as interacting with the chatbot through a WebSocket connection.

## Features

- Voice recording and playback.
- Real-time audio communication with the backend via WebSocket.
- Display of the chatbot's audio responses.

## Getting Started

### Prerequisites

- Node.js (v18.x or higher)
- A WebSocket backend running at `ws://localhost:3000`

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/chatbot-frontend.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd chatbot-frontend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Usage

- **Voice Recorder:**
  - Click **"Start Recording"** to begin recording audio.
  - Click **"Stop Recording"** to stop recording and send the audio to the backend.
  - The recorded audio will be played back through the audio player.
  
- **Chatbot Interaction:**
  - The backend will process the audio, generate a response using Google Generative AI (Gemini), and return the response as audio.
  - The response audio will be automatically played through the audio player on the interface.

## WebSocket Connection

The frontend communicates with the backend through a WebSocket connection. Ensure that the backend server is running and accessible at `ws://localhost:3000`.

## Example

1. Open the application in your browser at `http://localhost:3000`.
2. Record your voice and stop the recording.
3. The recorded audio will be sent to the backend, and you'll hear the chatbot's response.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- WebSocket for real-time communication.
- Google Cloud services for speech processing.
- React for building the user interface.
```

As with the backend `README.md`, make sure to update any placeholder URLs and adjust any details as needed for your specific setup.