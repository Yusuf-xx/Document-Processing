import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { LogIn, Shield } from 'lucide-react';
import './Login.css';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login - just navigate to dashboard
        navigate('/');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <div className="login-logo">
                        <div className="login-logo-icon">📄</div>
                        <h1>{t('login.systemName')}</h1>
                        <p>{t('login.systemSubtitle')}</p>
                    </div>
                    <div className="login-badge">
                        <Shield size={16} />
                        <span>{t('login.govName')}</span>
                    </div>
                </div>

                <div className="login-card">
                    <h2>{t('login.welcome')}</h2>
                    <p className="login-subtitle">{t('login.subtitle')}</p>

                    <form onSubmit={handleLogin} className="login-form">
                        <Input
                            type="email"
                            label={t('login.emailLabel')}
                            placeholder={t('login.emailPlaceholder')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            type="password"
                            label={t('login.passwordLabel')}
                            placeholder={t('login.passwordPlaceholder')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <div className="login-options">
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span>{t('login.rememberMe')}</span>
                            </label>
                            <a href="#" className="forgot-link">{t('login.forgotPassword')}</a>
                        </div>

                        <Button type="submit" fullWidth icon={<LogIn size={18} />}>
                            {t('login.signIn')}
                        </Button>
                    </form>

                    <div className="login-footer">
                        <p>{t('login.footerOfficial')}</p>
                        <p className="text-sm text-gray-500">{t('login.footerCopyright')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
