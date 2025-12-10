import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './ChatWidget.css';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
}

export const ChatWidget: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: t('chat.welcome'), sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Hide widget on the main Chat page
    if (location.pathname === '/chat') {
        return null;
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Mock response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'll look into that for you. This is a quick response from the widget. For more detailed analysis, visit the main Chat page.",
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    return (
        <div className={`chat-widget-container ${isOpen ? 'open' : ''}`}>
            {isOpen && (
                <div className="chat-widget-window">
                    <div className="chat-widget-header">
                        <div className="header-title">
                            <Bot size={20} />
                            <span>{t('chat.widget.title')}</span>
                        </div>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            <X size={18} />
                        </button>
                    </div>

                    <div className="chat-widget-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`widget-message ${msg.sender}`}>
                                <div className="bubble">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-widget-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={t('chat.widget.placeholder')}
                        />
                        <button onClick={handleSend} disabled={!input.trim()}>
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}

            <button className="chat-widget-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
        </div>
    );
};
