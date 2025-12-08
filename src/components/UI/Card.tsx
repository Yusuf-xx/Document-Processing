import React from 'react';
import './Card.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hover?: boolean;
    style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hover = false, style }) => {
    return (
        <div
            className={`card ${hover ? 'card-hover' : ''} ${className}`}
            onClick={onClick}
            style={style}
        >
            {children}
        </div>
    );
};

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
    return <div className={`card-header ${className}`}>{children}</div>;
};

interface CardBodyProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '', style }) => {
    return <div className={`card-body ${className}`} style={style}>{children}</div>;
};

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
    return <div className={`card-footer ${className}`}>{children}</div>;
};
