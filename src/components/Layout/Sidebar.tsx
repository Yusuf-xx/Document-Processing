import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    LayoutDashboard,
    FileText,
    Scan,
    CheckSquare,
    FolderTree,
    Activity,
    Archive,
    Users,
    BarChart3,
    Settings,
    Bell,
    Calendar,
    MessageCircle
} from 'lucide-react';

import logo from '../../assets/logo.jpg';

interface NavItem {
    path: string;
    labelKey: string;
    icon: React.ReactNode;
    badge?: number;
}

interface NavSection {
    titleKey: string;
    items: NavItem[];
}

const navSections: NavSection[] = [
    {
        titleKey: 'nav.main',
        items: [
            { path: '/', labelKey: 'nav.dashboard', icon: <LayoutDashboard size={18} /> },
            { path: '/calendar', labelKey: 'nav.calendar', icon: <Calendar size={18} /> },
            { path: '/chat', labelKey: 'nav.aiAssistant', icon: <MessageCircle size={18} /> },
        ]
    },
    {
        titleKey: 'nav.documentProcessing',
        items: [
            { path: '/receipt', labelKey: 'nav.documentReceipt', icon: <FileText size={18} /> },
            { path: '/scan', labelKey: 'nav.scanning', icon: <Scan size={18} /> },
            { path: '/verification', labelKey: 'nav.ocrVerification', icon: <CheckSquare size={18} />, badge: 3 },
            { path: '/classification', labelKey: 'nav.classification', icon: <FolderTree size={18} /> },
        ]
    },
    {
        titleKey: 'nav.monitoring',
        items: [
            { path: '/tracking', labelKey: 'nav.documentTracking', icon: <Activity size={18} />, badge: 12 },
            { path: '/workflow', labelKey: 'nav.workflow', icon: <Bell size={18} /> },

            { path: '/archive', labelKey: 'nav.archive', icon: <Archive size={18} /> },
        ]
    },
    {
        titleKey: 'nav.administration',
        items: [
            { path: '/users', labelKey: 'nav.userManagement', icon: <Users size={18} /> },
            { path: '/reports', labelKey: 'nav.reports', icon: <BarChart3 size={18} /> },
            { path: '/settings', labelKey: 'nav.settings', icon: <Settings size={18} /> },
        ]
    }
];

export const Sidebar: React.FC = () => {
    const location = useLocation();
    const { t } = useTranslation();

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <img src={logo} alt="Logo" className="sidebar-logo-icon" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                    <div className="sidebar-logo-text">
                        <h1>{t('app.title')}</h1>
                        <p>{t('app.subtitle')}</p>
                    </div>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navSections.map((section) => (
                    <div key={section.titleKey} className="nav-section">
                        <div className="nav-section-title">{t(section.titleKey)}</div>
                        {section.items.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                <span className="nav-item-icon">{item.icon}</span>
                                <span>{t(item.labelKey)}</span>
                                {item.badge && <span className="nav-item-badge">{item.badge}</span>}
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>
        </div>
    );
};
