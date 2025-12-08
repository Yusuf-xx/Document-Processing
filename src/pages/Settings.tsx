import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input, Select } from '../components/UI/Input';
import { Badge } from '../components/UI/Badge';
import {
    Save,
    Shield,
    Bell,
    Globe,
    Palette,
    Database,
    Lock,
    Mail,
    Moon,
    Sun
} from 'lucide-react';

export const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState({
        // General
        organizationName: 'Malaysian Government Agency',
        timezone: 'Asia/Kuala_Lumpur',
        language: 'en',
        dateFormat: 'DD/MM/YYYY',

        // Security
        sessionTimeout: '30',
        passwordExpiry: '90',
        twoFactorAuth: false,

        // Notifications
        emailNotifications: true,
        documentAlerts: true,
        systemUpdates: false,

        // Appearance
        theme: 'light',
        compactMode: false
    });

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    const handleChange = (key: string, value: any) => {
        setSettings({ ...settings, [key]: value });
    };

    const tabs = [
        { id: 'general', label: 'General', icon: <Globe size={18} /> },
        { id: 'security', label: 'Security', icon: <Shield size={18} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
        { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
        { id: 'system', label: 'System', icon: <Database size={18} /> }
    ];

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Settings</h1>
                    <p className="page-description">Configure system settings and preferences</p>
                </div>
                <div className="page-actions">
                    <Button icon={<Save size={18} />} onClick={handleSave}>
                        Save Changes
                    </Button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: 'var(--spacing-xl)' }}>
                {/* Sidebar Navigation */}
                <Card style={{ height: 'fit-content' }}>
                    <CardBody style={{ padding: 'var(--spacing-md)' }}>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-md)',
                                        padding: 'var(--spacing-md)',
                                        border: 'none',
                                        background: activeTab === tab.id ? 'var(--color-primary-50)' : 'transparent',
                                        color: activeTab === tab.id ? 'var(--color-primary-700)' : 'var(--color-gray-700)',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        fontSize: 'var(--text-sm)',
                                        fontWeight: activeTab === tab.id ? 600 : 400,
                                        transition: 'all var(--transition-fast)',
                                        textAlign: 'left'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (activeTab !== tab.id) {
                                            e.currentTarget.style.background = 'var(--color-gray-100)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (activeTab !== tab.id) {
                                            e.currentTarget.style.background = 'transparent';
                                        }
                                    }}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </CardBody>
                </Card>

                {/* Settings Content */}
                <div>
                    {/* General Settings */}
                    {activeTab === 'general' && (
                        <Card>
                            <CardHeader>
                                <h3 style={{ margin: 0 }}>General Settings</h3>
                            </CardHeader>
                            <CardBody>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                                    <div>
                                        <Input
                                            label="Organization Name"
                                            value={settings.organizationName}
                                            onChange={(e) => handleChange('organizationName', e.target.value)}
                                            placeholder="Enter organization name"
                                        />
                                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginTop: 'var(--spacing-xs)' }}>
                                            This name will appear in reports and documents
                                        </p>
                                    </div>

                                    <div>
                                        <Select
                                            label="Timezone"
                                            value={settings.timezone}
                                            onChange={(e) => handleChange('timezone', e.target.value)}
                                            options={[
                                                { value: 'Asia/Kuala_Lumpur', label: 'Asia/Kuala Lumpur (GMT+8)' },
                                                { value: 'Asia/Singapore', label: 'Asia/Singapore (GMT+8)' },
                                                { value: 'Asia/Jakarta', label: 'Asia/Jakarta (GMT+7)' },
                                                { value: 'Asia/Bangkok', label: 'Asia/Bangkok (GMT+7)' }
                                            ]}
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                        <Select
                                            label="Language"
                                            value={settings.language}
                                            onChange={(e) => handleChange('language', e.target.value)}
                                            options={[
                                                { value: 'en', label: 'English' },
                                                { value: 'ms', label: 'Bahasa Malaysia' },
                                                { value: 'zh', label: '中文' }
                                            ]}
                                        />

                                        <Select
                                            label="Date Format"
                                            value={settings.dateFormat}
                                            onChange={(e) => handleChange('dateFormat', e.target.value)}
                                            options={[
                                                { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                                                { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                                                { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
                                            ]}
                                        />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
                        <Card>
                            <CardHeader>
                                <h3 style={{ margin: 0 }}>Security Settings</h3>
                            </CardHeader>
                            <CardBody>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                                    <div>
                                        <Select
                                            label="Session Timeout"
                                            value={settings.sessionTimeout}
                                            onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                                            options={[
                                                { value: '15', label: '15 minutes' },
                                                { value: '30', label: '30 minutes' },
                                                { value: '60', label: '1 hour' },
                                                { value: '120', label: '2 hours' }
                                            ]}
                                        />
                                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginTop: 'var(--spacing-xs)' }}>
                                            Automatically log out users after period of inactivity
                                        </p>
                                    </div>

                                    <div>
                                        <Select
                                            label="Password Expiry"
                                            value={settings.passwordExpiry}
                                            onChange={(e) => handleChange('passwordExpiry', e.target.value)}
                                            options={[
                                                { value: '30', label: '30 days' },
                                                { value: '60', label: '60 days' },
                                                { value: '90', label: '90 days' },
                                                { value: 'never', label: 'Never' }
                                            ]}
                                        />
                                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginTop: 'var(--spacing-xs)' }}>
                                            Require users to change passwords periodically
                                        </p>
                                    </div>

                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
                                            <div>
                                                <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>
                                                    Two-Factor Authentication
                                                </div>
                                                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                                                    Require additional verification for login
                                                </div>
                                            </div>
                                            <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={settings.twoFactorAuth}
                                                    onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
                                                    style={{ opacity: 0, width: 0, height: 0 }}
                                                />
                                                <span style={{
                                                    position: 'absolute',
                                                    cursor: 'pointer',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    background: settings.twoFactorAuth ? 'var(--color-primary-500)' : 'var(--color-gray-300)',
                                                    borderRadius: '24px',
                                                    transition: 'var(--transition-fast)'
                                                }}>
                                                    <span style={{
                                                        position: 'absolute',
                                                        content: '',
                                                        height: '18px',
                                                        width: '18px',
                                                        left: settings.twoFactorAuth ? '27px' : '3px',
                                                        bottom: '3px',
                                                        background: 'white',
                                                        borderRadius: '50%',
                                                        transition: 'var(--transition-fast)'
                                                    }} />
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div style={{ padding: 'var(--spacing-md)', background: 'var(--color-warning-50)', border: '1px solid var(--color-warning-200)', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                                            <Lock size={20} style={{ color: 'var(--color-warning-700)', flexShrink: 0 }} />
                                            <div>
                                                <div style={{ fontWeight: 600, color: 'var(--color-warning-900)', marginBottom: 'var(--spacing-xs)' }}>
                                                    Security Recommendation
                                                </div>
                                                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-warning-800)' }}>
                                                    We recommend enabling two-factor authentication and setting password expiry to 90 days or less for enhanced security.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    )}

                    {/* Notifications Settings */}
                    {activeTab === 'notifications' && (
                        <Card>
                            <CardHeader>
                                <h3 style={{ margin: 0 }}>Notification Settings</h3>
                            </CardHeader>
                            <CardBody>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                            <Mail size={20} style={{ color: 'var(--color-primary-600)' }} />
                                            <div>
                                                <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>
                                                    Email Notifications
                                                </div>
                                                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                                                    Receive email updates for important events
                                                </div>
                                            </div>
                                        </div>
                                        <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                                            <input
                                                type="checkbox"
                                                checked={settings.emailNotifications}
                                                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                                                style={{ opacity: 0, width: 0, height: 0 }}
                                            />
                                            <span style={{
                                                position: 'absolute',
                                                cursor: 'pointer',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: settings.emailNotifications ? 'var(--color-primary-500)' : 'var(--color-gray-300)',
                                                borderRadius: '24px',
                                                transition: 'var(--transition-fast)'
                                            }}>
                                                <span style={{
                                                    position: 'absolute',
                                                    content: '',
                                                    height: '18px',
                                                    width: '18px',
                                                    left: settings.emailNotifications ? '27px' : '3px',
                                                    bottom: '3px',
                                                    background: 'white',
                                                    borderRadius: '50%',
                                                    transition: 'var(--transition-fast)'
                                                }} />
                                            </span>
                                        </label>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                            <Bell size={20} style={{ color: 'var(--color-warning-600)' }} />
                                            <div>
                                                <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>
                                                    Document Alerts
                                                </div>
                                                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                                                    Get notified about document status changes
                                                </div>
                                            </div>
                                        </div>
                                        <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                                            <input
                                                type="checkbox"
                                                checked={settings.documentAlerts}
                                                onChange={(e) => handleChange('documentAlerts', e.target.checked)}
                                                style={{ opacity: 0, width: 0, height: 0 }}
                                            />
                                            <span style={{
                                                position: 'absolute',
                                                cursor: 'pointer',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: settings.documentAlerts ? 'var(--color-primary-500)' : 'var(--color-gray-300)',
                                                borderRadius: '24px',
                                                transition: 'var(--transition-fast)'
                                            }}>
                                                <span style={{
                                                    position: 'absolute',
                                                    content: '',
                                                    height: '18px',
                                                    width: '18px',
                                                    left: settings.documentAlerts ? '27px' : '3px',
                                                    bottom: '3px',
                                                    background: 'white',
                                                    borderRadius: '50%',
                                                    transition: 'var(--transition-fast)'
                                                }} />
                                            </span>
                                        </label>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                            <Database size={20} style={{ color: 'var(--color-info-600)' }} />
                                            <div>
                                                <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>
                                                    System Updates
                                                </div>
                                                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                                                    Receive notifications about system maintenance
                                                </div>
                                            </div>
                                        </div>
                                        <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                                            <input
                                                type="checkbox"
                                                checked={settings.systemUpdates}
                                                onChange={(e) => handleChange('systemUpdates', e.target.checked)}
                                                style={{ opacity: 0, width: 0, height: 0 }}
                                            />
                                            <span style={{
                                                position: 'absolute',
                                                cursor: 'pointer',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: settings.systemUpdates ? 'var(--color-primary-500)' : 'var(--color-gray-300)',
                                                borderRadius: '24px',
                                                transition: 'var(--transition-fast)'
                                            }}>
                                                <span style={{
                                                    position: 'absolute',
                                                    content: '',
                                                    height: '18px',
                                                    width: '18px',
                                                    left: settings.systemUpdates ? '27px' : '3px',
                                                    bottom: '3px',
                                                    background: 'white',
                                                    borderRadius: '50%',
                                                    transition: 'var(--transition-fast)'
                                                }} />
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    )}

                    {/* Appearance Settings */}
                    {activeTab === 'appearance' && (
                        <Card>
                            <CardHeader>
                                <h3 style={{ margin: 0 }}>Appearance Settings</h3>
                            </CardHeader>
                            <CardBody>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--spacing-md)', color: 'var(--color-gray-700)' }}>
                                            Theme
                                        </label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)' }}>
                                            <div
                                                onClick={() => handleChange('theme', 'light')}
                                                style={{
                                                    padding: 'var(--spacing-lg)',
                                                    border: `2px solid ${settings.theme === 'light' ? 'var(--color-primary-500)' : 'var(--color-gray-200)'}`,
                                                    borderRadius: 'var(--radius-lg)',
                                                    cursor: 'pointer',
                                                    background: settings.theme === 'light' ? 'var(--color-primary-50)' : 'white',
                                                    transition: 'all var(--transition-fast)'
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                                    <Sun size={24} style={{ color: 'var(--color-warning-600)' }} />
                                                    <div style={{ fontWeight: 600 }}>Light Mode</div>
                                                </div>
                                                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                                                    Clean and bright interface
                                                </div>
                                            </div>

                                            <div
                                                onClick={() => handleChange('theme', 'dark')}
                                                style={{
                                                    padding: 'var(--spacing-lg)',
                                                    border: `2px solid ${settings.theme === 'dark' ? 'var(--color-primary-500)' : 'var(--color-gray-200)'}`,
                                                    borderRadius: 'var(--radius-lg)',
                                                    cursor: 'pointer',
                                                    background: settings.theme === 'dark' ? 'var(--color-primary-50)' : 'white',
                                                    transition: 'all var(--transition-fast)'
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                                    <Moon size={24} style={{ color: 'var(--color-info-600)' }} />
                                                    <div style={{ fontWeight: 600 }}>Dark Mode</div>
                                                </div>
                                                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                                                    Easy on the eyes
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
                                        <div>
                                            <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>
                                                Compact Mode
                                            </div>
                                            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                                                Reduce spacing for denser information display
                                            </div>
                                        </div>
                                        <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                                            <input
                                                type="checkbox"
                                                checked={settings.compactMode}
                                                onChange={(e) => handleChange('compactMode', e.target.checked)}
                                                style={{ opacity: 0, width: 0, height: 0 }}
                                            />
                                            <span style={{
                                                position: 'absolute',
                                                cursor: 'pointer',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: settings.compactMode ? 'var(--color-primary-500)' : 'var(--color-gray-300)',
                                                borderRadius: '24px',
                                                transition: 'var(--transition-fast)'
                                            }}>
                                                <span style={{
                                                    position: 'absolute',
                                                    content: '',
                                                    height: '18px',
                                                    width: '18px',
                                                    left: settings.compactMode ? '27px' : '3px',
                                                    bottom: '3px',
                                                    background: 'white',
                                                    borderRadius: '50%',
                                                    transition: 'var(--transition-fast)'
                                                }} />
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    )}

                    {/* System Settings */}
                    {activeTab === 'system' && (
                        <Card>
                            <CardHeader>
                                <h3 style={{ margin: 0 }}>System Information</h3>
                            </CardHeader>
                            <CardBody>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
                                        <span style={{ color: 'var(--color-gray-600)' }}>System Version</span>
                                        <strong>v1.0.0</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
                                        <span style={{ color: 'var(--color-gray-600)' }}>Database Status</span>
                                        <Badge variant="success">Connected</Badge>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
                                        <span style={{ color: 'var(--color-gray-600)' }}>Last Backup</span>
                                        <strong>2024-12-08 10:30 AM</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
                                        <span style={{ color: 'var(--color-gray-600)' }}>Storage Used</span>
                                        <strong>2.4 GB / 10 GB</strong>
                                    </div>

                                    <div style={{ marginTop: 'var(--spacing-lg)' }}>
                                        <Button variant="outline" fullWidth>
                                            Run System Diagnostics
                                        </Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};
