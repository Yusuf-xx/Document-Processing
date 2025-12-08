import React from 'react';
import './Badge.css';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'gray';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    size = 'md',
    className = ''
}) => {
    return (
        <span className={`badge badge-${variant} badge-${size} ${className}`}>
            {children}
        </span>
    );
};

// Status-specific badges
export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const getVariant = (): BadgeVariant => {
        const statusLower = status.toLowerCase();
        if (statusLower.includes('approved') || statusLower.includes('completed') || statusLower.includes('closed')) {
            return 'success';
        }
        if (statusLower.includes('pending') || statusLower.includes('waiting')) {
            return 'warning';
        }
        if (statusLower.includes('rejected') || statusLower.includes('overdue')) {
            return 'danger';
        }
        if (statusLower.includes('progress') || statusLower.includes('processing')) {
            return 'info';
        }
        return 'default';
    };

    return <Badge variant={getVariant()}>{status}</Badge>;
};

// Security classification badges
export const SecurityBadge: React.FC<{ classification: string }> = ({ classification }) => {
    const getVariant = (): BadgeVariant => {
        const classLower = classification.toLowerCase();
        if (classLower.includes('top secret')) return 'danger';
        if (classLower.includes('secret')) return 'danger';
        if (classLower.includes('confidential')) return 'warning';
        if (classLower.includes('restricted')) return 'info';
        if (classLower.includes('internal')) return 'gray';
        return 'success'; // Open
    };

    return <Badge variant={getVariant()}>{classification}</Badge>;
};
