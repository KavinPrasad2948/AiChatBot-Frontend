import React, { useState, useRef, useEffect } from 'react';

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [responseAudioUrl, setResponseAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    wsRef.current = new WebSocket('https://chatbot-backend-tqot.onrender.com');

    wsRef.current.onmessage = (event) => {
      try {
        // Handle the audio response from the backend
        const audioBlob = new Blob([event.data], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setResponseAudioUrl(audioUrl);
      } catch (error) {
        console.error('Error handling WebSocket message:', error);
      }
    };

    wsRef.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    wsRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      const audioChunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        if (audioRef.current) {
          audioRef.current.src = audioUrl; // Assign recorded audio to the audio element
        }

        // Send the audio file to the backend using WebSocket
        sendAudioToBackend(audioBlob);
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing the microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const sendAudioToBackend = (audioBlob: Blob) => {
    if (wsRef.current) {
      wsRef.current.send(audioBlob);
    } else {
      console.error('WebSocket connection not established');
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Voice Recorder</h2>

      <div className="space-x-4">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:bg-gray-400"
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:bg-gray-400"
        >
          Stop Recording
        </button>
      </div>

      {/* Audio playback after recording */}
      <audio ref={audioRef} controls className="mt-4 mx-auto" />

      {/* Playback of the response audio */}
      {responseAudioUrl && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Response Audio</h3>
          <audio src={responseAudioUrl} controls className="mt-2 mx-auto" autoPlay />
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
