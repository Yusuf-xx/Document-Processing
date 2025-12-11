import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Select, Input } from '../components/UI/Input';
import { Badge } from '../components/UI/Badge';
import { Send } from 'lucide-react';
import { departments, classifications, departmentHeads, mockUsers } from '../data/mockData';

export const DocumentClassification: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        classification: 'Restricted',
        department: 'Finance',
        assignedTo: '',
        assignedEmail: '',
        assignedDesignation: '',
        routing: 'direct',
        ccList: [] as string[],
        priority: 'High',
        dueDate: '',
        documentTitle: 'Budget Proposal for Q1 2025',
        referenceNumber: 'DOC-2025-001'
    });

    // Auto-calculate due date based on priority
    const calculateDueDate = (priority: string) => {
        const today = new Date();
        let daysToAdd = 0;

        switch (priority) {
            case 'Urgent':
                daysToAdd = 1; // 24 hours
                break;
            case 'High':
                daysToAdd = 2; // 48 hours
                break;
            case 'Medium':
                daysToAdd = 3; // 3 days
                break;
            case 'Low':
                daysToAdd = 5; // 5 days
                break;
            default:
                daysToAdd = 3;
        }

        const dueDate = new Date(today);
        dueDate.setDate(today.getDate() + daysToAdd);
        return dueDate.toISOString().split('T')[0];
    };

    // Handle priority change and auto-update due date
    const handlePriorityChange = (priority: string) => {
        const newDueDate = calculateDueDate(priority);
        setFormData({ ...formData, priority, dueDate: newDueDate });
    };

    // Remove officer from circulation list
    const removeCC = (cc: string) => {
        setFormData({ ...formData, ccList: formData.ccList.filter(c => c !== cc) });
    };

    const handleDepartmentChange = (dept: string) => {
        const head = departmentHeads[dept];
        if (head) {
            setFormData({
                ...formData,
                department: dept,
                assignedTo: head.name,
                assignedEmail: head.email,
                assignedDesignation: head.designation
            });
        } else {
            setFormData({ ...formData, department: dept });
        }
    };

    const getClassificationLabel = (c: string) => {
        const key = c.replace(/\s+/g, '').replace(/^\w/, c => c.toLowerCase());
        return t(`classification.${key}`);
    };

    const getDepartmentLabel = (d: string) => {
        return t(`departments.${d.toLowerCase()}`);
    };

    const getPriorityLabel = (p: string) => {
        return t(`documentClassification.priorities.${p.toLowerCase()}`);
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">{t('documentClassification.title')}</h1>
                    <p className="page-description">{t('documentClassification.description')}</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
                <Card>
                    <CardHeader>
                        <h3 style={{ margin: 0 }}>{t('documentClassification.documentReference')}</h3>
                    </CardHeader>
                    <CardBody>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)' }}>
                            <div>
                                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>{t('documentClassification.titleSubject')}:</span>
                                <p style={{ margin: 0, marginTop: 'var(--spacing-xs)', fontWeight: 600 }}>{formData.documentTitle}</p>
                            </div>
                            <div>
                                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>{t('documentReceipt.refNumber')}:</span>
                                <p style={{ margin: 0, marginTop: 'var(--spacing-xs)', fontWeight: 600 }}>{formData.referenceNumber}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                            <Select
                                label={t('documentClassification.securityClass')}
                                value={formData.classification}
                                onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
                                options={classifications.map(c => ({ value: c, label: getClassificationLabel(c) }))}
                                helperText={t('documentClassification.securityClassHelper')}
                            />

                            <Select
                                label={t('documentClassification.department')}
                                value={formData.department}
                                onChange={(e) => handleDepartmentChange(e.target.value)}
                                options={departments.map(d => ({ value: d, label: getDepartmentLabel(d) }))}
                            />

                            <Input
                                label={t('documentClassification.assignedDesignation')}
                                value={formData.assignedDesignation}
                                disabled
                                helperText={t('documentClassification.autoAssigned')}
                            />

                            <Input
                                label={t('documentClassification.assignedTo')}
                                value={formData.assignedTo}
                                disabled
                            />

                            <Input
                                label={t('documentClassification.assignedEmail')}
                                value={formData.assignedEmail}
                                disabled
                            />

                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                                    {t('documentClassification.additionalRouting')}
                                </label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="routing"
                                            value="gm"
                                            checked={formData.routing === 'gm'}
                                            onChange={(e) => setFormData({ ...formData, routing: e.target.value })}
                                        />
                                        <span>{t('documentClassification.routeGm')}</span>
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="routing"
                                            value="direct"
                                            checked={formData.routing === 'direct'}
                                            onChange={(e) => setFormData({ ...formData, routing: e.target.value })}
                                        />
                                        <span>{t('documentClassification.routeFollowing')}</span>
                                    </label>
                                </div>
                            </div>

                            {formData.routing === 'direct' && (
                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                                        {t('documentClassification.circulationList')}
                                    </label>
                                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-sm)' }}>
                                            {t('documentClassification.selectOfficers')}
                                        </p>
                                        {mockUsers.filter(u => u.department === formData.department).map(user => (
                                            <label key={user.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', padding: 'var(--spacing-sm)', cursor: 'pointer', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-xs)' }}>
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            if (!formData.ccList.includes(user.name)) {
                                                                setFormData({ ...formData, ccList: [...formData.ccList, user.name] });
                                                            }
                                                        } else {
                                                            setFormData({ ...formData, ccList: formData.ccList.filter(n => n !== user.name) });
                                                        }
                                                    }}
                                                    checked={formData.ccList.includes(user.name)}
                                                />
                                                <div>
                                                    <div style={{ fontWeight: 500 }}>{user.name}</div>
                                                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{user.email}</div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                                        {formData.ccList.map((cc, index) => (
                                            <Badge key={index} variant="info">
                                                {cc}
                                                <button
                                                    onClick={() => removeCC(cc)}
                                                    style={{
                                                        marginLeft: 'var(--spacing-sm)',
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        color: 'inherit',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}


                            <Select
                                label={t('documentClassification.priority')}
                                value={formData.priority}
                                onChange={(e) => handlePriorityChange(e.target.value)}
                                options={[
                                    { value: 'Low', label: getPriorityLabel('Low') },
                                    { value: 'Medium', label: getPriorityLabel('Medium') },
                                    { value: 'High', label: getPriorityLabel('High') },
                                    { value: 'Urgent', label: getPriorityLabel('Urgent') }
                                ]}
                            />

                            <Input
                                label={t('documentClassification.dueDate')}
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                helperText={t('documentClassification.dueDateHelper')}
                            />

                            <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
                                <Button icon={<Send size={18} />}>
                                    {t('documentClassification.classifyAssign')}
                                </Button>
                                <Button variant="outline">
                                    {t('documentClassification.saveDraft')}
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <div>
                    <Card>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>{t('documentClassification.guide')}</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                <div>
                                    <Badge variant="info" size="sm">{t('classification.information')}</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        {t('documentClassification.informationDesc')}
                                    </p>
                                </div>
                                <div>
                                    <Badge variant="gray" size="sm">{t('classification.operational')}</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        {t('documentClassification.operationalDesc')}
                                    </p>
                                </div>
                                <div>
                                    <Badge variant="warning" size="sm">{t('classification.restricted')}</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        {t('documentClassification.restrictedDesc')}
                                    </p>
                                </div>
                                <div>
                                    <Badge variant="danger" size="sm">{t('classification.classified')}</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        {t('documentClassification.classifiedDesc')}
                                    </p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <Card style={{ marginTop: 'var(--spacing-lg)' }}>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>{t('documentClassification.priorityTimeline')}</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{t('documentClassification.priorities.urgent')}:</span>
                                    <strong>24 {t('common.hours')}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{t('documentClassification.priorities.high')}:</span>
                                    <strong>48 {t('common.hours')}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{t('documentClassification.priorities.medium')}:</span>
                                    <strong>3 {t('common.days')}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{t('documentClassification.priorities.low')}:</span>
                                    <strong>5 {t('common.days')}</strong>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};
