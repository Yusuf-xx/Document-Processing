import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
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

    const getDeptLabel = (d: string) => {
        return t(`departments.${d.toLowerCase()}`);
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">{t('archive.title')}</h1>
                    <p className="page-description">{t('archive.description')}</p>
                </div>
                <div className="page-actions">
                    <Button variant="outline" icon={<Download size={18} />}>
                        {t('archive.export')}
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
                                    {t('archive.totalArchived')}
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
                                    {t('archive.thisYear')}
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
                                    {t('archive.departments')}
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
                                    {t('archive.avgPerMonth')}
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
                            label={t('archive.searchLabel')}
                            placeholder={t('archive.searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            icon={<Search size={18} />}
                        />

                        <Select
                            label={t('archive.year')}
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                            options={[
                                { value: 'all', label: t('archive.allYears') },
                                { value: '2025', label: '2025' },
                                { value: '2024', label: '2024' },
                                { value: '2023', label: '2023' },
                                { value: '2022', label: '2022' },
                                { value: '2021', label: '2021' }
                            ]}
                        />

                        <Select
                            label={t('archive.department')}
                            value={filterDept}
                            onChange={(e) => setFilterDept(e.target.value)}
                            options={[
                                { value: 'all', label: t('archive.allDepartments') },
                                { value: 'Finance', label: getDeptLabel('Finance') },
                                { value: 'HR', label: getDeptLabel('HR') },
                                { value: 'Security', label: getDeptLabel('Security') },
                                { value: 'Development', label: getDeptLabel('Development') },
                                { value: 'Administration', label: getDeptLabel('Administration') }
                            ]}
                        />

                        <Select
                            label={t('archive.classification')}
                            value={filterClassification}
                            onChange={(e) => setFilterClassification(e.target.value)}
                            options={[
                                { value: 'all', label: t('archive.allClassifications') },
                                { value: 'Open', label: t('classification.open') },
                                { value: 'Internal Use', label: t('classification.internalUse') },
                                { value: 'Restricted', label: t('classification.restricted') },
                                { value: 'Confidential', label: t('classification.confidential') },
                                { value: 'Secret', label: t('classification.secret') },
                                { value: 'Top Secret', label: t('classification.topSecret') }
                            ]}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--spacing-lg)' }}>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0 }}>
                            <span dangerouslySetInnerHTML={{
                                __html: t('archive.showingDocs', {
                                    filtered: `<strong>${filteredDocs.length}</strong>`,
                                    total: `<strong>${archivedDocs.length}</strong>`
                                })
                            }} />
                        </p>

                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                            <Button
                                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                                size="sm"
                                icon={<Grid size={16} />}
                                onClick={() => setViewMode('grid')}
                            >
                                {t('archive.grid')}
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'primary' : 'outline'}
                                size="sm"
                                icon={<List size={16} />}
                                onClick={() => setViewMode('list')}
                            >
                                {t('archive.list')}
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
                                            <span style={{ color: 'var(--color-gray-600)' }}>{t('archive.sender')}:</span>
                                            <strong style={{ textAlign: 'right' }}>{doc.sender}</strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                                            <span style={{ color: 'var(--color-gray-600)' }}>{t('archive.department')}:</span>
                                            <strong>{t(`departments.${doc.department.toLowerCase()}`)}</strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                                            <span style={{ color: 'var(--color-gray-600)' }}>{t('archive.archivedDate')}:</span>
                                            <strong>{formatDate(doc.dateReceived)}</strong>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                                        <SecurityBadge classification={doc.classification} />
                                        <StatusBadge status={doc.status} />
                                    </div>

                                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                        <Button variant="outline" size="sm" fullWidth icon={<Eye size={16} />}>
                                            {t('common.view')}
                                        </Button>
                                        <Button variant="outline" size="sm" fullWidth icon={<Download size={16} />}>
                                            {t('documentWorkflow.download')}
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
                                            {t('archive.columns.reference')}
                                        </th>
                                        <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                            {t('archive.columns.title')}
                                        </th>
                                        <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                            {t('archive.columns.sender')}
                                        </th>
                                        <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                            {t('archive.columns.department')}
                                        </th>
                                        <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                            {t('archive.columns.classification')}
                                        </th>
                                        <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                            {t('archive.columns.archivedDate')}
                                        </th>
                                        <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                            {t('archive.columns.actions')}
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
                                                {t(`departments.${doc.department.toLowerCase()}`)}
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
                                                        {t('common.view')}
                                                    </Button>
                                                    <Button variant="ghost" size="sm" icon={<Download size={16} />}>
                                                        {t('documentWorkflow.download')}
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
                                {t('archive.emptyTitle')}
                            </h3>
                            <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--text-sm)' }}>
                                {t('archive.emptyDesc')}
                            </p>
                        </div>
                    </CardBody>
                </Card>
            )}
        </div>
    );
};
