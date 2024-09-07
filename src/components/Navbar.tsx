import React from 'react';

export const NavbarDefault: React.FC = () => {
  return (
    <nav className="bg-gray-400 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          Ai Chatbox
        </div>
      </div>
    </nav>
  );
};
