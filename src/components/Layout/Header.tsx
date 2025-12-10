import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Bell, Settings as SettingsIcon, ChevronDown, FileText, ScanLine } from 'lucide-react';

interface HeaderProps {
    title?: string;
    breadcrumbs?: { label: string; path?: string }[];
}

export const Header: React.FC<HeaderProps> = ({ breadcrumbs }) => {
    const { t, i18n } = useTranslation();
    const [showQuickActions, setShowQuickActions] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ms' : 'en');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowQuickActions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className="header-left">
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <div className="breadcrumbs">
                        {breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <span className="breadcrumb-separator">/</span>}
                                <span className={index === breadcrumbs.length - 1 ? 'breadcrumb-current' : ''}>
                                    {crumb.label}
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>

            <div className="header-right">
                <div className="header-search">
                    <Search className="header-search-icon" size={16} />
                    <input type="text" placeholder={t('header.search')} />
                </div>

                <div className="header-actions-container" ref={dropdownRef}>
                    <button className="language-toggle" onClick={toggleLanguage}>
                        {i18n.language === 'en' ? 'Bahasa Melayu' : 'English'}
                    </button>

                    <button className="header-icon-button">
                        <Bell size={20} />
                        <span className="badge">5</span>
                    </button>

                    <div style={{ position: 'relative' }}>
                        <button
                            className={`header-icon-button ${showQuickActions ? 'active' : ''}`}
                            onClick={() => setShowQuickActions(!showQuickActions)}
                        >
                            <SettingsIcon size={20} />
                        </button>

                        {showQuickActions && (
                            <div className="dropdown-menu">
                                <div className="dropdown-header">{t('header.quickActions')}</div>
                                <div className="dropdown-item">
                                    <ScanLine size={16} />
                                    <span>{t('header.scanDocument')}</span>
                                </div>
                                <div className="dropdown-item">
                                    <FileText size={16} />
                                    <span>{t('header.uploadFile')}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="user-menu">
                    <div className="user-avatar">AM</div>
                    <div className="user-info">
                        <div className="user-name">Admin User</div>
                        <div className="user-role">{t('common.administrator')}</div>
                    </div>
                    <ChevronDown size={16} />
                </div>
            </div>
        </header>
    );
};
