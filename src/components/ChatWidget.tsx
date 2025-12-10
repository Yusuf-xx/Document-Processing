import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import './ChatWidget.css';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export const ChatWidget: React.FC = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: t('chatWidget.welcomeMessage'),
        }
    ]);
    const [inputValue, setInputValue] = useState('');

    // Update welcome message when language changes
    useEffect(() => {
        setMessages(prev => {
            const updatedMessages = [...prev];
            if (updatedMessages.length > 0 && updatedMessages[0].id === '1') {
                updatedMessages[0] = {
                    ...updatedMessages[0],
                    content: t('chatWidget.welcomeMessage')
                };
            }
            return updatedMessages;
        });
    }, [i18n.language, t]);

    // Hide widget on chat page
    if (location.pathname === '/chat') {
        return null;
    }

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: t('chatWidget.sampleResponse'),
            };
            setMessages(prev => [...prev, aiMessage]);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Widget Button */}
            {!isOpen && (
                <button
                    className="chat-widget-button"
                    onClick={() => setIsOpen(true)}
                    aria-label={t('chatWidget.openChat')}
                >
                    <MessageCircle size={24} />
                    <span className="chat-widget-badge">AI</span>
                </button>
            )}

            {/* Chat Widget Window */}
            {isOpen && (
                <div className={`chat-widget-window ${isMinimized ? 'minimized' : ''}`}>
                    {/* Header */}
                    <div className="chat-widget-header">
                        <div className="chat-widget-header-content">
                            <div className="chat-widget-avatar">
                                <MessageCircle size={20} />
                            </div>
                            <div>
                                <h3>{t('chatWidget.title')}</h3>
                                <p>{t('chatWidget.subtitle')}</p>
                            </div>
                        </div>
                        <div className="chat-widget-header-actions">
                            <button
                                onClick={() => setIsMinimized(!isMinimized)}
                                aria-label={isMinimized ? t('chatWidget.maximize') : t('chatWidget.minimize')}
                            >
                                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label={t('chatWidget.close')}
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    {!isMinimized && (
                        <>
                            <div className="chat-widget-messages">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`chat-widget-message ${message.role === 'user' ? 'user' : 'assistant'}`}
                                    >
                                        <div className="chat-widget-message-content">
                                            {message.content}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="chat-widget-input-container">
                                <input
                                    type="text"
                                    className="chat-widget-input"
                                    placeholder={t('chatWidget.inputPlaceholder')}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button
                                    className="chat-widget-send-button"
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
                                    aria-label={t('chatWidget.send')}
                                >
                                    <Send size={18} />
                                </button>
                            </div>

                            {/* Footer */}
                            <div className="chat-widget-footer">
                                <a href="/chat">{t('chatWidget.openFullChat')}</a>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};
