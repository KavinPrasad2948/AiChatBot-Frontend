import React from 'react';

const AvatarVideo: React.FC = () => {
  // Local video URL
  const videoUrl = '../assets/Untitled video.mp4';

  return (
    <div className="flex justify-center items-center py-8">
      {videoUrl ? (
        <video
          className="rounded-lg shadow-lg"
          src={videoUrl}
          controls
          autoPlay
          muted
          width="600"
        />
      ) : (
        <p className="text-gray-500">Loading Avatar...</p>
      )}
    </div>
  );
};

export default AvatarVideo;
