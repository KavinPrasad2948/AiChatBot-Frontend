import React, { useState } from 'react';
import AvatarVideo from './components/VideoComponent';
import { NavbarDefault } from './components/Navbar';
import ChatInterface from './components/ChatInterface';
import VoiceRecorder from './components/VoiceInput';

const App: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Add voice recognition start logic here
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Add voice recognition stop logic here
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavbarDefault />
      <div className="container mx-auto py-8">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">Chatbot with Avatar</h1>
        <AvatarVideo videoId="fb1cf48701794d7eb180efed032c0df2" />
        {/* <ChatInterface /> */}
        <div className="flex justify-center mt-4">
          <VoiceRecorder onStart={handleStartRecording} onStop={handleStopRecording} isRecording={isRecording} />
        </div>
      </div>
    </div>
  );
};

export default App;
