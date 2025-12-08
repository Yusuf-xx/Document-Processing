import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { StatusBadge } from '../components/UI/Badge';
import { mockDocuments } from '../data/mockData';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Bell,
    CheckCircle,
    Clock,
    Mail,
    MessageSquare
} from 'lucide-react';

export const Calendar: React.FC = () => {
    // State for current month navigation
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    // Helper to get days in month
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Helper to get day of week for first day of month (0-6)
    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Navigation handlers
    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const goToToday = () => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDate(today);
    };

    // Get documents due in this month
    const documentsInMonth = useMemo(() => {
        return mockDocuments.filter(doc => {
            const docDate = new Date(doc.dueDate);
            return docDate.getMonth() === month && docDate.getFullYear() === year;
        });
    }, [month, year]);

    // Get documents for selected date
    const selectedDateDocs = useMemo(() => {
        if (!selectedDate) return [];
        return mockDocuments.filter(doc => {
            const docDate = new Date(doc.dueDate);
            return docDate.getDate() === selectedDate.getDate() &&
                docDate.getMonth() === selectedDate.getMonth() &&
                docDate.getFullYear() === selectedDate.getFullYear();
        });
    }, [selectedDate]);

    // Generate upcoming reminders (simulated for documents with approaching due dates)
    const upcomingReminders = useMemo(() => {
        const today = new Date();
        return mockDocuments
            .filter(doc => {
                const dueDate = new Date(doc.dueDate);
                const diffTime = dueDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays >= 0 && diffDays <= 7; // Due within next 7 days
            })
            .map(doc => ({
                id: doc.id,
                docId: doc.referenceNumber,
                title: doc.title,
                dueDate: doc.dueDate,
                assignee: doc.assignedTo,
                status: 'Scheduled', // Simulated status
                classification: doc.classification
            }));
    }, []);

    const [reminders, setReminders] = useState(upcomingReminders);

    const handleSendReminder = (id: string) => {
        setReminders(prev => prev.map(rem =>
            rem.id === id ? { ...rem, status: 'Sent' } : rem
        ));
        alert(`Reminder sent for document! Notification dispatched to assignee.`);
    };

    // Calendar Grid Generation
    const renderCalendarDays = () => {
        const days = [];

        // Empty cells for days before the 1st
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty" style={{ background: 'var(--color-gray-50)' }}></div>);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
            const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === month && selectedDate?.getFullYear() === year;

            // Find docs due on this day
            const dayDocs = documentsInMonth.filter(d => new Date(d.dueDate).getDate() === day);

            days.push(
                <div
                    key={day}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => setSelectedDate(new Date(year, month, day))}
                    style={{
                        minHeight: '100px',
                        border: '1px solid var(--color-gray-200)',
                        padding: 'var(--spacing-xs)',
                        cursor: 'pointer',
                        background: isSelected ? 'var(--color-primary-50)' : 'white',
                        position: 'relative'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '4px'
                    }}>
                        <span style={{
                            fontWeight: isToday ? 'bold' : 'normal',
                            color: isToday ? 'var(--color-primary-600)' : 'inherit',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            background: isToday ? 'var(--color-primary-100)' : 'transparent'
                        }}>
                            {day}
                        </span>
                        {dayDocs.length > 0 && (
                            <span style={{
                                fontSize: '10px',
                                background: 'var(--color-danger-100)',
                                color: 'var(--color-danger-700)',
                                padding: '2px 6px',
                                borderRadius: '10px',
                                fontWeight: 'bold'
                            }}>
                                {dayDocs.length} Due
                            </span>
                        )}
                    </div>

                    <div className="day-events" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {dayDocs.slice(0, 3).map((doc, idx) => (
                            <div key={idx} style={{
                                fontSize: '10px',
                                padding: '2px 4px',
                                background: 'var(--color-primary-100)',
                                color: 'var(--color-primary-800)',
                                borderRadius: '2px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {doc.referenceNumber}
                            </div>
                        ))}
                        {dayDocs.length > 3 && (
                            <div style={{ fontSize: '10px', color: 'var(--color-gray-500)', paddingLeft: '4px' }}>
                                + {dayDocs.length - 3} more
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return days;
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Calendar & Reminders</h1>
                    <p className="page-description">Manage document deadlines and automated notifications</p>
                </div>
                <div className="page-actions">
                    <Button variant="outline" onClick={goToToday}>Today</Button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', background: 'white', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-300)' }}>
                        <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                            <ChevronLeft size={20} />
                        </button>
                        <span style={{ width: '120px', textAlign: 'center', fontWeight: 600 }}>
                            {monthNames[month]} {year}
                        </span>
                        <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    <Button icon={<Bell size={18} />}>Settings</Button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 'var(--spacing-xl)' }}>
                {/* Main Calendar Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                    <Card>
                        <CardBody style={{ padding: 0 }}>
                            {/* Weekday Headers */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(7, 1fr)',
                                borderBottom: '1px solid var(--color-gray-200)',
                                background: 'var(--color-gray-50)'
                            }}>
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} style={{
                                        padding: 'var(--spacing-md)',
                                        textAlign: 'center',
                                        fontWeight: 600,
                                        color: 'var(--color-gray-600)',
                                        fontSize: 'var(--text-sm)'
                                    }}>
                                        {day}
                                    </div>
                                ))}
                            </div>
                            {/* Calendar Days */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                                {renderCalendarDays()}
                            </div>
                        </CardBody>
                    </Card>

                    {/* Selected Day Details */}
                    {selectedDateDocs.length > 0 && selectedDate && (
                        <Card>
                            <CardHeader>
                                <h3 style={{ margin: 0 }}>Documents Due on {selectedDate.toDateString()}</h3>
                            </CardHeader>
                            <CardBody>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                    {selectedDateDocs.map(doc => (
                                        <div key={doc.id} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: 'var(--spacing-md)',
                                            border: '1px solid var(--color-gray-200)',
                                            borderRadius: 'var(--radius-md)'
                                        }}>
                                            <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                                                <div style={{
                                                    background: 'var(--color-primary-50)',
                                                    padding: '8px',
                                                    borderRadius: '50%',
                                                    color: 'var(--color-primary-600)'
                                                }}>
                                                    <CalendarIcon size={20} />
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: 'var(--text-sm)' }}>{doc.title}</h4>
                                                    <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>
                                                        {doc.referenceNumber} • Assigned to: {doc.assignedTo}
                                                    </p>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                                <StatusBadge status={doc.status} />
                                                <Button size="sm" variant="outline" icon={<MessageSquare size={14} />}>
                                                    Details
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    )}
                </div>

                {/* Right Panel: Reminders & Automation */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                    <Card>
                        <CardHeader>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                <Clock size={20} className="text-primary" />
                                <h3 style={{ margin: 0 }}>Upcoming Reminders</h3>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-md)' }}>
                                Automated reminders for documents due within 7 days.
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                {reminders.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)', color: 'var(--color-gray-500)' }}>
                                        No upcoming reminders
                                    </div>
                                ) : (
                                    reminders.map((reminder, idx) => (
                                        <div key={idx} style={{
                                            borderLeft: '3px solid var(--color-warning-500)',
                                            padding: 'var(--spacing-sm) var(--spacing-md)',
                                            background: 'var(--color-gray-50)',
                                            borderRadius: '0 var(--radius-md) var(--radius-md) 0'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <strong style={{ fontSize: 'var(--text-sm)' }}>{reminder.docId}</strong>
                                                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-danger-600)', fontWeight: 600 }}>
                                                    {new Date(reminder.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-600)', margin: '0 0 8px 0' }}>
                                                {reminder.title}
                                            </p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{
                                                    fontSize: 'var(--text-xs)',
                                                    padding: '2px 6px',
                                                    borderRadius: '10px',
                                                    background: reminder.status === 'Sent' ? 'var(--color-success-100)' : 'var(--color-gray-200)',
                                                    color: reminder.status === 'Sent' ? 'var(--color-success-700)' : 'var(--color-gray-700)'
                                                }}>
                                                    {reminder.status}
                                                </span>
                                                {reminder.status !== 'Sent' && (
                                                    <button
                                                        onClick={() => handleSendReminder(reminder.id)}
                                                        style={{
                                                            border: 'none',
                                                            background: 'none',
                                                            color: 'var(--color-primary-600)',
                                                            cursor: 'pointer',
                                                            fontSize: 'var(--text-xs)',
                                                            fontWeight: 600,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '2px'
                                                        }}
                                                    >
                                                        Send Now <Mail size={12} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>Automation Rules</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'flex-start' }}>
                                    <CheckCircle size={16} style={{ color: 'var(--color-success-500)', marginTop: '2px' }} />
                                    <div>
                                        <strong style={{ fontSize: 'var(--text-sm)', display: 'block' }}>3 Days Before Due</strong>
                                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', margin: 0 }}>Email to Assignee</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'flex-start' }}>
                                    <CheckCircle size={16} style={{ color: 'var(--color-success-500)', marginTop: '2px' }} />
                                    <div>
                                        <strong style={{ fontSize: 'var(--text-sm)', display: 'block' }}>1 Day Before Due</strong>
                                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', margin: 0 }}>SMS & Email to Assignee + Manager</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'flex-start' }}>
                                    <CheckCircle size={16} style={{ color: 'var(--color-success-500)', marginTop: '2px' }} />
                                    <div>
                                        <strong style={{ fontSize: 'var(--text-sm)', display: 'block' }}>Overdue</strong>
                                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', margin: 0 }}>System Alert to Administrator</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" fullWidth>Configure Rules</Button>
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <h3 style={{ margin: 0 }}>Legend</h3>
                        </CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)' }}>
                                    <span style={{ width: '8px', height: '8px', background: 'var(--color-danger-100)', borderRadius: '50%' }}></span>
                                    <span>Deadline</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)' }}>
                                    <span style={{ width: '8px', height: '8px', background: 'var(--color-primary-100)', borderRadius: '50%' }}></span>
                                    <span>Selected</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)' }}>
                                    <span style={{ width: '8px', height: '8px', background: 'var(--color-success-100)', borderRadius: '50%' }}></span>
                                    <span>Completed</span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};
