import React from 'react';
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
import './Dashboard.css';

export const Dashboard: React.FC = () => {
    const stats = [
        {
            title: 'Total Documents',
            value: '248',
            change: '+12%',
            icon: <FileText size={24} />,
            color: 'primary'
        },
        {
            title: 'Pending Review',
            value: '15',
            change: '+3',
            icon: <Clock size={24} />,
            color: 'warning'
        },
        {
            title: 'Completed',
            value: '189',
            change: '+8%',
            icon: <CheckCircle size={24} />,
            color: 'success'
        },
        {
            title: 'SLA Breaches',
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
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-description">Welcome back! Here's an overview of your document management system.</p>
                </div>
                <div className="page-actions">
                    <Button variant="outline" icon={<FolderOpen size={18} />}>
                        View All Documents
                    </Button>
                    <Button icon={<FileText size={18} />}>
                        New Document
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
                                        <span>{stat.change} from last month</span>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            <div className="dashboard-grid">
                {/* Recent Documents */}
                <Card className="dashboard-card">
                    <CardHeader>
                        <div className="card-header-content">
                            <h3>Recent Documents</h3>
                            <Button variant="ghost" size="sm">View All</Button>
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
                            <h3>Recent Activity</h3>
                            <Activity size={20} />
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="activity-feed">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="activity-item">
                                    <div className="activity-dot"></div>
                                    <div className="activity-content">
                                        <p className="activity-action">
                                            <strong>{activity.user}</strong> {activity.action.toLowerCase()}
                                        </p>
                                        <p className="activity-details text-sm text-gray-500">{activity.details}</p>
                                        <span className="activity-time text-xs text-gray-400">{formatDateTime(activity.timestamp)}</span>
                                    </div>
                                </div>
                            ))}
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
                                <p className="text-sm text-gray-600">Active Users</p>
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
                                <p className="text-sm text-gray-600">Departments</p>
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
                                <p className="text-sm text-gray-600">Avg. Processing Time</p>
                                <p className="text-xl font-bold">2.4 days</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
