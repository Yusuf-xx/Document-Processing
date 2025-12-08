import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import './Table.css';

interface Column<T> {
    key: string;
    header: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    searchable?: boolean;
    searchPlaceholder?: string;
    onRowClick?: (item: T) => void;
}

export function Table<T extends Record<string, any>>({
    data,
    columns,
    searchable = false,
    searchPlaceholder = 'Search...',
    onRowClick
}: TableProps<T>) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredData = data.filter((item) => {
        if (!searchTerm) return true;
        return Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <div className="table-container">
            {searchable && (
                <div className="table-search">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            )}
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={column.sortable ? 'sortable' : ''}
                                    onClick={() => column.sortable && handleSort(column.key)}
                                >
                                    <div className="th-content">
                                        {column.header}
                                        {column.sortable && sortConfig?.key === column.key && (
                                            <span className="sort-icon">
                                                {sortConfig.direction === 'asc' ? (
                                                    <ChevronUp size={16} />
                                                ) : (
                                                    <ChevronDown size={16} />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item, index) => (
                            <tr
                                key={index}
                                onClick={() => onRowClick && onRowClick(item)}
                                className={onRowClick ? 'clickable' : ''}
                            >
                                {columns.map((column) => (
                                    <td key={column.key}>
                                        {column.render ? column.render(item) : item[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {sortedData.length === 0 && (
                    <div className="table-empty">
                        <p>No data found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
