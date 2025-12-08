import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    Calendar
} from 'lucide-react';

interface NavItem {
    path: string;
    label: string;
    icon: React.ReactNode;
    badge?: number;
}

interface NavSection {
    title: string;
    items: NavItem[];
}

const navSections: NavSection[] = [
    {
        title: 'Main',
        items: [
            { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        ]
    },
    {
        title: 'Document Processing',
        items: [
            { path: '/receipt', label: 'Document Receipt', icon: <FileText size={20} /> },
            { path: '/scan', label: 'Scanning', icon: <Scan size={20} /> },
            { path: '/verification', label: 'OCR Verification', icon: <CheckSquare size={20} />, badge: 3 },
            { path: '/classification', label: 'Classification', icon: <FolderTree size={20} /> },
        ]
    },
    {
        title: 'Monitoring',
        items: [
            { path: '/tracking', label: 'Document Tracking', icon: <Activity size={20} />, badge: 12 },
            { path: '/workflow', label: 'Workflow', icon: <Bell size={20} /> },
            { path: '/calendar', label: 'Calendar', icon: <Calendar size={20} /> },
            { path: '/archive', label: 'Archive', icon: <Archive size={20} /> },
        ]
    },
    {
        title: 'Administration',
        items: [
            { path: '/users', label: 'User Management', icon: <Users size={20} /> },
            { path: '/reports', label: 'Reports', icon: <BarChart3 size={20} /> },
            { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
        ]
    }
];

export const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="sidebar-logo-icon">📄</div>
                    <div className="sidebar-logo-text">
                        <h1>IDCM System</h1>
                        <p>Document Management</p>
                    </div>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navSections.map((section) => (
                    <div key={section.title} className="nav-section">
                        <div className="nav-section-title">{section.title}</div>
                        {section.items.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                <span className="nav-item-icon">{item.icon}</span>
                                <span>{item.label}</span>
                                {item.badge && <span className="nav-item-badge">{item.badge}</span>}
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>
        </div>
    );
};
