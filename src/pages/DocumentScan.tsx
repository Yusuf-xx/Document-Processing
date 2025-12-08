import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Scan as ScanIcon, Upload, CheckCircle, RotateCw } from 'lucide-react';

export const DocumentScan: React.FC = () => {
    const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'complete' | 'error'>('idle');
    const [quality, setQuality] = useState({ resolution: 0, clarity: 0, orientation: 0 });

    const handleScan = () => {
        setScanStatus('scanning');
        setTimeout(() => {
            setQuality({ resolution: 95, clarity: 92, orientation: 100 });
            setScanStatus('complete');
        }, 2000);
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Document Scanning</h1>
                    <p className="page-description">Digitize physical documents with quality verification</p>
                </div>
                <div className="page-actions">
                    <Button variant="outline">View Queue</Button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)' }}>
                <Card>
                    <CardHeader>
                        <h3 style={{ margin: 0 }}>Scan Document</h3>
                    </CardHeader>
                    <CardBody>
                        <div style={{
                            border: '2px dashed var(--color-gray-300)',
                            borderRadius: 'var(--radius-xl)',
                            padding: 'var(--spacing-3xl)',
                            textAlign: 'center',
                            background: scanStatus === 'scanning' ? 'var(--color-primary-50)' : 'var(--color-gray-50)'
                        }}>
                            {scanStatus === 'idle' && (
                                <>
                                    <ScanIcon size={64} style={{ color: 'var(--color-gray-400)', margin: '0 auto var(--spacing-lg)' }} />
                                    <h3>Ready to Scan</h3>
                                    <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-xl)' }}>
                                        Place document on scanner or upload digital file
                                    </p>
                                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
                                        <Button onClick={handleScan} icon={<ScanIcon size={18} />}>
                                            Start Scanning
                                        </Button>
                                        <Button variant="outline" icon={<Upload size={18} />}>
                                            Upload File
                                        </Button>
                                    </div>
                                </>
                            )}

                            {scanStatus === 'scanning' && (
                                <>
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        border: '4px solid var(--color-primary-200)',
                                        borderTopColor: 'var(--color-primary-600)',
                                        borderRadius: '50%',
                                        margin: '0 auto var(--spacing-lg)',
                                        animation: 'spin 1s linear infinite'
                                    }}></div>
                                    <h3>Scanning in Progress...</h3>
                                    <p style={{ color: 'var(--color-gray-600)' }}>Please wait while we digitize your document</p>
                                </>
                            )}

                            {scanStatus === 'complete' && (
                                <>
                                    <CheckCircle size={64} style={{ color: 'var(--color-success-600)', margin: '0 auto var(--spacing-lg)' }} />
                                    <h3>Scan Complete!</h3>
                                    <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-xl)' }}>
                                        Document has been successfully scanned
                                    </p>
                                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
                                        <Button>Proceed to OCR</Button>
                                        <Button variant="outline" icon={<RotateCw size={18} />} onClick={() => setScanStatus('idle')}>
                                            Scan Another
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>

                        {scanStatus === 'complete' && (
                            <div style={{ marginTop: 'var(--spacing-xl)' }}>
                                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Quality Check Results</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                            <span style={{ fontSize: 'var(--text-sm)' }}>Resolution</span>
                                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{quality.resolution}%</span>
                                        </div>
                                        <div style={{
                                            height: '8px',
                                            background: 'var(--color-gray-200)',
                                            borderRadius: 'var(--radius-full)',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${quality.resolution}%`,
                                                height: '100%',
                                                background: 'var(--color-success-500)',
                                                transition: 'width 0.5s ease-out'
                                            }}></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                            <span style={{ fontSize: 'var(--text-sm)' }}>Clarity</span>
                                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{quality.clarity}%</span>
                                        </div>
                                        <div style={{
                                            height: '8px',
                                            background: 'var(--color-gray-200)',
                                            borderRadius: 'var(--radius-full)',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${quality.clarity}%`,
                                                height: '100%',
                                                background: 'var(--color-success-500)',
                                                transition: 'width 0.5s ease-out'
                                            }}></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                            <span style={{ fontSize: 'var(--text-sm)' }}>Orientation</span>
                                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{quality.orientation}%</span>
                                        </div>
                                        <div style={{
                                            height: '8px',
                                            background: 'var(--color-gray-200)',
                                            borderRadius: 'var(--radius-full)',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${quality.orientation}%`,
                                                height: '100%',
                                                background: 'var(--color-success-500)',
                                                transition: 'width 0.5s ease-out'
                                            }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <h3 style={{ margin: 0 }}>Preview</h3>
                    </CardHeader>
                    <CardBody>
                        <div style={{
                            background: 'var(--color-gray-100)',
                            borderRadius: 'var(--radius-lg)',
                            aspectRatio: '8.5/11',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--color-gray-300)'
                        }}>
                            {scanStatus === 'complete' ? (
                                <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                                    <div style={{
                                        background: 'white',
                                        padding: 'var(--spacing-2xl)',
                                        borderRadius: 'var(--radius-lg)',
                                        boxShadow: 'var(--shadow-lg)'
                                    }}>
                                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                                            Scanned Document Preview
                                        </p>
                                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', marginTop: 'var(--spacing-sm)' }}>
                                            DOC-2024-001
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p style={{ color: 'var(--color-gray-500)' }}>No document scanned yet</p>
                            )}
                        </div>

                        {scanStatus === 'complete' && (
                            <div style={{ marginTop: 'var(--spacing-lg)', display: 'flex', gap: 'var(--spacing-md)' }}>
                                <Button variant="outline" size="sm" fullWidth>Rotate</Button>
                                <Button variant="outline" size="sm" fullWidth>Crop</Button>
                                <Button variant="outline" size="sm" fullWidth>Enhance</Button>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
