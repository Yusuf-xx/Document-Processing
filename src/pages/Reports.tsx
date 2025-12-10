import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Select } from '../components/UI/Input';
import {
    Download,
    FileText,
    BarChart3,
    PieChart,
    TrendingUp,
    Filter,
    Users,
    FolderOpen,
    Clock,
    CheckCircle,
    AlertTriangle
} from 'lucide-react';
import { mockDocuments, mockUsers } from '../data/mockData';

export const Reports: React.FC = () => {
    const { t } = useTranslation();
    const [dateRange, setDateRange] = useState('thisMonth');
    const [reportType, setReportType] = useState('overview');
    const [department, setDepartment] = useState('all');

    // Calculate statistics
    const stats = {
        totalDocuments: mockDocuments.length,
        completed: mockDocuments.filter(d => d.status === 'Closed' || d.status === 'Approved').length,
        pending: mockDocuments.filter(d => d.status === 'Pending Verification' || d.status === 'Pending Review').length,
        overdue: mockDocuments.filter(d => d.status === 'In Progress').length,
        avgProcessingTime: `2.4 ${t('common.days')}`,
        totalUsers: mockUsers.length,
        activeUsers: mockUsers.filter(u => u.status === 'Active').length
    };

    const reportTemplates = [
        {
            id: 'overview',
            name: t('reports.templates.overview.name'),
            description: t('reports.templates.overview.desc'),
            icon: <FileText size={24} />,
            color: 'primary'
        },
        {
            id: 'performance',
            name: t('reports.templates.performance.name'),
            description: t('reports.templates.performance.desc'),
            icon: <BarChart3 size={24} />,
            color: 'success'
        },
        {
            id: 'department',
            name: t('reports.templates.department.name'),
            description: t('reports.templates.department.desc'),
            icon: <PieChart size={24} />,
            color: 'warning'
        },
        {
            id: 'sla',
            name: t('reports.templates.sla.name'),
            description: t('reports.templates.sla.desc'),
            icon: <Clock size={24} />,
            color: 'danger'
        },
        {
            id: 'user',
            name: t('reports.templates.user.name'),
            description: t('reports.templates.user.desc'),
            icon: <Users size={24} />,
            color: 'info'
        },
        {
            id: 'classification',
            name: t('reports.templates.classification.name'),
            description: t('reports.templates.classification.desc'),
            icon: <FolderOpen size={24} />,
            color: 'purple'
        }
    ];

    const departmentStats = [
        { name: 'Finance', documents: 2, percentage: 40 },
        { name: 'HR', documents: 1, percentage: 20 },
        { name: 'Security', documents: 1, percentage: 20 },
        { name: 'Development', documents: 1, percentage: 20 }
    ];

    const handleGenerateReport = () => {
        const templateName = reportTemplates.find(r => r.id === reportType)?.name;
        const rangeLabel = t(`reports.ranges.${dateRange}`) || dateRange;
        alert(t('reports.alerts.generating', { report: templateName, range: rangeLabel }));
    };

    const handleExport = (format: string) => {
        alert(t('reports.alerts.exporting', { format: format.toUpperCase() }));
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">{t('reports.title')}</h1>
                    <p className="page-description">{t('reports.description')}</p>
                </div>
                <div className="page-actions">
                    <Button variant="outline" icon={<Download size={18} />} onClick={() => handleExport('pdf')}>
                        {t('reports.exportPdf')}
                    </Button>
                    <Button variant="outline" icon={<Download size={18} />} onClick={() => handleExport('excel')}>
                        {t('reports.exportExcel')}
                    </Button>
                </div>
            </div>

            {/* Key Metrics */}
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
                                <FileText size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                    {t('reports.totalDocuments')}
                                </p>
                                <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, margin: 0 }}>
                                    {stats.totalDocuments}
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
                                <CheckCircle size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                    {t('reports.completed')}
                                </p>
                                <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, margin: 0 }}>
                                    {stats.completed}
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
                                <Clock size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                    {t('reports.pending')}
                                </p>
                                <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, margin: 0 }}>
                                    {stats.pending}
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
                                background: 'var(--color-danger-100)',
                                color: 'var(--color-danger-600)',
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                    {t('reports.inProgress')}
                                </p>
                                <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, margin: 0 }}>
                                    {stats.overdue}
                                </h3>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Report Configuration */}
            <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
                <CardHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                        <Filter size={20} />
                        <h3 style={{ margin: 0 }}>{t('reports.configuration.title')}</h3>
                    </div>
                </CardHeader>
                <CardBody>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 'var(--spacing-md)', alignItems: 'end' }}>
                        <Select
                            label={t('reports.configuration.reportType')}
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            options={reportTemplates.map(t => ({ value: t.id, label: t.name }))}
                        />

                        <Select
                            label={t('reports.configuration.dateRange')}
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            options={[
                                { value: 'today', label: t('reports.ranges.today') },
                                { value: 'thisWeek', label: t('reports.ranges.thisWeek') },
                                { value: 'thisMonth', label: t('reports.ranges.thisMonth') },
                                { value: 'lastMonth', label: t('reports.ranges.lastMonth') },
                                { value: 'thisQuarter', label: t('reports.ranges.thisQuarter') },
                                { value: 'thisYear', label: t('reports.ranges.thisYear') },
                                { value: 'custom', label: t('reports.ranges.custom') }
                            ]}
                        />

                        <Select
                            label={t('reports.configuration.department')}
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            options={[
                                { value: 'all', label: t('userManagement.allDepartments') },
                                { value: 'Finance', label: t('departments.finance') },
                                { value: 'HR', label: t('departments.hr') },
                                { value: 'Security', label: t('departments.security') },
                                { value: 'Development', label: t('departments.development') },
                                { value: 'Administration', label: t('departments.administration') }
                            ]}
                        />

                        <Button onClick={handleGenerateReport} icon={<TrendingUp size={18} />}>
                            {t('reports.configuration.generate')}
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
                {/* Report Templates */}
                <div>
                    <Card>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>{t('reports.templates.title')}</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)' }}>
                                {reportTemplates.map((template) => (
                                    <div
                                        key={template.id}
                                        onClick={() => setReportType(template.id)}
                                        style={{
                                            padding: 'var(--spacing-lg)',
                                            border: `2px solid ${reportType === template.id ? 'var(--color-primary-500)' : 'var(--color-gray-200)'}`,
                                            borderRadius: 'var(--radius-lg)',
                                            cursor: 'pointer',
                                            transition: 'all var(--transition-fast)',
                                            background: reportType === template.id ? 'var(--color-primary-50)' : 'transparent'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (reportType !== template.id) {
                                                e.currentTarget.style.borderColor = 'var(--color-gray-300)';
                                                e.currentTarget.style.background = 'var(--color-gray-50)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (reportType !== template.id) {
                                                e.currentTarget.style.borderColor = 'var(--color-gray-200)';
                                                e.currentTarget.style.background = 'transparent';
                                            }
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-md)' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: `var(--color-${template.color}-100)`,
                                                color: `var(--color-${template.color}-600)`,
                                                borderRadius: 'var(--radius-lg)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                {template.icon}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                                    {template.name}
                                                </h4>
                                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0 }}>
                                                    {template.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Analytics Summary */}
                <div>
                    <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>{t('reports.quickStats.title')}</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>{t('reports.quickStats.avgTime')}</span>
                                        <strong style={{ fontSize: 'var(--text-sm)' }}>{stats.avgProcessingTime}</strong>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>{t('reports.quickStats.totalUsers')}</span>
                                        <strong style={{ fontSize: 'var(--text-sm)' }}>{stats.totalUsers}</strong>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>{t('reports.quickStats.activeUsers')}</span>
                                        <strong style={{ fontSize: 'var(--text-sm)' }}>{stats.activeUsers}</strong>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>{t('reports.quickStats.completionRate')}</span>
                                        <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-success-600)' }}>
                                            {Math.round((stats.completed / (stats.totalDocuments || 1)) * 100)}%
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>{t('reports.distribution.title')}</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                {departmentStats.map((dept) => (
                                    <div key={dept.name}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                            <span style={{ fontSize: 'var(--text-sm)' }}>{t(`departments.${dept.name.toLowerCase()}`)}</span>
                                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{dept.documents} {t('reports.distribution.docs')}</span>
                                        </div>
                                        <div style={{
                                            height: '8px',
                                            background: 'var(--color-gray-200)',
                                            borderRadius: 'var(--radius-full)',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${dept.percentage}%`,
                                                height: '100%',
                                                background: 'var(--color-primary-500)',
                                                transition: 'width 0.5s ease-out'
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};
