import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { LogIn, Shield } from 'lucide-react';
import './Login.css';

export const Login: React.FC = () => {
    const navigate = useNavigate();
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
                        <h1>IDCM System</h1>
                        <p>Intelligent Document Capture & Monitoring</p>
                    </div>
                    <div className="login-badge">
                        <Shield size={16} />
                        <span>Government of Malaysia</span>
                    </div>
                </div>

                <div className="login-card">
                    <h2>Welcome Back</h2>
                    <p className="login-subtitle">Sign in to access the document management system</p>

                    <form onSubmit={handleLogin} className="login-form">
                        <Input
                            type="email"
                            label="Email Address"
                            placeholder="your.email@gov.my"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <div className="login-options">
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="forgot-link">Forgot password?</a>
                        </div>

                        <Button type="submit" fullWidth icon={<LogIn size={18} />}>
                            Sign In
                        </Button>
                    </form>

                    <div className="login-footer">
                        <p>For official government use only</p>
                        <p className="text-sm text-gray-500">© 2024 Government of Malaysia. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
