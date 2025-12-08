import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { StatusBadge, SecurityBadge } from '../components/UI/Badge';
import { Table } from '../components/UI/Table';
import { Select } from '../components/UI/Input';
import { Eye, Download } from 'lucide-react';
import { mockDocuments } from '../data/mockData';
import { formatDate, getDaysRemaining } from '../utils/helpers';

export const DocumentTracking: React.FC = () => {
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
            header: 'Reference',
            sortable: true
        },
        {
            key: 'title',
            header: 'Title',
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
            header: 'Classification',
            render: (doc: any) => <SecurityBadge classification={doc.classification} />
        },
        {
            key: 'status',
            header: 'Status',
            render: (doc: any) => <StatusBadge status={doc.status} />
        },
        {
            key: 'assignedTo',
            header: 'Assigned To',
            sortable: true
        },
        {
            key: 'dueDate',
            header: 'Due Date',
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
                            {days < 0 ? `${Math.abs(days)} days overdue` : `${days} days left`}
                        </div>
                    </div>
                );
            }
        },
        {
            key: 'actions',
            header: 'Actions',
            render: () => (
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <Button variant="ghost" size="sm" icon={<Eye size={16} />}>
                        View
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Document Tracking</h1>
                    <p className="page-description">Monitor and track all documents in the system</p>
                </div>
                <div className="page-actions">
                    <Button variant="outline" icon={<Download size={18} />}>
                        Export Report
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <h3 style={{ margin: 0 }}>All Documents ({filteredDocs.length})</h3>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                            <Select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                options={[
                                    { value: 'all', label: 'All Statuses' },
                                    { value: 'Pending Verification', label: 'Pending Verification' },
                                    { value: 'In Progress', label: 'In Progress' },
                                    { value: 'Approved', label: 'Approved' },
                                    { value: 'Closed', label: 'Closed' }
                                ]}
                            />
                            <Select
                                value={filterDept}
                                onChange={(e) => setFilterDept(e.target.value)}
                                options={[
                                    { value: 'all', label: 'All Departments' },
                                    { value: 'Finance', label: 'Finance' },
                                    { value: 'HR', label: 'HR' },
                                    { value: 'Security', label: 'Security' },
                                    { value: 'Development', label: 'Development' }
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
                        searchPlaceholder="Search documents..."
                    />
                </CardBody>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-xl)' }}>
                <Card>
                    <CardBody>
                        <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-sm)' }}>
                            On Track
                        </h4>
                        <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-success-600)' }}>
                            {mockDocuments.filter(d => getDaysRemaining(d.dueDate) >= 3).length}
                        </p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-sm)' }}>
                            Due Soon
                        </h4>
                        <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-warning-600)' }}>
                            {mockDocuments.filter(d => getDaysRemaining(d.dueDate) < 3 && getDaysRemaining(d.dueDate) >= 0).length}
                        </p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-sm)' }}>
                            Overdue
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
