import React from 'react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser }) => {
  return (
    <div className={`p-4 max-w-xs rounded-lg shadow-md my-2 ${isUser ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-black mr-auto'}`}>
      {message}
    </div>
  );
};

const ChatInterface: React.FC = () => {
  // Dummy messages for now
  const messages = [
    { message: "Hi! How can I assist you today?", isUser: false },
    { message: "What's the weather today?", isUser: true }
  ];

  return (
    <div className="h-64 p-4 bg-white rounded-lg shadow-md overflow-y-scroll">
      {messages.map((msg, index) => (
        <ChatBubble key={index} message={msg.message} isUser={msg.isUser} />
      ))}
    </div>
  );
};

export default ChatInterface;
