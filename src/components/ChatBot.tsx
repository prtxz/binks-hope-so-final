// src/components/ChatBot.tsx
import React, { useState } from "react";
import { Send } from "lucide-react";

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, input]);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-4 w-[360px] max-w-full bg-[#0a0a0a]/60 backdrop-blur-md text-white rounded-3xl shadow-2xl border border-[#4CAF50]/40 z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#4CAF50] via-[#38a169] to-[#2f855a] rounded-t-3xl">
        <h2 className="text-sm font-semibold tracking-wider uppercase">BINKS AI Assistant</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 text-xl font-bold transition transform hover:scale-110"
        >
          ×
        </button>
      </div>

      {/* Chat Window */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-[#4CAF50]/50 scrollbar-track-transparent">
        <div className="text-gray-400 text-sm italic">Hi there 👋 — ask me anything about BINKS!</div>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="bg-[#1e1e1e]/80 text-sm text-white px-4 py-2 rounded-lg border border-[#4CAF50]/30 shadow-md max-w-[80%] self-end"
          >
            {msg}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center p-3 bg-[#111] border-t border-[#4CAF50]/30 rounded-b-3xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-2 bg-[#0f0f0f] text-sm text-white rounded-full border border-[#4CAF50]/30 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 rounded-full bg-[#4CAF50] hover:bg-[#3e8e41] text-white shadow-md transition hover:scale-110"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
