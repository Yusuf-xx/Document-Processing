import React, { useState, useMemo } from 'react';
import { Card, CardBody } from './Card';
import { Button } from './Button';
import { StatusBadge } from './Badge';
import { mockDocuments } from '../../data/mockData';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CompactCalendar.css';

export const CompactCalendar: React.FC = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
    const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    // Get documents for selected date
    const selectedDateDocs = useMemo(() => {
        return mockDocuments.filter(doc => {
            const docDate = new Date(doc.dueDate);
            return docDate.getDate() === selectedDate.getDate() &&
                docDate.getMonth() === selectedDate.getMonth() &&
                docDate.getFullYear() === selectedDate.getFullYear();
        });
    }, [selectedDate]);

    // Check which days have documents
    const daysWithDocs = useMemo(() => {
        const days = new Set();
        mockDocuments.forEach(doc => {
            const d = new Date(doc.dueDate);
            if (d.getMonth() === month && d.getFullYear() === year) {
                days.add(d.getDate());
            }
        });
        return days;
    }, [month, year]);


    const renderCalendarDays = () => {
        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
            const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
            const hasDocs = daysWithDocs.has(day);

            days.push(
                <div
                    key={day}
                    onClick={() => setSelectedDate(new Date(year, month, day))}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                >
                    <span>{day}</span>
                    {hasDocs && (
                        <span className="calendar-dot has-docs"></span>
                    )}
                </div>
            );
        }
        return days;
    };

    return (
        <Card className="compact-calendar-card">
            <CardBody className="p-0">
                <div className="calendar-layout">
                    {/* Left: Mini Calendar */}
                    <div className="calendar-panel">
                        <div className="calendar-header">
                            <h3>
                                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h3>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <button onClick={prevMonth} className="calendar-nav-btn">
                                    <ChevronLeft size={16} />
                                </button>
                                <button onClick={nextMonth} className="calendar-nav-btn">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="calendar-grid-header">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                <div key={d} className="calendar-day-label">
                                    {d}
                                </div>
                            ))}
                        </div>
                        <div className="calendar-grid">
                            {renderCalendarDays()}
                        </div>
                    </div>

                    {/* Right: Tasks List */}
                    <div className="tasks-panel">
                        <div className="tasks-header">
                            <div className="tasks-title">
                                <h3>
                                    Tasks for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                                </h3>
                                <p>
                                    {selectedDateDocs.length} documents due today
                                </p>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => navigate('/calendar')}>
                                Open Calendar
                            </Button>
                        </div>

                        <div className="tasks-list">
                            {selectedDateDocs.length === 0 ? (
                                <div className="task-empty">
                                    <CalendarIcon size={40} className="task-empty-icon" />
                                    <p>No documents due on this date</p>
                                </div>
                            ) : (
                                <div>
                                    {selectedDateDocs.map(doc => (
                                        <div key={doc.id} className="task-item">
                                            <div className="task-left">
                                                <div className={`task-icon ${doc.status === 'Completed' ? 'success' : 'primary'}`}>
                                                    <CalendarIcon size={18} />
                                                </div>
                                                <div className="task-info">
                                                    <h4>{doc.title}</h4>
                                                    <p>{doc.referenceNumber} • {doc.assignedTo}</p>
                                                </div>
                                            </div>
                                            <div className="task-right">
                                                <StatusBadge status={doc.status} />
                                                <button className="task-action-btn">
                                                    <ArrowRight size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
