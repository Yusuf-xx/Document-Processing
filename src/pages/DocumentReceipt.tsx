import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input, Textarea } from '../components/UI/Input';
import { Upload, QrCode, Save } from 'lucide-react';
import { generateReferenceNumber } from '../utils/helpers';
import { QRCodeSVG as QRCode } from 'qrcode.react';

export const DocumentReceipt: React.FC = () => {
    const { t } = useTranslation();
    const [refNumber] = useState(generateReferenceNumber());
    const [formData, setFormData] = useState({
        dateReceived: new Date().toISOString().split('T')[0],
        sender: '',
        dateOfLetter: '',
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Document registered successfully!');
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">{t('documentReceipt.title')}</h1>
                    <p className="page-description">{t('documentReceipt.description')}</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
                <Card>
                    <CardHeader>
                        <h3 style={{ margin: 0 }}>{t('documentReceipt.documentInfo')}</h3>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                            <Input
                                label={t('documentReceipt.refNumber')}
                                value={refNumber}
                                disabled
                                helperText={t('documentReceipt.refNumberHelper')}
                            />

                            <Input
                                label={t('documentReceipt.dateReceived')}
                                type="date"
                                value={formData.dateReceived}
                                onChange={(e) => setFormData({ ...formData, dateReceived: e.target.value })}
                                required
                            />

                            <Input
                                label={t('documentReceipt.sender')}
                                placeholder={t('documentReceipt.senderPlaceholder')}
                                value={formData.sender}
                                onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                                required
                            />

                            <Input
                                label={t('documentReceipt.dateOfLetter')}
                                type="date"
                                value={formData.dateOfLetter}
                                onChange={(e) => setFormData({ ...formData, dateOfLetter: e.target.value })}
                                required
                            />

                            <Textarea
                                label={t('documentReceipt.notes')}
                                placeholder={t('documentReceipt.notesPlaceholder')}
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                rows={4}
                            />

                            <div style={{ marginTop: 'var(--spacing-md)' }}>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                                    {t('documentReceipt.uploadEnvelope')}
                                </label>
                                <div style={{
                                    border: '2px dashed var(--color-gray-300)',
                                    borderRadius: 'var(--radius-lg)',
                                    padding: 'var(--spacing-2xl)',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-fast)'
                                }}>
                                    <Upload size={32} style={{ color: 'var(--color-gray-400)', margin: '0 auto var(--spacing-md)' }} />
                                    <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-sm)' }}>
                                        {t('documentReceipt.uploadText')}
                                    </p>
                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>
                                        {t('documentReceipt.uploadHint')}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
                                <Button type="submit" icon={<Save size={18} />}>
                                    {t('documentReceipt.register')}
                                </Button>
                                <Button type="button" variant="outline">
                                    {t('common.cancel')}
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>

                <div>
                    <Card>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>{t('documentReceipt.qrCode')}</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    padding: 'var(--spacing-lg)',
                                    background: 'white',
                                    display: 'inline-block',
                                    borderRadius: 'var(--radius-lg)',
                                    boxShadow: 'var(--shadow-md)'
                                }}>
                                    <QRCode value={refNumber} size={180} />
                                </div>
                                <p style={{ marginTop: 'var(--spacing-md)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                                    {t('documentReceipt.scanQr')}
                                </p>
                                <Button variant="outline" size="sm" style={{ marginTop: 'var(--spacing-md)' }} icon={<QrCode size={16} />}>
                                    {t('documentReceipt.printQr')}
                                </Button>
                            </div>
                        </CardBody>
                    </Card>

                    <Card style={{ marginTop: 'var(--spacing-lg)' }}>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>{t('documentReceipt.nextSteps')}</h3>
                        </CardHeader>
                        <CardBody>
                            <ol style={{ paddingLeft: 'var(--spacing-lg)', margin: 0 }}>
                                <li style={{ marginBottom: 'var(--spacing-sm)' }}>{t('documentReceipt.steps.register')}</li>
                                <li style={{ marginBottom: 'var(--spacing-sm)' }}>{t('documentReceipt.steps.scan')}</li>
                                <li style={{ marginBottom: 'var(--spacing-sm)' }}>{t('documentReceipt.steps.ocr')}</li>
                                <li>{t('documentReceipt.steps.classification')}</li>
                            </ol>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};
