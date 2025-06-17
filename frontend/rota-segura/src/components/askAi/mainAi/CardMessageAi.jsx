import React from "react";
import { FaBrain } from "react-icons/fa";


const CardMessageAi = ({ messages, isLoading }) => {
  return (
        <div className="mx-auto">
            {messages.map((msg, index) => (
                <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'ia' && (
                        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white flex-shrink-0">
                            <FaBrain />
                        </div>
                    )}
                    <div className={`px-4 py-3 rounded-2xl max-w-lg my-2 ${msg.sender === 'user' ? 'bg-yellow-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow-sm'}`}>
                        <p>{msg.text}</p>
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex items-end gap-3 justify-start">
                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                        <FaBrain />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-white text-gray-800 shadow-sm">
                        <div className="flex items-center gap-2">
                            <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                            <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                            <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default CardMessageAi;
