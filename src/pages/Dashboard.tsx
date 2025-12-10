import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { StatusBadge } from '../components/UI/Badge';
import { Button } from '../components/UI/Button';
import {
    FileText,
    Clock,
    CheckCircle,
    AlertTriangle,
    TrendingUp,
    Users,
    FolderOpen,
    Activity
} from 'lucide-react';
import { mockDocuments, mockActivities } from '../data/mockData';
import { formatDateTime } from '../utils/helpers';
import { CompactCalendar } from '../components/UI/CompactCalendar';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
    const { t } = useTranslation();

    const stats = [
        {
            title: t('dashboard.stats.totalDocuments'),
            value: '248',
            change: '+12%',
            icon: <FileText size={24} />,
            color: 'primary'
        },
        {
            title: t('dashboard.stats.pendingReview'),
            value: '15',
            change: '+3',
            icon: <Clock size={24} />,
            color: 'warning'
        },
        {
            title: t('dashboard.stats.completed'),
            value: '189',
            change: '+8%',
            icon: <CheckCircle size={24} />,
            color: 'success'
        },
        {
            title: t('dashboard.stats.slaBreaches'),
            value: '4',
            change: '-2',
            icon: <AlertTriangle size={24} />,
            color: 'danger'
        }
    ];

    const recentDocuments = mockDocuments.slice(0, 5);
    const recentActivities = mockActivities.slice(0, 6);

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">{t('dashboard.title')}</h1>
                    <p className="page-description">{t('dashboard.description')}</p>
                </div>
                <div className="page-actions">
                    <Button variant="outline" icon={<FolderOpen size={18} />}>
                        {t('dashboard.viewAllDocuments')}
                    </Button>
                    <Button icon={<FileText size={18} />}>
                        {t('dashboard.newDocument')}
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <Card key={index} className="stat-card">
                        <CardBody>
                            <div className="stat-content">
                                <div className={`stat-icon stat-icon-${stat.color}`}>
                                    {stat.icon}
                                </div>
                                <div className="stat-details">
                                    <p className="stat-label">{stat.title}</p>
                                    <h3 className="stat-value">{stat.value}</h3>
                                    <div className="stat-change">
                                        <TrendingUp size={14} />
                                        <span>{stat.change} {t('dashboard.stats.fromLastMonth')}</span>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* Compact Calendar */}
            <CompactCalendar />

            <div className="dashboard-grid">
                {/* Recent Documents */}
                <Card className="dashboard-card">
                    <CardHeader>
                        <div className="card-header-content">
                            <h3>{t('dashboard.recentDocuments')}</h3>
                            <Button variant="ghost" size="sm">{t('dashboard.viewAll')}</Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="document-list">
                            {recentDocuments.map((doc) => (
                                <div key={doc.id} className="document-item">
                                    <div className="document-icon">
                                        <FileText size={20} />
                                    </div>
                                    <div className="document-info">
                                        <h4>{doc.title}</h4>
                                        <p className="text-sm text-gray-500">
                                            {doc.referenceNumber} • {doc.sender}
                                        </p>
                                    </div>
                                    <div className="document-meta">
                                        <StatusBadge status={doc.status} />
                                        <span className="text-sm text-gray-500">{doc.dateReceived}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>

                {/* Activity Feed */}
                <Card className="dashboard-card">
                    <CardHeader>
                        <div className="card-header-content">
                            <h3>{t('dashboard.recentActivity')}</h3>
                            <Activity size={20} />
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="activity-feed">
                            <div className="activity-feed">
                                {recentActivities.map((activity) => {
                                    let actionKey = activity.action;
                                    // Simple mapping based on known mock data values
                                    if (activity.action.includes('Received')) actionKey = 'activity.receive';
                                    else if (activity.action.includes('OCR')) actionKey = 'activity.ocrProcessing';
                                    else if (activity.action.includes('Assigned')) actionKey = 'activity.assign';
                                    else if (activity.action.includes('Approved')) actionKey = 'activity.approve';
                                    else if (activity.action.includes('Closed')) actionKey = 'activity.close';

                                    let detailsKey = activity.details;
                                    if (activity.details.includes('received')) detailsKey = 'activity.details.received';
                                    else if (activity.details.includes('extraction')) detailsKey = 'activity.details.ocr';
                                    else if (activity.details.includes('assigned')) detailsKey = 'activity.details.assigned';
                                    else if (activity.details.includes('protocol')) detailsKey = 'activity.details.approved';
                                    else if (activity.details.includes('archived')) detailsKey = 'activity.details.archived';

                                    return (
                                        <div key={activity.id} className="activity-item">
                                            <div className="activity-dot"></div>
                                            <div className="activity-content">
                                                <p className="activity-action">
                                                    <strong>{activity.user}</strong> {t(actionKey).toLowerCase()}
                                                </p>
                                                <p className="activity-details text-sm text-gray-500">{detailsKey === activity.details ? activity.details : t(detailsKey)}</p>
                                                <span className="activity-time text-xs text-gray-400">{formatDateTime(activity.timestamp)}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
                <Card>
                    <CardBody>
                        <div className="quick-stat-item">
                            <Users size={20} className="text-primary-600" />
                            <div>
                                <p className="text-sm text-gray-600">{t('dashboard.quickStats.activeUsers')}</p>
                                <p className="text-xl font-bold">24</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <div className="quick-stat-item">
                            <FolderOpen size={20} className="text-success-600" />
                            <div>
                                <p className="text-sm text-gray-600">{t('dashboard.quickStats.departments')}</p>
                                <p className="text-xl font-bold">8</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <div className="quick-stat-item">
                            <Clock size={20} className="text-warning-600" />
                            <div>
                                <p className="text-sm text-gray-600">{t('dashboard.quickStats.avgProcessingTime')}</p>
                                <p className="text-xl font-bold">2.4 days</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
