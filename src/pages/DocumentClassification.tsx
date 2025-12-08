import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Select, Input } from '../components/UI/Input';
import { Badge } from '../components/UI/Badge';
import { Send, UserPlus } from 'lucide-react';
import { departments, classifications } from '../data/mockData';

export const DocumentClassification: React.FC = () => {
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

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Document Classification & Assignment</h1>
                    <p className="page-description">Classify document and assign to appropriate personnel</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
                <Card>
                    <CardHeader>
                        <h3 style={{ margin: 0 }}>Classification Details</h3>
                    </CardHeader>
                    <CardBody>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                            <Select
                                label="Security Classification"
                                value={formData.classification}
                                onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
                                options={classifications.map(c => ({ value: c, label: c }))}
                                helperText="Classification determines access control and SLA timelines"
                            />

                            <Select
                                label="Department"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                options={departments.map(d => ({ value: d, label: d }))}
                            />

                            <Input
                                label="Assigned To"
                                placeholder="Select officer name"
                                value={formData.assignedTo}
                                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                            />

                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                                    Routing Option
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
                                        <span>Route to General Manager first</span>
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="routing"
                                            value="direct"
                                            checked={formData.routing === 'direct'}
                                            onChange={(e) => setFormData({ ...formData, routing: e.target.value })}
                                        />
                                        <span>Direct distribution to departments</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                                    CC List
                                </label>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                                    <Input
                                        placeholder="Enter name or email"
                                        value={newCC}
                                        onChange={(e) => setNewCC(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && addCC()}
                                    />
                                    <Button onClick={addCC} icon={<UserPlus size={18} />}>
                                        Add
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
                                label="Priority"
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                options={[
                                    { value: 'Low', label: 'Low' },
                                    { value: 'Medium', label: 'Medium' },
                                    { value: 'High', label: 'High' },
                                    { value: 'Critical', label: 'Critical' }
                                ]}
                            />

                            <Input
                                label="Due Date"
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                helperText="Based on security classification SLA"
                            />

                            <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
                                <Button icon={<Send size={18} />}>
                                    Classify & Assign
                                </Button>
                                <Button variant="outline">
                                    Save as Draft
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <div>
                    <Card>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>Classification Guide</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                <div>
                                    <Badge variant="danger" size="sm">Top Secret</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        Highest classification. Unauthorized disclosure could cause exceptionally grave damage.
                                    </p>
                                </div>
                                <div>
                                    <Badge variant="danger" size="sm">Secret</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        Unauthorized disclosure could cause serious damage to national security.
                                    </p>
                                </div>
                                <div>
                                    <Badge variant="warning" size="sm">Confidential</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        Unauthorized disclosure could cause damage to government interests.
                                    </p>
                                </div>
                                <div>
                                    <Badge variant="info" size="sm">Restricted</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        Limited distribution within authorized personnel only.
                                    </p>
                                </div>
                                <div>
                                    <Badge variant="gray" size="sm">Internal Use</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        For internal government use only.
                                    </p>
                                </div>
                                <div>
                                    <Badge variant="success" size="sm">Open</Badge>
                                    <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-gray-600)' }}>
                                        Public information, no restrictions.
                                    </p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <Card style={{ marginTop: 'var(--spacing-lg)' }}>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>SLA Timelines</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Top Secret:</span>
                                    <strong>24 hours</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Secret:</span>
                                    <strong>48 hours</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Confidential:</span>
                                    <strong>3 days</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Restricted:</span>
                                    <strong>5 days</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Internal/Open:</span>
                                    <strong>7 days</strong>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};
