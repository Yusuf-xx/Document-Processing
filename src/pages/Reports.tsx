import React, { useState } from 'react';
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
    const [dateRange, setDateRange] = useState('thisMonth');
    const [reportType, setReportType] = useState('overview');
    const [department, setDepartment] = useState('all');

    // Calculate statistics
    const stats = {
        totalDocuments: mockDocuments.length,
        completed: mockDocuments.filter(d => d.status === 'Closed' || d.status === 'Approved').length,
        pending: mockDocuments.filter(d => d.status === 'Pending Verification' || d.status === 'Pending Review').length,
        overdue: mockDocuments.filter(d => d.status === 'In Progress').length,
        avgProcessingTime: '2.4 days',
        totalUsers: mockUsers.length,
        activeUsers: mockUsers.filter(u => u.status === 'Active').length
    };

    const reportTemplates = [
        {
            id: 'overview',
            name: 'Document Overview Report',
            description: 'Comprehensive overview of all document activities',
            icon: <FileText size={24} />,
            color: 'primary'
        },
        {
            id: 'performance',
            name: 'Performance Analytics',
            description: 'Processing times and efficiency metrics',
            icon: <BarChart3 size={24} />,
            color: 'success'
        },
        {
            id: 'department',
            name: 'Department Analysis',
            description: 'Document distribution by department',
            icon: <PieChart size={24} />,
            color: 'warning'
        },
        {
            id: 'sla',
            name: 'SLA Compliance Report',
            description: 'Service level agreement compliance tracking',
            icon: <Clock size={24} />,
            color: 'danger'
        },
        {
            id: 'user',
            name: 'User Activity Report',
            description: 'User engagement and activity statistics',
            icon: <Users size={24} />,
            color: 'info'
        },
        {
            id: 'classification',
            name: 'Classification Report',
            description: 'Document security classification breakdown',
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
        alert(`Generating ${reportTemplates.find(r => r.id === reportType)?.name} for ${dateRange}...`);
    };

    const handleExport = (format: string) => {
        alert(`Exporting report as ${format.toUpperCase()}...`);
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Reports & Analytics</h1>
                    <p className="page-description">Generate reports and view analytics</p>
                </div>
                <div className="page-actions">
                    <Button variant="outline" icon={<Download size={18} />} onClick={() => handleExport('pdf')}>
                        Export PDF
                    </Button>
                    <Button variant="outline" icon={<Download size={18} />} onClick={() => handleExport('excel')}>
                        Export Excel
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
                                    Total Documents
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
                                    Completed
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
                                    Pending
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
                                    In Progress
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
                        <h3 style={{ margin: 0 }}>Report Configuration</h3>
                    </div>
                </CardHeader>
                <CardBody>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 'var(--spacing-md)', alignItems: 'end' }}>
                        <Select
                            label="Report Type"
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            options={reportTemplates.map(t => ({ value: t.id, label: t.name }))}
                        />

                        <Select
                            label="Date Range"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            options={[
                                { value: 'today', label: 'Today' },
                                { value: 'thisWeek', label: 'This Week' },
                                { value: 'thisMonth', label: 'This Month' },
                                { value: 'lastMonth', label: 'Last Month' },
                                { value: 'thisQuarter', label: 'This Quarter' },
                                { value: 'thisYear', label: 'This Year' },
                                { value: 'custom', label: 'Custom Range' }
                            ]}
                        />

                        <Select
                            label="Department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            options={[
                                { value: 'all', label: 'All Departments' },
                                { value: 'Finance', label: 'Finance' },
                                { value: 'HR', label: 'HR' },
                                { value: 'Security', label: 'Security' },
                                { value: 'Development', label: 'Development' },
                                { value: 'Administration', label: 'Administration' }
                            ]}
                        />

                        <Button onClick={handleGenerateReport} icon={<TrendingUp size={18} />}>
                            Generate Report
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
                {/* Report Templates */}
                <div>
                    <Card>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>Available Report Templates</h3>
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
                            <h3 style={{ margin: 0 }}>Quick Stats</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>Avg. Processing Time</span>
                                        <strong style={{ fontSize: 'var(--text-sm)' }}>{stats.avgProcessingTime}</strong>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>Total Users</span>
                                        <strong style={{ fontSize: 'var(--text-sm)' }}>{stats.totalUsers}</strong>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>Active Users</span>
                                        <strong style={{ fontSize: 'var(--text-sm)' }}>{stats.activeUsers}</strong>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>Completion Rate</span>
                                        <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-success-600)' }}>
                                            {Math.round((stats.completed / stats.totalDocuments) * 100)}%
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>Department Distribution</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                {departmentStats.map((dept) => (
                                    <div key={dept.name}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                            <span style={{ fontSize: 'var(--text-sm)' }}>{dept.name}</span>
                                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{dept.documents} docs</span>
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
