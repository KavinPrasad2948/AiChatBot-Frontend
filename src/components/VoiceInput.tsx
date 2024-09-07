import React, { useState, useRef } from 'react';

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      const audioChunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        if (audioRef.current) {
          audioRef.current.src = audioUrl; // Assign recorded audio to the audio element
        }
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing the microphone', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
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
    </div>
  );
};

export default VoiceRecorder;
