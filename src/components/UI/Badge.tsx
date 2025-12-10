import React from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();

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

    const getTranslationKey = (statusStr: string) => {
        const s = statusStr.toLowerCase();
        if (s === 'pending verification') return 'status.pendingVerification';
        if (s === 'pending classification') return 'status.pendingClassification';
        if (s === 'pending ocr') return 'status.pendingOcr';
        if (s === 'pending scan') return 'status.pendingScan';
        if (s === 'pending review') return 'status.pendingReview';

        if (s.includes('approved')) return 'status.approved';
        if (s.includes('completed')) return 'status.completed';
        if (s.includes('closed')) return 'status.closed';
        if (s.includes('waiting')) return 'status.waiting';
        if (s.includes('rejected')) return 'status.rejected';
        if (s.includes('overdue')) return 'status.overdue';
        if (s.includes('ocr verified')) return 'status.ocrVerified';

        if (s.includes('progress')) return 'status.inProgress';
        if (s.includes('processing')) return 'status.processing';

        if (s.includes('received')) return 'status.received';
        if (s.includes('scanned')) return 'status.scanned';
        if (s.includes('archived')) return 'status.archived';

        if (s.includes('new')) return 'status.new';
        if (s.includes('assigned')) return 'status.assigned';
        if (s.includes('pending')) return 'status.pending';

        return statusStr; // Fallback
    };

    const translationKey = getTranslationKey(status);
    const displayText = translationKey.startsWith('status.') ? t(translationKey) : status;

    return <Badge variant={getVariant()}>{displayText}</Badge>;
};

// Security classification badges
export const SecurityBadge: React.FC<{ classification: string }> = ({ classification }) => {
    const { t } = useTranslation();

    const getVariant = (): BadgeVariant => {
        const classLower = classification.toLowerCase();
        if (classLower.includes('top secret')) return 'danger';
        if (classLower.includes('secret')) return 'danger';
        if (classLower.includes('confidential')) return 'warning';
        if (classLower.includes('restricted')) return 'info';
        if (classLower.includes('internal')) return 'gray';
        return 'success'; // Open
    };

    const getTranslationKey = (classStr: string) => {
        const c = classStr.toLowerCase();
        if (c.includes('top secret')) return 'classification.topSecret';
        if (c.includes('secret')) return 'classification.secret';
        if (c.includes('confidential')) return 'classification.confidential';
        if (c.includes('restricted')) return 'classification.restricted';
        if (c.includes('internal')) return 'classification.internalUse';
        if (c.includes('open')) return 'classification.open';
        return classStr;
    };

    const translationKey = getTranslationKey(classification);
    const displayText = translationKey.startsWith('classification.') ? t(translationKey) : classification;

    return <Badge variant={getVariant()}>{displayText}</Badge>;
};
