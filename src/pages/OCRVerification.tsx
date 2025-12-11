import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input, Textarea } from '../components/UI/Input';
import { Badge } from '../components/UI/Badge';
import { CheckCircle, Edit2, Save } from 'lucide-react';

export const OCRVerification: React.FC = () => {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [ocrData, setOcrData] = useState({
        sender: 'Ministry of Finance',
        dateOfLetter: '2024-11-28',
        title: 'Budget Proposal for Q1 2025',
        description: 'Annual budget proposal for the first quarter of 2025 including detailed breakdown of departmental allocations and projected expenditures.'
    });

    const confidence = {
        sender: 98,
        dateOfLetter: 95,
        title: 99,
        description: 92,
        overall: 96
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">{t('ocrVerification.title')}</h1>
                    <p className="page-description">{t('ocrVerification.description')}</p>
                </div>
                <div className="page-actions">
                    <Badge variant="success">{t('ocrVerification.confidence')}: {confidence.overall}%</Badge>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)' }}>
                <Card>
                    <CardHeader>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <h3 style={{ margin: 0 }}>{t('ocrVerification.extractedInfo')}</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                icon={isEditing ? <Save size={16} /> : <Edit2 size={16} />}
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? t('ocrVerification.save') : t('ocrVerification.edit')}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                    <label style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{t('ocrVerification.sender')}</label>
                                    <Badge variant={confidence.sender >= 95 ? 'success' : 'warning'} size="sm">
                                        {confidence.sender}%
                                    </Badge>
                                </div>
                                {isEditing ? (
                                    <Input
                                        value={ocrData.sender}
                                        onChange={(e) => setOcrData({ ...ocrData, sender: e.target.value })}
                                    />
                                ) : (
                                    <p style={{ padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)' }}>
                                        {ocrData.sender}
                                    </p>
                                )}
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                    <label style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{t('ocrVerification.dateOfLetter')}</label>
                                    <Badge variant={confidence.dateOfLetter >= 95 ? 'success' : 'warning'} size="sm">
                                        {confidence.dateOfLetter}%
                                    </Badge>
                                </div>
                                {isEditing ? (
                                    <Input
                                        type="date"
                                        value={ocrData.dateOfLetter}
                                        onChange={(e) => setOcrData({ ...ocrData, dateOfLetter: e.target.value })}
                                    />
                                ) : (
                                    <p style={{ padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)' }}>
                                        {ocrData.dateOfLetter}
                                    </p>
                                )}
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                    <label style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{t('ocrVerification.subject')}</label>
                                    <Badge variant={confidence.title >= 95 ? 'success' : 'warning'} size="sm">
                                        {confidence.title}%
                                    </Badge>
                                </div>
                                {isEditing ? (
                                    <Input
                                        value={ocrData.title}
                                        onChange={(e) => setOcrData({ ...ocrData, title: e.target.value })}
                                    />
                                ) : (
                                    <p style={{ padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)' }}>
                                        {ocrData.title}
                                    </p>
                                )}
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                    <label style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{t('ocrVerification.summary')}</label>
                                    <Badge variant={confidence.description >= 95 ? 'success' : 'warning'} size="sm">
                                        {confidence.description}%
                                    </Badge>
                                </div>
                                {isEditing ? (
                                    <Textarea
                                        value={ocrData.description}
                                        onChange={(e) => setOcrData({ ...ocrData, description: e.target.value })}
                                        rows={4}
                                    />
                                ) : (
                                    <p style={{ padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)' }}>
                                        {ocrData.description}
                                    </p>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
                                <Button icon={<CheckCircle size={18} />}>
                                    {t('ocrVerification.approve')}
                                </Button>
                                <Button variant="outline">
                                    {t('ocrVerification.rescan')}
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <h3 style={{ margin: 0 }}>{t('ocrVerification.preview')}</h3>
                    </CardHeader>
                    <CardBody>
                        <div style={{
                            background: 'var(--color-gray-100)',
                            borderRadius: 'var(--radius-lg)',
                            aspectRatio: '8.5/11',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--color-gray-300)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                background: 'white',
                                padding: 'var(--spacing-2xl)',
                                width: '90%',
                                height: '90%',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-lg)',
                                overflow: 'auto'
                            }}>
                                <div style={{ fontSize: 'var(--text-xs)', lineHeight: 1.6, color: 'var(--color-gray-700)' }}>
                                    <p style={{ fontWeight: 'bold', marginBottom: 'var(--spacing-md)' }}>
                                        {ocrData.title}
                                    </p>
                                    <p style={{ marginBottom: 'var(--spacing-sm)' }}>
                                        From: {ocrData.sender}
                                    </p>
                                    <p style={{ marginBottom: 'var(--spacing-md)' }}>
                                        Date: {ocrData.dateOfLetter}
                                    </p>
                                    <p>
                                        {ocrData.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 'var(--spacing-lg)' }}>
                            <h4 style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--spacing-md)' }}>{t('ocrVerification.processingDetails')}</h4>
                            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                                <p style={{ marginBottom: 'var(--spacing-sm)' }}>• {t('ocrVerification.language')}</p>
                                <p style={{ marginBottom: 'var(--spacing-sm)' }}>• {t('ocrVerification.processingTime')}: 3.2 seconds</p>
                                <p style={{ marginBottom: 'var(--spacing-sm)' }}>• {t('ocrVerification.pages')}: 1</p>
                                <p>• {t('ocrVerification.overallConfidence')}: {confidence.overall}%</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
