import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { IoArrowBack, IoCarSportSharp } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { TbClockHour4 } from "react-icons/tb";
import { FiMic, FiSend } from "react-icons/fi";
import { FaBrain } from "react-icons/fa";

const AskAi = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const routeInfo = location.state?.route.full_route_data.legs[0];
    const routeVia = location.state?.route.summary

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const chatEndRef = useRef(null);

    useEffect(() => {
        if (routeInfo) {
            setMessages([
                {
                    sender: 'ia',
                    text: `Olá! Como posso ajudar com sua rota de ${routeInfo.start_address} para ${routeInfo.end_address}?`
                }
            ]);
        }
    }, [routeInfo]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (messageText) => {
        if (!messageText || isLoading) return;

        const userMessage = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // 2. Monta o payload para o backend
            const payload = {
                question: messageText,
                routeContext: {
                    origin: routeInfo.start_address,
                    destination: routeInfo.end_address,
                    distance: routeInfo.distance.text,
                    duration: routeInfo.duration.text
                }
            };

            // 3. Faz a chamada para o seu endpoint da IA
            const response = await axios.post('/routes/ai', payload);

            // 4. Adiciona a resposta da IA à tela
            const aiMessage = { sender: 'ia', text: response.data.resposta };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("Erro ao contatar a IA:", error);
            const errorMessage = { sender: 'ia', text: 'Desculpe, não consegui processar sua pergunta. Tente novamente.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSendMessage(inputMessage);
    };

    const handleChipClick = (question) => {
        handleSendMessage(question);
    };

    if (!routeInfo) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
                <h1 className="text-2xl font-bold">Nenhuma rota selecionada</h1>
                <p>Por favor, volte e selecione uma rota para usar o assistente.</p>
                <Link to="/rota-segura/search" className="mt-4 bg-yellow-500 text-white font-bold py-2 px-6 rounded-full hover:bg-yellow-600">
                    Voltar
                </Link>
            </div>
        );
    }

    const suggestionChips = [
        "Tempo estimado de chegada?",
        "Há congestionamentos?",
        "Postos de gasolina no caminho",
        "Rotas alternativas"
    ];

    return (
        <div className="flex flex-col h-screen bg-orange-50 relative bottom-20">
            <header className="bg-yellow-500/80 text-white p-3">
                <div className="max-w-4xl mx-auto flex justify-start items-center gap-1">
                        <button onClick={() => navigate(-1)}>
                            <IoArrowBack className="text-2xl cursor-pointer" />
                        </button>
                    <h1 className="text-2xl font-bold">Assistente de Rota</h1>
                </div>
            </header>

            <div className="bg-yellow-500/80 text-white shadow-md pb-1">
                <div className="max-w-4xl mx-auto flex items-center gap-2">
                    <div className='flex items-center gap-1'>
                        <CiLocationOn />
                        <p className="font-semibold">{routeInfo.start_address.split(',')[0]}</p>
                    </div>
                    <IoArrowBack className="text-md transform rotate-180" />
                    <p className="font-semibold">{routeInfo.end_address.split(',')[0]}</p>
                    <span className="mx-2">•</span>
                    <div className='flex items-center gap-1'>
                        <TbClockHour4 />
                        <p>{routeInfo.duration.text}</p>
                    </div>
                </div>
            </div>

            {/* Card de Resumo da Rota */}
            <div className="p-4">
                <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <IoCarSportSharp className="text-2xl text-gray-600" />
                        <div>
                            <p className="font-bold text-gray-800">Via {routeVia}</p>
                            <p className="text-sm text-gray-500">{routeInfo.distance.text} • {routeInfo.duration.text}</p>
                        </div>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Ativo</span>
                </div>
            </div>

            {/* Corpo do Chat */}
            <main className="flex-1 overflow-y-auto p-5">
                <div className="max-w-5xl mx-auto">
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
                    <div ref={chatEndRef} />
                </div>
                <div className="flex flex-wrap gap-2 mt-10 justify-center self-end">
                    {suggestionChips.map(chip => (
                        <button key={chip} onClick={() => handleChipClick(chip)} className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-semibold cursor-pointer hover:bg-gray-50">
                            {chip}
                        </button>
                    ))}
                </div>
            </main>

            <footer className="bg-white border-t pt-0">
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
        </div>
    );
};

export default AskAi;