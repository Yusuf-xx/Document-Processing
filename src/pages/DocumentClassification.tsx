import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Select, Input } from '../components/UI/Input';
import { Badge } from '../components/UI/Badge';
import { Send, UserPlus } from 'lucide-react';
import { departments, classifications } from '../data/mockData';

export const DocumentClassification: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        classification: 'Confidential',
        department: 'Finance',
        assignedTo: '',
        routing: 'direct',
        ccList: [] as string[],
        priority: 'High',
        dueDate: ''
    });

    const [newCC, setNewCC] = useState('');

    const addCC = () => {
        if (newCC && !formData.ccList.includes(newCC)) {
            setFormData({ ...formData, ccList: [...formData.ccList, newCC] });
            setNewCC('');
        }
    };

    const removeCC = (cc: string) => {
        setFormData({ ...formData, ccList: formData.ccList.filter(c => c !== cc) });
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
                        <h3 style={{ margin: 0 }}>{t('documentClassification.details')}</h3>
                    </CardHeader>
                    <CardBody>
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
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                options={departments.map(d => ({ value: d, label: getDepartmentLabel(d) }))}
                            />

                            <Input
                                label={t('documentClassification.assignedTo')}
                                placeholder={t('documentClassification.assignedPlaceholder')}
                                value={formData.assignedTo}
                                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                            />

                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                                    {t('documentClassification.routing')}
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
                                        <span>{t('documentClassification.routeDirect')}</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                                    {t('documentClassification.ccList')}
                                </label>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                                    <Input
                                        placeholder={t('documentClassification.ccPlaceholder')}
                                        value={newCC}
                                        onChange={(e) => setNewCC(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && addCC()}
                                    />
                                    <Button onClick={addCC} icon={<UserPlus size={18} />}>
                                        {t('documentClassification.add')}
                                    </Button>
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

                            <Select
                                label={t('documentClassification.priority')}
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                options={[
                                    { value: 'Low', label: getPriorityLabel('Low') },
                                    { value: 'Medium', label: getPriorityLabel('Medium') },
                                    { value: 'High', label: getPriorityLabel('High') },
                                    { value: 'Critical', label: getPriorityLabel('Critical') }
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
                                    <Badge variant="danger" size="sm">{t('classification.topSecret')}</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        {t('documentClassification.topSecretDesc')}
                                    </p>
                                </div>
                                <div>
                                    <Badge variant="danger" size="sm">{t('classification.secret')}</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        {t('documentClassification.secretDesc')}
                                    </p>
                                </div>
                                <div>
                                    <Badge variant="warning" size="sm">{t('classification.confidential')}</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        {t('documentClassification.confidentialDesc')}
                                    </p>
                                </div>
                                <div>
                                    <Badge variant="info" size="sm">{t('classification.restricted')}</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        {t('documentClassification.restrictedDesc')}
                                    </p>
                                </div>
                                <div>
                                    <Badge variant="gray" size="sm">{t('classification.internalUse')}</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        {t('documentClassification.internalUseDesc')}
                                    </p>
                                </div>
                                <div>
                                    <Badge variant="success" size="sm">{t('classification.open')}</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        {t('documentClassification.openDesc')}
                                    </p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <Card style={{ marginTop: 'var(--spacing-lg)' }}>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>{t('documentClassification.sla')}</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{t('classification.topSecret')}:</span>
                                    <strong>24 {t('common.hours')}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{t('classification.secret')}:</span>
                                    <strong>48 {t('common.hours')}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{t('classification.confidential')}:</span>
                                    <strong>3 {t('common.days')}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{t('classification.restricted')}:</span>
                                    <strong>5 {t('common.days')}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{t('classification.internalUse')}/{t('classification.open')}:</span>
                                    <strong>7 {t('common.days')}</strong>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};
