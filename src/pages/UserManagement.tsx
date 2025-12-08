import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input, Select } from '../components/UI/Input';
import { Badge } from '../components/UI/Badge';
import {
    UserPlus,
    Search,
    Edit2,
    Trash2,
    Shield,
    Users,
    UserCheck,
    UserX,
    Mail,
    Building,
    X
} from 'lucide-react';
import { mockUsers } from '../data/mockData';

export const UserManagement: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterDept, setFilterDept] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Officer',
        department: 'Finance',
        status: 'Active'
    });

    const filteredUsers = mockUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        const matchesDept = filterDept === 'all' || user.department === filterDept;
        const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

        return matchesSearch && matchesRole && matchesDept && matchesStatus;
    });

    const stats = {
        total: mockUsers.length,
        active: mockUsers.filter(u => u.status === 'Active').length,
        inactive: mockUsers.filter(u => u.status === 'Inactive').length,
        admins: mockUsers.filter(u => u.role === 'Administrator').length
    };

    const handleAddUser = () => {
        setFormData({
            name: '',
            email: '',
            role: 'Officer',
            department: 'Finance',
            status: 'Active'
        });
        setEditingUser(null);
        setShowAddModal(true);
    };

    const handleEditUser = (user: any) => {
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            status: user.status
        });
        setEditingUser(user);
        setShowAddModal(true);
    };

    const handleSaveUser = () => {
        if (editingUser) {
            alert(`User "${formData.name}" updated successfully!`);
        } else {
            alert(`User "${formData.name}" added successfully!`);
        }
        setShowAddModal(false);
        setEditingUser(null);
    };

    const handleDeleteUser = (user: any) => {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            alert(`User "${user.name}" deleted successfully!`);
        }
    };

    const getRoleBadgeVariant = (role: string) => {
        switch (role) {
            case 'Administrator': return 'danger';
            case 'Officer': return 'info';
            case 'Data Entry Clerk': return 'purple';
            default: return 'gray';
        }
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">User Management</h1>
                    <p className="page-description">Manage users, roles, and permissions</p>
                </div>
                <div className="page-actions">
                    <Button icon={<UserPlus size={18} />} onClick={handleAddUser}>
                        Add New User
                    </Button>
                </div>
            </div>

            {/* User Statistics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                <Card>
                    <CardBody>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'var(--color-primary-100)',
                                color: 'var(--color-primary-600)',
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Users size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                    Total Users
                                </p>
                                <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, margin: 0 }}>
                                    {stats.total}
                                </h3>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'var(--color-success-100)',
                                color: 'var(--color-success-600)',
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <UserCheck size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                    Active Users
                                </p>
                                <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, margin: 0 }}>
                                    {stats.active}
                                </h3>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'var(--color-gray-200)',
                                color: 'var(--color-gray-600)',
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <UserX size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                    Inactive Users
                                </p>
                                <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, margin: 0 }}>
                                    {stats.inactive}
                                </h3>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'var(--color-danger-100)',
                                color: 'var(--color-danger-600)',
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Shield size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, marginBottom: 'var(--spacing-xs)' }}>
                                    Administrators
                                </p>
                                <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, margin: 0 }}>
                                    {stats.admins}
                                </h3>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
                <CardBody>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--spacing-md)', alignItems: 'end' }}>
                        <Input
                            label="Search Users"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            icon={<Search size={18} />}
                        />

                        <Select
                            label="Role"
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            options={[
                                { value: 'all', label: 'All Roles' },
                                { value: 'Administrator', label: 'Administrator' },
                                { value: 'Officer', label: 'Officer' },
                                { value: 'Data Entry Clerk', label: 'Data Entry Clerk' }
                            ]}
                        />

                        <Select
                            label="Department"
                            value={filterDept}
                            onChange={(e) => setFilterDept(e.target.value)}
                            options={[
                                { value: 'all', label: 'All Departments' },
                                { value: 'Finance', label: 'Finance' },
                                { value: 'HR', label: 'HR' },
                                { value: 'Security', label: 'Security' },
                                { value: 'Development', label: 'Development' },
                                { value: 'Administration', label: 'Administration' }
                            ]}
                        />

                        <Select
                            label="Status"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            options={[
                                { value: 'all', label: 'All Status' },
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' }
                            ]}
                        />
                    </div>

                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, marginTop: 'var(--spacing-lg)' }}>
                        Showing <strong>{filteredUsers.length}</strong> of <strong>{mockUsers.length}</strong> users
                    </p>
                </CardBody>
            </Card>

            {/* Users Table */}
            <Card>
                <CardBody style={{ padding: 0 }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--color-gray-200)', background: 'var(--color-gray-50)' }}>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                        User
                                    </th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                        Email
                                    </th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                        Role
                                    </th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                        Department
                                    </th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                        Status
                                    </th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} style={{ borderBottom: '1px solid var(--color-gray-200)', transition: 'background var(--transition-fast)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-gray-50)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))',
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 600,
                                                    fontSize: 'var(--text-sm)'
                                                }}>
                                                    {user.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                                                        {user.name}
                                                    </div>
                                                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>
                                                        ID: {user.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>
                                                <Mail size={14} />
                                                {user.email}
                                            </div>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <Badge variant={getRoleBadgeVariant(user.role)}>
                                                {user.role}
                                            </Badge>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', fontSize: 'var(--text-sm)' }}>
                                                <Building size={14} style={{ color: 'var(--color-gray-500)' }} />
                                                {user.department}
                                            </div>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <Badge variant={user.status === 'Active' ? 'success' : 'gray'}>
                                                {user.status}
                                            </Badge>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
                                                <Button variant="ghost" size="sm" icon={<Edit2 size={16} />} onClick={() => handleEditUser(user)}>
                                                    Edit
                                                </Button>
                                                <Button variant="ghost" size="sm" icon={<Trash2 size={16} />} onClick={() => handleDeleteUser(user)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>

            {/* Add/Edit User Modal */}
            {showAddModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <Card style={{ width: '500px', maxWidth: '90vw', maxHeight: '90vh', overflow: 'auto' }}>
                        <CardHeader>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <h3 style={{ margin: 0 }}>{editingUser ? 'Edit User' : 'Add New User'}</h3>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: 'var(--spacing-sm)',
                                        color: 'var(--color-gray-500)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                                <Input
                                    label="Full Name"
                                    placeholder="Enter full name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />

                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="user@gov.my"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />

                                <Select
                                    label="Role"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    options={[
                                        { value: 'Administrator', label: 'Administrator' },
                                        { value: 'Officer', label: 'Officer' },
                                        { value: 'Data Entry Clerk', label: 'Data Entry Clerk' }
                                    ]}
                                />

                                <Select
                                    label="Department"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    options={[
                                        { value: 'Finance', label: 'Finance' },
                                        { value: 'HR', label: 'HR' },
                                        { value: 'Security', label: 'Security' },
                                        { value: 'Development', label: 'Development' },
                                        { value: 'Administration', label: 'Administration' },
                                        { value: 'IT', label: 'IT' },
                                        { value: 'Legal', label: 'Legal' },
                                        { value: 'Operations', label: 'Operations' }
                                    ]}
                                />

                                <Select
                                    label="Status"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    options={[
                                        { value: 'Active', label: 'Active' },
                                        { value: 'Inactive', label: 'Inactive' }
                                    ]}
                                />

                                <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                                    <Button onClick={handleSaveUser} fullWidth>
                                        {editingUser ? 'Update User' : 'Add User'}
                                    </Button>
                                    <Button variant="outline" onClick={() => setShowAddModal(false)} fullWidth>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}
        </div>
    );
};
