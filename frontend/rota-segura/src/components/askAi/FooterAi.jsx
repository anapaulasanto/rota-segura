import React from "react";
import { FiSend } from "react-icons/fi";

const FooterAi = ({ handleSendMessage, inputMessage, setInputMessage, isLoading }) => {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSendMessage(inputMessage);
    };

  return (
        <footer className="bg-white border-t py-0">
            <div className="max-w-4xl mx-auto pt-5">
                <form onSubmit={handleFormSubmit} className="flex items-center gap-3 bg-neutral-200 p-2 rounded-full shadow-sm ">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Pergunte algo sobre sua rota..."
                        className="flex-1 px-4 py-2 focus:outline-none"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={!inputMessage || isLoading} className="text-yellow-700 p-3 rounded-full hover:text-yellow-600 cursor-pointer disabled:text-gray-500 disabled:cursor-not-allowed">
                        <FiSend className="text-xl" />
                    </button>
                </form>
                <p className="text-center text-xs text-gray-400 mt-2">As respostas são baseadas nas condições atuais da rota</p>
            </div>
        </footer>
    )
};

export default FooterAi;
