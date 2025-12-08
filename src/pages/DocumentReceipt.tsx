import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input, Textarea } from '../components/UI/Input';
import { Upload, QrCode, Save } from 'lucide-react';
import { generateReferenceNumber } from '../utils/helpers';
import { QRCodeSVG as QRCode } from 'qrcode.react';

export const DocumentReceipt: React.FC = () => {
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
                    <h1 className="page-title">Document Receipt & Registration</h1>
                    <p className="page-description">Register new incoming documents into the system</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
                <Card>
                    <CardHeader>
                        <h3 style={{ margin: 0 }}>Document Information</h3>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                            <Input
                                label="Reference Number"
                                value={refNumber}
                                disabled
                                helperText="Auto-generated reference number"
                            />

                            <Input
                                label="Date Received"
                                type="date"
                                value={formData.dateReceived}
                                onChange={(e) => setFormData({ ...formData, dateReceived: e.target.value })}
                                required
                            />

                            <Input
                                label="Sender / Originating Agency"
                                placeholder="Enter sender name or agency"
                                value={formData.sender}
                                onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                                required
                            />

                            <Input
                                label="Date of Letter/Document"
                                type="date"
                                value={formData.dateOfLetter}
                                onChange={(e) => setFormData({ ...formData, dateOfLetter: e.target.value })}
                                required
                            />

                            <Textarea
                                label="Initial Notes"
                                placeholder="Any preliminary observations or notes..."
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                rows={4}
                            />

                            <div style={{ marginTop: 'var(--spacing-md)' }}>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                                    Upload Envelope Image (Optional)
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
                                        Click to upload or drag and drop
                                    </p>
                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>
                                        PNG, JPG up to 10MB
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
                                <Button type="submit" icon={<Save size={18} />}>
                                    Register Document
                                </Button>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>

                <div>
                    <Card>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>QR Code</h3>
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
                                    Scan this QR code for quick document tracking
                                </p>
                                <Button variant="outline" size="sm" style={{ marginTop: 'var(--spacing-md)' }} icon={<QrCode size={16} />}>
                                    Print QR Code
                                </Button>
                            </div>
                        </CardBody>
                    </Card>

                    <Card style={{ marginTop: 'var(--spacing-lg)' }}>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>Next Steps</h3>
                        </CardHeader>
                        <CardBody>
                            <ol style={{ paddingLeft: 'var(--spacing-lg)', margin: 0 }}>
                                <li style={{ marginBottom: 'var(--spacing-sm)' }}>Register document details</li>
                                <li style={{ marginBottom: 'var(--spacing-sm)' }}>Proceed to scanning</li>
                                <li style={{ marginBottom: 'var(--spacing-sm)' }}>OCR verification</li>
                                <li>Classification & assignment</li>
                            </ol>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};
