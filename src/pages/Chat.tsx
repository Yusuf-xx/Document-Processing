import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Send,
    Paperclip,
    Bot,
    User,
    Plus,
    MessageSquare,
    FileText,
    MoreHorizontal,
    Download,
    Cpu
} from 'lucide-react';
import './Chat.css';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    attachments?: Array<{ type: string; name: string; url: string }>;
}

export const Chat: React.FC = () => {
    const { t } = useTranslation();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: t('chat.welcome'),
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Ensure we have a welcome message when the component mounts
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{
                id: '1',
                text: t('chat.welcome'),
                sender: 'ai',
                timestamp: new Date()
            }]);
        }
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Mock AI response
        setTimeout(() => {
            let aiResponseText = "I can help you with that. ";
            const attachments = [];

            if (input.toLowerCase().includes('report') || input.toLowerCase().includes('laporan')) {
                aiResponseText += t('chat.generatedDocument');
                attachments.push({
                    type: 'pdf',
                    name: 'Monthly_Report_2024.pdf',
                    url: '#'
                });
            } else if (input.toLowerCase().includes('summary') || input.toLowerCase().includes('ringkasan')) {
                aiResponseText += "Here is a summary of your recent documents: 3 approved, 2 pending review, and 1 rejected.";
            } else {
                aiResponseText += t('chat.suggestions.analysis');
            }

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: aiResponseText,
                sender: 'ai',
                timestamp: new Date(),
                attachments: attachments.length > 0 ? attachments : undefined
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-sidebar">
                <button className="new-chat-btn">
                    <Plus size={16} />
                    {t('chat.newChat')}
                </button>
                <div className="chat-history">
                    <div className="history-label">{t('chat.history')}</div>
                    <div className="history-item active">
                        <MessageSquare size={16} />
                        <span>Document Analysis 2024</span>
                    </div>
                    <div className="history-item">
                        <MessageSquare size={16} />
                        <span>Pending Reviews</span>
                    </div>
                    <div className="history-item">
                        <MessageSquare size={16} />
                        <span>SLA Report Q3</span>
                    </div>
                </div>
                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="avatar">A</div>
                        <div className="user-info">
                            <span className="name">Admin User</span>
                            <span className="role">Administrator</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="chat-main">
                <div className="chat-header">
                    <div className="model-selector">
                        <Cpu size={18} />
                        <span>IDCM AI Model v2.0</span>
                    </div>
                    <div className="header-actions">
                        <MoreHorizontal size={20} />
                    </div>
                </div>

                <div className="messages-area">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                            <div className="message-avatar">
                                {msg.sender === 'ai' ? <Bot size={20} /> : <User size={20} />}
                            </div>
                            <div className="message-content">
                                <div className="message-author">
                                    {msg.sender === 'ai' ? t('chat.title') : 'You'}
                                </div>
                                <div className="message-bubble">
                                    {msg.text}
                                    {msg.attachments && (
                                        <div className="message-attachments">
                                            {msg.attachments.map((att, idx) => (
                                                <div key={idx} className="attachment-card">
                                                    <div className="attachment-icon">
                                                        <FileText size={24} />
                                                    </div>
                                                    <div className="attachment-info">
                                                        <span className="attachment-name">{att.name}</span>
                                                        <span className="attachment-type">{att.type.toUpperCase()}</span>
                                                    </div>
                                                    <button className="download-btn">
                                                        <Download size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="message-time">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message-wrapper ai">
                            <div className="message-avatar">
                                <Bot size={20} />
                            </div>
                            <div className="message-content">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="input-area">
                    <div className="input-container">
                        <button className="attach-btn">
                            <Paperclip size={20} />
                        </button>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder={t('chat.inputPlaceholder')}
                            rows={1}
                        />
                        <button
                            className={`send-btn ${input.trim() ? 'active' : ''}`}
                            onClick={handleSend}
                            disabled={!input.trim()}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <div className="input-footer">
                        AI can make mistakes. Please verify important information.
                    </div>
                </div>
            </div>
        </div>
    );
};
