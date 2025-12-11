import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Textarea, Input, Select } from '../components/UI/Input';
import { StatusBadge, SecurityBadge } from '../components/UI/Badge';
import {
    FileText,
    CheckCircle,
    Clock,
    MessageSquare,
    Send,
    Download,
    Share2,
    AlertCircle,
    User,
    Calendar
} from 'lucide-react';
import { mockDocuments } from '../data/mockData';
import { formatDateTime } from '../utils/helpers';

export const DocumentWorkflow: React.FC = () => {
    const { t } = useTranslation();
    const [newComment, setNewComment] = useState('');
    const [showReassignModal, setShowReassignModal] = useState(false);

    // Using first document as example
    const document = mockDocuments[0];

    const workflowStages = [
        { id: 1, name: t('documentWorkflow.stages.received'), status: 'completed', date: '2024-12-01 09:30', user: 'Ahmad bin Ali' },
        { id: 2, name: t('documentWorkflow.stages.scanned'), status: 'completed', date: '2024-12-01 09:35', user: 'System' },
        { id: 3, name: t('documentWorkflow.stages.ocrVerified'), status: 'completed', date: '2024-12-01 10:15', user: 'Ahmad bin Ali' },
        { id: 4, name: t('documentWorkflow.stages.classified'), status: 'completed', date: '2024-12-01 11:00', user: 'Ahmad bin Ali' },
        { id: 5, name: t('documentWorkflow.stages.underReview'), status: 'current', date: '2024-12-01 14:30', user: 'Ahmad bin Ali' },
        { id: 6, name: t('documentWorkflow.stages.approved'), status: 'pending', date: null, user: null },
        { id: 7, name: t('documentWorkflow.stages.archived'), status: 'pending', date: null, user: null }
    ];

    const comments = [
        {
            id: 1,
            user: 'Ahmad bin Ali',
            role: 'Finance Officer',
            timestamp: '2024-12-01 14:45',
            comment: 'Budget figures need to be cross-checked with the previous quarter allocations. Please verify the infrastructure budget line item.',
            type: 'comment'
        },
        {
            id: 2,
            user: 'Siti Nurhaliza',
            role: 'HR Manager',
            timestamp: '2024-12-02 09:20',
            comment: 'Reviewed the HR allocation section. All figures are aligned with our departmental requirements.',
            type: 'approval'
        },
        {
            id: 3,
            user: 'Lee Wei Ming',
            role: 'Development Officer',
            timestamp: '2024-12-02 11:30',
            comment: 'Infrastructure budget seems lower than expected. Requesting clarification from the sender.',
            type: 'query'
        }
    ];

    const handleAddComment = () => {
        if (newComment.trim()) {
            alert(t('documentWorkflow.commentAdded'));
            setNewComment('');
        }
    };

    const getStageName = (name: string) => {
        // Stage name is already translated from workflowStages array
        return name;
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">{t('documentWorkflow.title')}</h1>
                    <p className="page-description">{t('documentWorkflow.description')}</p>
                </div>
                <div className="page-actions">
                    <Button variant="outline" icon={<Share2 size={18} />}>
                        {t('documentWorkflow.share')}
                    </Button>
                    <Button variant="outline" icon={<Download size={18} />}>
                        {t('documentWorkflow.download')}
                    </Button>
                </div>
            </div>

            {/* Document Summary Card */}
            <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
                <CardBody>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
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
                                <div style={{ flex: 1 }}>
                                    <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                        {document.title}
                                    </h2>
                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0 }}>
                                        {document.referenceNumber}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                    <User size={16} style={{ color: 'var(--color-gray-500)' }} />
                                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                                        {t('documentWorkflow.sender')}: <strong>{document.sender}</strong>
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                    <Calendar size={16} style={{ color: 'var(--color-gray-500)' }} />
                                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                                        {t('documentWorkflow.received')}: <strong>{document.dateReceived}</strong>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>{t('common.status')}</span>
                                <StatusBadge status={document.status} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>{t('documentTracking.columns.classification')}</span>
                                <SecurityBadge classification={document.classification} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>{t('documentClassification.department')}</span>
                                <strong style={{ fontSize: 'var(--text-sm)' }}>{t(`departments.${document.department.toLowerCase()}`)}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>{t('documentClassification.assignedTo')}</span>
                                <strong style={{ fontSize: 'var(--text-sm)' }}>{document.assignedTo}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>{t('documentClassification.dueDate')}</span>
                                <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-danger-600)' }}>{document.dueDate}</strong>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
                {/* Workflow Timeline */}
                <div>
                    <Card>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>{t('documentWorkflow.workflowProgress')}</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ position: 'relative' }}>
                                {workflowStages.map((stage, index) => (
                                    <div
                                        key={stage.id}
                                        style={{
                                            display: 'flex',
                                            gap: 'var(--spacing-lg)',
                                            position: 'relative',
                                            paddingBottom: index < workflowStages.length - 1 ? 'var(--spacing-xl)' : 0
                                        }}
                                    >
                                        {/* Timeline line */}
                                        {index < workflowStages.length - 1 && (
                                            <div style={{
                                                position: 'absolute',
                                                left: '15px',
                                                top: '32px',
                                                bottom: 0,
                                                width: '2px',
                                                background: stage.status === 'pending' ? 'var(--color-gray-200)' : 'var(--color-primary-300)'
                                            }} />
                                        )}

                                        {/* Status Icon */}
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: stage.status === 'completed'
                                                ? 'var(--color-success-500)'
                                                : stage.status === 'current'
                                                    ? 'var(--color-primary-500)'
                                                    : 'var(--color-gray-300)',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            zIndex: 1,
                                            position: 'relative'
                                        }}>
                                            {stage.status === 'completed' ? (
                                                <CheckCircle size={18} />
                                            ) : stage.status === 'current' ? (
                                                <Clock size={18} />
                                            ) : (
                                                <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />
                                            )}
                                        </div>

                                        {/* Stage Details */}
                                        <div style={{ flex: 1, paddingTop: '4px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xs)' }}>
                                                <h4 style={{
                                                    margin: 0,
                                                    fontSize: 'var(--text-base)',
                                                    fontWeight: stage.status === 'current' ? 700 : 600,
                                                    color: stage.status === 'pending' ? 'var(--color-gray-500)' : 'var(--color-gray-900)'
                                                }}>
                                                    {getStageName(stage.name)}
                                                </h4>
                                                {stage.status === 'current' && (
                                                    <span style={{
                                                        fontSize: 'var(--text-xs)',
                                                        color: 'var(--color-primary-600)',
                                                        fontWeight: 600,
                                                        background: 'var(--color-primary-50)',
                                                        padding: '2px 8px',
                                                        borderRadius: 'var(--radius-full)'
                                                    }}>
                                                        {t('documentWorkflow.inProgress')}
                                                    </span>
                                                )}
                                            </div>
                                            {stage.date && (
                                                <p style={{
                                                    margin: 0,
                                                    fontSize: 'var(--text-sm)',
                                                    color: 'var(--color-gray-600)'
                                                }}>
                                                    {formatDateTime(stage.date)} • {stage.user}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>

                    {/* Comments Section */}
                    <Card style={{ marginTop: 'var(--spacing-xl)' }}>
                        <CardHeader>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <h3 style={{ margin: 0 }}>{t('documentWorkflow.comments')}</h3>
                                <MessageSquare size={20} style={{ color: 'var(--color-gray-500)' }} />
                            </div>
                        </CardHeader>
                        <CardBody>
                            {/* Comment List */}
                            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                                {comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        style={{
                                            marginBottom: 'var(--spacing-lg)',
                                            paddingBottom: 'var(--spacing-lg)',
                                            borderBottom: '1px solid var(--color-gray-200)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-sm)' }}>
                                            <div style={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 600,
                                                fontSize: 'var(--text-sm)',
                                                flexShrink: 0
                                            }}>
                                                {comment.user.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xs)' }}>
                                                    <div>
                                                        <strong style={{ fontSize: 'var(--text-sm)' }}>{comment.user}</strong>
                                                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', marginLeft: 'var(--spacing-xs)' }}>
                                                            • {comment.role}
                                                        </span>
                                                    </div>
                                                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>
                                                        {formatDateTime(comment.timestamp)}
                                                    </span>
                                                </div>
                                                <p style={{
                                                    margin: 0,
                                                    fontSize: 'var(--text-sm)',
                                                    color: 'var(--color-gray-700)',
                                                    lineHeight: 1.6
                                                }}>
                                                    {comment.comment}
                                                </p>
                                                {comment.type === 'approval' && (
                                                    <div style={{
                                                        marginTop: 'var(--spacing-sm)',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: 'var(--spacing-xs)',
                                                        fontSize: 'var(--text-xs)',
                                                        color: 'var(--color-success-600)',
                                                        background: 'var(--color-success-50)',
                                                        padding: '4px 8px',
                                                        borderRadius: 'var(--radius-md)'
                                                    }}>
                                                        <CheckCircle size={12} />
                                                        {t('documentWorkflow.approvedTag')}
                                                    </div>
                                                )}
                                                {comment.type === 'query' && (
                                                    <div style={{
                                                        marginTop: 'var(--spacing-sm)',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: 'var(--spacing-xs)',
                                                        fontSize: 'var(--text-xs)',
                                                        color: 'var(--color-warning-600)',
                                                        background: 'var(--color-warning-50)',
                                                        padding: '4px 8px',
                                                        borderRadius: 'var(--radius-md)'
                                                    }}>
                                                        <AlertCircle size={12} />
                                                        {t('documentWorkflow.queryTag')}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Comment */}
                            <div>
                                <Textarea
                                    placeholder={t('documentWorkflow.addComment')}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    rows={3}
                                />
                                <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                                    <Button onClick={handleAddComment} icon={<Send size={18} />}>
                                        {t('documentWorkflow.postComment')}
                                    </Button>
                                    <Button variant="outline" onClick={() => setNewComment('')}>
                                        {t('documentWorkflow.cancel')}
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Action Panel */}
                <div>
                    <Card>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>{t('documentWorkflow.quickActions')}</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                <Button fullWidth icon={<CheckCircle size={18} />} onClick={() => alert(t('documentWorkflow.statusUpdated'))}>
                                    {t('documentWorkflow.responded')}
                                </Button>
                                <Button variant="outline" fullWidth onClick={() => setShowReassignModal(true)}>
                                    {t('documentWorkflow.reassign')}
                                </Button>
                                <Button variant="outline" fullWidth onClick={() => alert(t('documentWorkflow.documentClosed'))}>
                                    {t('documentWorkflow.closed')}
                                </Button>
                            </div>
                        </CardBody>
                    </Card>

                    <Card style={{ marginTop: 'var(--spacing-lg)' }}>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>{t('documentWorkflow.documentDetails')}</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                <div>
                                    <p style={{ color: 'var(--color-gray-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                        {t('documentWorkflow.priority')}
                                    </p>
                                    <strong style={{ color: 'var(--color-danger-600)' }}>{t(`documentClassification.priorities.${document.priority.toLowerCase()}`)}</strong>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--color-gray-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                        {t('documentWorkflow.dateOfLetter')}
                                    </p>
                                    <strong>{document.dateOfLetter}</strong>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--color-gray-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                        {t('documentWorkflow.circulationList')}
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                                        {document.ccList.map((cc, index) => (
                                            <span key={index} style={{ fontSize: 'var(--text-sm)' }}>• {cc}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <Card style={{ marginTop: 'var(--spacing-lg)' }}>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>{t('documentWorkflow.detailsDesc')}</h3>
                        </CardHeader>
                        <CardBody>
                            <p style={{
                                fontSize: 'var(--text-sm)',
                                color: 'var(--color-gray-700)',
                                lineHeight: 1.6,
                                margin: 0
                            }}>
                                {document.description}
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </div>

            {/* Reassign Modal */}
            {showReassignModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <Card style={{ width: '500px', maxWidth: '90vw' }}>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>{t('documentWorkflow.reassignDocument')}</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                                <Input
                                    label={t('documentClassification.department')}
                                    value={document.department}
                                    disabled
                                    helperText={t('documentWorkflow.departmentReadOnly')}
                                />
                                <Select
                                    label={t('documentClassification.assignedTo')}
                                    options={[
                                        { value: 'Ahmad bin Ali', label: 'Ahmad bin Ali - Chief Financial Officer' },
                                        { value: 'Other Officer', label: 'Other Officer - Senior Accountant' }
                                    ]}
                                />
                                <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                                    <Button fullWidth onClick={() => { alert(t('documentWorkflow.reassignSuccess')); setShowReassignModal(false); }}>
                                        {t('documentWorkflow.confirmReassign')}
                                    </Button>
                                    <Button variant="outline" fullWidth onClick={() => setShowReassignModal(false)}>
                                        {t('common.cancel')}
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}
        </div>
    );
};
