import React from 'react';
import { Search, Bell, Settings as SettingsIcon, ChevronDown } from 'lucide-react';

interface HeaderProps {
    title?: string;
    breadcrumbs?: { label: string; path?: string }[];
}

export const Header: React.FC<HeaderProps> = ({ breadcrumbs }) => {
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
                    <input type="text" placeholder="Search documents..." />
                </div>

                <button className="header-icon-button">
                    <Bell size={20} />
                    <span className="badge">5</span>
                </button>

                <button className="header-icon-button">
                    <SettingsIcon size={20} />
                </button>

                <div className="user-menu">
                    <div className="user-avatar">AM</div>
                    <div className="user-info">
                        <div className="user-name">Admin User</div>
                        <div className="user-role">Administrator</div>
                    </div>
                    <ChevronDown size={16} />
                </div>
            </div>
        </header>
    );
};
