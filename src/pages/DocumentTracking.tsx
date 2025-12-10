import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { StatusBadge, SecurityBadge } from '../components/UI/Badge';
import { Table } from '../components/UI/Table';
import { Select } from '../components/UI/Input';
import { Eye, Download } from 'lucide-react';
import { mockDocuments } from '../data/mockData';
import { formatDate, getDaysRemaining } from '../utils/helpers';

export const DocumentTracking: React.FC = () => {
    const { t } = useTranslation();
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDept, setFilterDept] = useState('all');

    const filteredDocs = mockDocuments.filter(doc => {
        if (filterStatus !== 'all' && doc.status !== filterStatus) return false;
        if (filterDept !== 'all' && doc.department !== filterDept) return false;
        return true;
    });

    const columns = [
        {
            key: 'referenceNumber',
            header: t('documentTracking.columns.reference'),
            sortable: true
        },
        {
            key: 'title',
            header: t('documentTracking.columns.title'),
            sortable: true,
            render: (doc: any) => (
                <div>
                    <div style={{ fontWeight: 600 }}>{doc.title}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>
                        {doc.sender}
                    </div>
                </div>
            )
        },
        {
            key: 'classification',
            header: t('documentTracking.columns.classification'),
            render: (doc: any) => <SecurityBadge classification={doc.classification} />
        },
        {
            key: 'status',
            header: t('documentTracking.columns.status'),
            render: (doc: any) => <StatusBadge status={doc.status} />
        },
        {
            key: 'assignedTo',
            header: t('documentTracking.columns.assignedTo'),
            sortable: true
        },
        {
            key: 'dueDate',
            header: t('documentTracking.columns.dueDate'),
            sortable: true,
            render: (doc: any) => {
                const days = getDaysRemaining(doc.dueDate);
                return (
                    <div>
                        <div>{formatDate(doc.dueDate)}</div>
                        <div style={{
                            fontSize: 'var(--text-xs)',
                            color: days < 0 ? 'var(--color-danger-600)' : days < 3 ? 'var(--color-warning-600)' : 'var(--color-gray-500)'
                        }}>
                            {days < 0
                                ? t('documentTracking.daysOverdue', { count: Math.abs(days) })
                                : t('documentTracking.daysLeft', { count: days })}
                        </div>
                    </div>
                );
            }
        },
        {
            key: 'actions',
            header: t('documentTracking.columns.actions'),
            render: () => (
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <Button variant="ghost" size="sm" icon={<Eye size={16} />}>
                        {t('common.view')}
                    </Button>
                </div>
            )
        }
    ];

    const getStatusLabel = (s: string) => {
        if (s === 'Pending Verification') return t('status.pendingVerification');
        if (s === 'In Progress') return t('status.inProgress');
        if (s === 'Approved') return t('status.approved');
        if (s === 'Closed') return t('status.closed');
        return s;
    };

    const getDeptLabel = (d: string) => {
        return t(`departments.${d.toLowerCase()}`);
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">{t('documentTracking.title')}</h1>
                    <p className="page-description">{t('documentTracking.description')}</p>
                </div>
                <div className="page-actions">
                    <Button variant="outline" icon={<Download size={18} />}>
                        {t('documentTracking.export')}
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <h3 style={{ margin: 0 }}>{t('documentTracking.allDocuments')} ({filteredDocs.length})</h3>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                            <Select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                options={[
                                    { value: 'all', label: t('documentTracking.allStatuses') },
                                    { value: 'Pending Verification', label: getStatusLabel('Pending Verification') },
                                    { value: 'In Progress', label: getStatusLabel('In Progress') },
                                    { value: 'Approved', label: getStatusLabel('Approved') },
                                    { value: 'Closed', label: getStatusLabel('Closed') }
                                ]}
                            />
                            <Select
                                value={filterDept}
                                onChange={(e) => setFilterDept(e.target.value)}
                                options={[
                                    { value: 'all', label: t('documentTracking.allDepartments') },
                                    { value: 'Finance', label: getDeptLabel('Finance') },
                                    { value: 'HR', label: getDeptLabel('HR') },
                                    { value: 'Security', label: getDeptLabel('Security') },
                                    { value: 'Development', label: getDeptLabel('Development') }
                                ]}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody style={{ padding: 0 }}>
                    <Table
                        data={filteredDocs}
                        columns={columns}
                        searchable
                        searchPlaceholder={t('header.search')}
                    />
                </CardBody>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-xl)' }}>
                <Card>
                    <CardBody>
                        <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-sm)' }}>
                            {t('documentTracking.onTrack')}
                        </h4>
                        <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-success-600)' }}>
                            {mockDocuments.filter(d => getDaysRemaining(d.dueDate) >= 3).length}
                        </p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-sm)' }}>
                            {t('documentTracking.dueSoon')}
                        </h4>
                        <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-warning-600)' }}>
                            {mockDocuments.filter(d => getDaysRemaining(d.dueDate) < 3 && getDaysRemaining(d.dueDate) >= 0).length}
                        </p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-sm)' }}>
                            {t('documentTracking.overdue')}
                        </h4>
                        <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-danger-600)' }}>
                            {mockDocuments.filter(d => getDaysRemaining(d.dueDate) < 0).length}
                        </p>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
