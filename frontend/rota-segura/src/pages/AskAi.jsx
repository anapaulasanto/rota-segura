import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import HeaderAi from '@/components/askAi/HeaderAi';
import FooterAi from '@/components/askAi/FooterAi';
import MainAi from '@/components/askAi/mainAi/MainAi';

const AskAi = () => {
    const location = useLocation();
    const routeInfo = location.state?.route.full_route_data.legs[0];
    const routeVia = location.state?.route.summary
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (routeInfo) {
            setMessages([
                {
                    sender: 'ia',
                    text: `Olá! Como posso ajudar com sua rota de ${routeInfo.start_address} para ${routeInfo.end_address}?`
                }
            ]);
        }
    }, []);

    const handleSendMessage = async (messageText) => {
        if (!messageText || isLoading) return;

        const userMessage = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage]); //pros chips
        setInputMessage('');
        setIsLoading(true);

        try {
            const payload = {
                question: messageText,
                routeContext: {
                    origin: routeInfo.start_address,
                    destination: routeInfo.end_address,
                    distance: routeInfo.distance.text,
                    duration: routeInfo.duration.text
                }
            };

            const response = await axios.post('/routes/ai', payload);

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

    return (
        <div className="flex flex-col h-screen bg-orange-50 relative bottom-20">
            <HeaderAi routeInfo={routeInfo} />
            <MainAi handleSendMessage={handleSendMessage} isLoading={isLoading} messages={messages} routeInfo={routeInfo} routeVia={routeVia} />
            <FooterAi handleSendMessage={handleSendMessage} inputMessage={inputMessage} isLoading={isLoading} setInputMessage={setInputMessage} />
        </div>
    );
};

export default AskAi;