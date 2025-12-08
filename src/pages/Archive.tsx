import React, { useState } from 'react';
import { Card, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input, Select } from '../components/UI/Input';
import { StatusBadge, SecurityBadge } from '../components/UI/Badge';
import {
    Search,
    Download,
    Eye,
    Grid,
    List,
    Archive as ArchiveIcon,
    Calendar,
    FolderOpen,
    FileText,
    TrendingUp
} from 'lucide-react';
import { mockDocuments } from '../data/mockData';
import { formatDate } from '../utils/helpers';

export const Archive: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filterYear, setFilterYear] = useState('all');
    const [filterDept, setFilterDept] = useState('all');
    const [filterClassification, setFilterClassification] = useState('all');

    // Filter archived documents (status: Closed or Archived)
    const archivedDocs = mockDocuments.filter(doc =>
        doc.status === 'Closed' || doc.status === 'Archived'
    );

    const filteredDocs = archivedDocs.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.sender.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesYear = filterYear === 'all' || doc.dateReceived.startsWith(filterYear);
        const matchesDept = filterDept === 'all' || doc.department === filterDept;
        const matchesClass = filterClassification === 'all' || doc.classification === filterClassification;

        return matchesSearch && matchesYear && matchesDept && matchesClass;
    });

    const stats = {
        total: archivedDocs.length,
        thisYear: archivedDocs.filter(d => d.dateReceived.startsWith('2024')).length,
        byDepartment: archivedDocs.reduce((acc, doc) => {
            acc[doc.department] = (acc[doc.department] || 0) + 1;
            return acc;
        }, {} as Record<string, number>)
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Document Archive</h1>
                    <p className="page-description">Search and retrieve archived documents</p>
                </div>
                <div className="page-actions">
                    <Button variant="outline" icon={<Download size={18} />}>
                        Export Archive List
                    </Button>
                </div>
            </div>

            {/* Archive Statistics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                <Card>
                    <CardBody>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'var(--color-primary-100)',
                                color: 'var(--color-primary-600)',
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ArchiveIcon size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                    Total Archived
                                </p>
                                <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, margin: 0 }}>
                                    {stats.total}
                                </h3>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'var(--color-success-100)',
                                color: 'var(--color-success-600)',
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Calendar size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                    This Year
                                </p>
                                <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, margin: 0 }}>
                                    {stats.thisYear}
                                </h3>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'var(--color-warning-100)',
                                color: 'var(--color-warning-600)',
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <FolderOpen size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                    Departments
                                </p>
                                <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, margin: 0 }}>
                                    {Object.keys(stats.byDepartment).length}
                                </h3>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'var(--color-info-100)',
                                color: 'var(--color-info-600)',
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                    Avg. per Month
                                </p>
                                <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, margin: 0 }}>
                                    {Math.round(stats.thisYear / 12)}
                                </h3>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
                <CardBody>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--spacing-md)', alignItems: 'end' }}>
                        <Input
                            label="Search Documents"
                            placeholder="Search by title, reference number, or sender..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            icon={<Search size={18} />}
                        />

                        <Select
                            label="Year"
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                            options={[
                                { value: 'all', label: 'All Years' },
                                { value: '2025', label: '2025' },
                                { value: '2024', label: '2024' },
                                { value: '2023', label: '2023' },
                                { value: '2022', label: '2022' },
                                { value: '2021', label: '2021' }
                            ]}
                        />

                        <Select
                            label="Department"
                            value={filterDept}
                            onChange={(e) => setFilterDept(e.target.value)}
                            options={[
                                { value: 'all', label: 'All Departments' },
                                { value: 'Finance', label: 'Finance' },
                                { value: 'HR', label: 'HR' },
                                { value: 'Security', label: 'Security' },
                                { value: 'Development', label: 'Development' },
                                { value: 'Administration', label: 'Administration' }
                            ]}
                        />

                        <Select
                            label="Classification"
                            value={filterClassification}
                            onChange={(e) => setFilterClassification(e.target.value)}
                            options={[
                                { value: 'all', label: 'All Classifications' },
                                { value: 'Open', label: 'Open' },
                                { value: 'Internal Use', label: 'Internal Use' },
                                { value: 'Restricted', label: 'Restricted' },
                                { value: 'Confidential', label: 'Confidential' },
                                { value: 'Secret', label: 'Secret' },
                                { value: 'Top Secret', label: 'Top Secret' }
                            ]}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--spacing-lg)' }}>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0 }}>
                            Showing <strong>{filteredDocs.length}</strong> of <strong>{archivedDocs.length}</strong> archived documents
                        </p>

                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                            <Button
                                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                                size="sm"
                                icon={<Grid size={16} />}
                                onClick={() => setViewMode('grid')}
                            >
                                Grid
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'primary' : 'outline'}
                                size="sm"
                                icon={<List size={16} />}
                                onClick={() => setViewMode('list')}
                            >
                                List
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Document Display */}
            {viewMode === 'grid' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--spacing-lg)' }}>
                    {filteredDocs.map((doc) => (
                        <div key={doc.id} style={{ transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)', cursor: 'pointer' }}
                            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                            }}
                            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                            }}
                        >
                            <Card>
                                <CardBody>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            background: 'var(--color-gray-100)',
                                            color: 'var(--color-gray-600)',
                                            borderRadius: 'var(--radius-lg)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            <FileText size={20} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <h4 style={{
                                                fontSize: 'var(--text-base)',
                                                fontWeight: 600,
                                                margin: 0,
                                                marginBottom: 'var(--spacing-xs)',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {doc.title}
                                            </h4>
                                            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0 }}>
                                                {doc.referenceNumber}
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                                            <span style={{ color: 'var(--color-gray-600)' }}>Sender:</span>
                                            <strong style={{ textAlign: 'right' }}>{doc.sender}</strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                                            <span style={{ color: 'var(--color-gray-600)' }}>Department:</span>
                                            <strong>{doc.department}</strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                                            <span style={{ color: 'var(--color-gray-600)' }}>Archived:</span>
                                            <strong>{formatDate(doc.dateReceived)}</strong>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                                        <SecurityBadge classification={doc.classification} />
                                        <StatusBadge status={doc.status} />
                                    </div>

                                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                        <Button variant="outline" size="sm" fullWidth icon={<Eye size={16} />}>
                                            View
                                        </Button>
                                        <Button variant="outline" size="sm" fullWidth icon={<Download size={16} />}>
                                            Download
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardBody style={{ padding: 0 }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--color-gray-200)', background: 'var(--color-gray-50)' }}>
                                        <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                            Reference
                                        </th>
                                        <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                            Title
                                        </th>
                                        <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                            Sender
                                        </th>
                                        <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                            Department
                                        </th>
                                        <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                            Classification
                                        </th>
                                        <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                            Archived Date
                                        </th>
                                        <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDocs.map((doc) => (
                                        <tr key={doc.id} style={{ borderBottom: '1px solid var(--color-gray-200)', transition: 'background var(--transition-fast)' }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-gray-50)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                                                {doc.referenceNumber}
                                            </td>
                                            <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--text-sm)' }}>
                                                {doc.title}
                                            </td>
                                            <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                                                {doc.sender}
                                            </td>
                                            <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--text-sm)' }}>
                                                {doc.department}
                                            </td>
                                            <td style={{ padding: 'var(--spacing-md)' }}>
                                                <SecurityBadge classification={doc.classification} />
                                            </td>
                                            <td style={{ padding: 'var(--spacing-md)', fontSize: 'var(--text-sm)' }}>
                                                {formatDate(doc.dateReceived)}
                                            </td>
                                            <td style={{ padding: 'var(--spacing-md)' }}>
                                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                                    <Button variant="ghost" size="sm" icon={<Eye size={16} />}>
                                                        View
                                                    </Button>
                                                    <Button variant="ghost" size="sm" icon={<Download size={16} />}>
                                                        Download
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            )}

            {filteredDocs.length === 0 && (
                <Card>
                    <CardBody>
                        <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)' }}>
                            <ArchiveIcon size={48} style={{ color: 'var(--color-gray-400)', margin: '0 auto var(--spacing-lg)' }} />
                            <h3 style={{ color: 'var(--color-gray-700)', marginBottom: 'var(--spacing-sm)' }}>
                                No archived documents found
                            </h3>
                            <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--text-sm)' }}>
                                Try adjusting your search criteria or filters
                            </p>
                        </div>
                    </CardBody>
                </Card>
            )}
        </div>
    );
};
