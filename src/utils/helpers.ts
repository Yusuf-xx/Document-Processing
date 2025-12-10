// Utility helper functions

import i18n from '../i18n';

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const locale = i18n.language === 'ms' ? 'ms-MY' : 'en-MY';
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    const locale = i18n.language === 'ms' ? 'ms-MY' : 'en-MY';
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const generateReferenceNumber = (): string => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `DOC-${year}-${random}`;
};

export const getStatusColor = (status: string): string => {
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

export const getClassificationColor = (classification: string): string => {
    const classLower = classification.toLowerCase();
    if (classLower.includes('top secret')) return 'danger';
    if (classLower.includes('secret')) return 'danger';
    if (classLower.includes('confidential')) return 'warning';
    if (classLower.includes('restricted')) return 'info';
    if (classLower.includes('internal')) return 'gray';
    return 'success'; // Open
};

export const getPriorityColor = (priority: string): string => {
    const priorityLower = priority.toLowerCase();
    if (priorityLower === 'critical' || priorityLower === 'high') return 'danger';
    if (priorityLower === 'medium') return 'warning';
    return 'info';
};

export const getDaysRemaining = (dueDate: string): number => {
    const due = new Date(dueDate);
    const today = new Date();
    const diff = due.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const isOverdue = (dueDate: string): boolean => {
    return getDaysRemaining(dueDate) < 0;
};

export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};
