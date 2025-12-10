import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import {
    Send,
    FileText,
    FileSpreadsheet,
    Presentation,
    Download,
    Sparkles,
    Bot,
    User
} from 'lucide-react';
import './Chat.css';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    actions?: DocumentAction[];
}

interface DocumentAction {
    type: 'document' | 'spreadsheet' | 'presentation';
    title: string;
    description: string;
}

export const Chat: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: t('chat.welcomeMessage'),
            timestamp: new Date(),
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Update welcome message when language changes
    useEffect(() => {
        setMessages(prev => {
            const updatedMessages = [...prev];
            if (updatedMessages.length > 0 && updatedMessages[0].id === '1') {
                updatedMessages[0] = {
                    ...updatedMessages[0],
                    content: t('chat.welcomeMessage')
                };
            }
            return updatedMessages;
        });
    }, [i18n.language, t]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: t('chat.sampleResponse'),
                timestamp: new Date(),
                actions: [
                    {
                        type: 'document',
                        title: t('chat.actions.monthlyReport'),
                        description: t('chat.actions.monthlyReportDesc')
                    },
                    {
                        type: 'spreadsheet',
                        title: t('chat.actions.dataAnalysis'),
                        description: t('chat.actions.dataAnalysisDesc')
                    },
                    {
                        type: 'presentation',
                        title: t('chat.actions.executiveSummary'),
                        description: t('chat.actions.executiveSummaryDesc')
                    }
                ]
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

    const getDocumentIcon = (type: string) => {
        switch (type) {
            case 'document':
                return <FileText size={20} />;
            case 'spreadsheet':
                return <FileSpreadsheet size={20} />;
            case 'presentation':
                return <Presentation size={20} />;
            default:
                return <FileText size={20} />;
        }
    };

    const quickActions = [
        { label: t('chat.quickActions.summarize'), icon: <Sparkles size={16} /> },
        { label: t('chat.quickActions.generateReport'), icon: <FileText size={16} /> },
        { label: t('chat.quickActions.analyzeData'), icon: <FileSpreadsheet size={16} /> },
        { label: t('chat.quickActions.createPresentation'), icon: <Presentation size={16} /> },
    ];

    return (
        <div className="page-content chat-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">{t('chat.title')}</h1>
                    <p className="page-description">{t('chat.description')}</p>
                </div>
            </div>

            <div className="chat-container">
                {/* Sidebar with Quick Actions */}
                <div className="chat-sidebar">
                    <Card>
                        <CardBody>
                            <h3 className="chat-sidebar-title">{t('chat.quickActions.title')}</h3>
                            <div className="quick-actions-list">
                                {quickActions.map((action, index) => (
                                    <button
                                        key={index}
                                        className="quick-action-btn"
                                        onClick={() => setInputValue(action.label)}
                                    >
                                        {action.icon}
                                        <span>{action.label}</span>
                                    </button>
                                ))}
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="chat-info-card">
                        <CardBody>
                            <h4 className="chat-info-title">{t('chat.capabilities.title')}</h4>
                            <ul className="chat-capabilities-list">
                                <li>{t('chat.capabilities.analyze')}</li>
                                <li>{t('chat.capabilities.generate')}</li>
                                <li>{t('chat.capabilities.insights')}</li>
                                <li>{t('chat.capabilities.automate')}</li>
                            </ul>
                        </CardBody>
                    </Card>
                </div>

                {/* Main Chat Area */}
                <div className="chat-main">
                    <Card className="chat-messages-card">
                        <CardBody className="chat-messages-body">
                            <div className="chat-messages">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`chat-message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
                                    >
                                        <div className="message-avatar">
                                            {message.role === 'user' ? (
                                                <User size={20} />
                                            ) : (
                                                <Bot size={20} />
                                            )}
                                        </div>
                                        <div className="message-content">
                                            <div className="message-header">
                                                <span className="message-role">
                                                    {message.role === 'user' ? t('chat.you') : t('chat.assistant')}
                                                </span>
                                                <span className="message-time">
                                                    {message.timestamp.toLocaleTimeString()}
                                                </span>
                                            </div>
                                            <div className="message-text">{message.content}</div>

                                            {/* Document Actions */}
                                            {message.actions && message.actions.length > 0 && (
                                                <div className="message-actions">
                                                    <p className="actions-label">{t('chat.suggestedDocuments')}</p>
                                                    <div className="document-actions-grid">
                                                        {message.actions.map((action, index) => (
                                                            <div key={index} className="document-action-card">
                                                                <div className="document-action-icon">
                                                                    {getDocumentIcon(action.type)}
                                                                </div>
                                                                <div className="document-action-content">
                                                                    <h4>{action.title}</h4>
                                                                    <p>{action.description}</p>
                                                                </div>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    icon={<Download size={16} />}
                                                                >
                                                                    {t('chat.generate')}
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="chat-message assistant-message">
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
                        </CardBody>
                    </Card>

                    {/* Input Area */}
                    <div className="chat-input-container">
                        <Card>
                            <CardBody className="chat-input-body">
                                <textarea
                                    className="chat-input"
                                    placeholder={t('chat.inputPlaceholder')}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    rows={3}
                                />
                                <div className="chat-input-actions">
                                    <span className="chat-input-hint">{t('chat.inputHint')}</span>
                                    <Button
                                        onClick={handleSend}
                                        disabled={!inputValue.trim()}
                                        icon={<Send size={18} />}
                                    >
                                        {t('chat.send')}
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
