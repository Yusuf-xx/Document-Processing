import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
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
            alert(t('userManagement.updateSuccess', { name: formData.name }));
        } else {
            alert(t('userManagement.addSuccess', { name: formData.name }));
        }
        setShowAddModal(false);
        setEditingUser(null);
    };

    const handleDeleteUser = (user: any) => {
        if (confirm(t('userManagement.deleteConfirm', { name: user.name }))) {
            alert(t('userManagement.deleteSuccess', { name: user.name }));
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

    const getRoleLabel = (role: string) => {
        const keyMap: Record<string, string> = {
            'Administrator': 'admin',
            'Officer': 'officer',
            'Data Entry Clerk': 'clerk'
        };
        return t(`userManagement.roles.${keyMap[role] || role.toLowerCase()}`);
    };

    const getDepartmentLabel = (dept: string) => {
        return t(`departments.${dept.toLowerCase()}`);
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1 className="page-title">{t('userManagement.title')}</h1>
                    <p className="page-description">{t('userManagement.description')}</p>
                </div>
                <div className="page-actions">
                    <Button icon={<UserPlus size={18} />} onClick={handleAddUser}>
                        {t('userManagement.addUser')}
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
                                    {t('userManagement.totalUsers')}
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
                                    {t('userManagement.activeUsers')}
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
                                    {t('userManagement.inactiveUsers')}
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
                                    {t('userManagement.administrators')}
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
                            label={t('userManagement.searchLabel')}
                            placeholder={t('userManagement.searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            icon={<Search size={18} />}
                        />

                        <Select
                            label={t('userManagement.role')}
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            options={[
                                { value: 'all', label: t('userManagement.allRoles') },
                                { value: 'Administrator', label: getRoleLabel('Administrator') },
                                { value: 'Officer', label: getRoleLabel('Officer') },
                                { value: 'Data Entry Clerk', label: getRoleLabel('Data Entry Clerk') }
                            ]}
                        />

                        <Select
                            label={t('userManagement.department')}
                            value={filterDept}
                            onChange={(e) => setFilterDept(e.target.value)}
                            options={[
                                { value: 'all', label: t('userManagement.allDepartments') || 'All Departments' },
                                { value: 'Finance', label: getDepartmentLabel('Finance') },
                                { value: 'HR', label: getDepartmentLabel('HR') },
                                { value: 'Security', label: getDepartmentLabel('Security') },
                                { value: 'Development', label: getDepartmentLabel('Development') },
                                { value: 'Administration', label: getDepartmentLabel('Administration') }
                            ]}
                        />

                        <Select
                            label={t('userManagement.status')}
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            options={[
                                { value: 'all', label: t('userManagement.allStatus') },
                                { value: 'Active', label: t('userManagement.statusOptions.active') },
                                { value: 'Inactive', label: t('userManagement.statusOptions.inactive') }
                            ]}
                        />
                    </div>

                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', margin: 0, marginTop: 'var(--spacing-lg)' }}>
                        {t('userManagement.showingUsers', { filtered: filteredUsers.length, total: mockUsers.length })}
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
                                        {t('common.user')}
                                    </th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                        {t('userManagement.emailLabel')}
                                    </th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                        {t('userManagement.role')}
                                    </th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                        {t('userManagement.department')}
                                    </th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                        {t('userManagement.status')}
                                    </th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>
                                        {t('common.actions')}
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
                                                        {t('userManagement.id')}: {user.id}
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
                                                {getRoleLabel(user.role)}
                                            </Badge>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', fontSize: 'var(--text-sm)' }}>
                                                <Building size={14} style={{ color: 'var(--color-gray-500)' }} />
                                                {getDepartmentLabel(user.department)}
                                            </div>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <Badge variant={user.status === 'Active' ? 'success' : 'gray'}>
                                                {t(`userManagement.statusOptions.${user.status.toLowerCase()}`)}
                                            </Badge>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
                                                <Button variant="ghost" size="sm" icon={<Edit2 size={16} />} onClick={() => handleEditUser(user)}>
                                                    {t('common.edit')}
                                                </Button>
                                                <Button variant="ghost" size="sm" icon={<Trash2 size={16} />} onClick={() => handleDeleteUser(user)}>
                                                    {t('common.delete')}
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
                                <h3 style={{ margin: 0 }}>{editingUser ? t('userManagement.editUser') : t('userManagement.addUser')}</h3>
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
                                    label={t('userManagement.fullName')}
                                    placeholder={t('userManagement.fullNamePlaceholder')}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />

                                <Input
                                    label={t('userManagement.emailLabel')}
                                    type="email"
                                    placeholder="user@gov.my"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />

                                <Select
                                    label={t('userManagement.role')}
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    options={[
                                        { value: 'Administrator', label: getRoleLabel('Administrator') },
                                        { value: 'Officer', label: getRoleLabel('Officer') },
                                        { value: 'Data Entry Clerk', label: getRoleLabel('Data Entry Clerk') }
                                    ]}
                                />

                                <Select
                                    label={t('userManagement.department')}
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    options={[
                                        { value: 'Finance', label: getDepartmentLabel('Finance') },
                                        { value: 'HR', label: getDepartmentLabel('HR') },
                                        { value: 'Security', label: getDepartmentLabel('Security') },
                                        { value: 'Development', label: getDepartmentLabel('Development') },
                                        { value: 'Administration', label: getDepartmentLabel('Administration') },
                                        { value: 'IT', label: getDepartmentLabel('IT') },
                                        { value: 'Legal', label: getDepartmentLabel('Legal') },
                                        { value: 'Operations', label: getDepartmentLabel('Operations') }
                                    ]}
                                />

                                <Select
                                    label={t('userManagement.status')}
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    options={[
                                        { value: 'Active', label: t('userManagement.statusOptions.active') },
                                        { value: 'Inactive', label: t('userManagement.statusOptions.inactive') }
                                    ]}
                                />

                                <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                                    <Button onClick={handleSaveUser} fullWidth>
                                        {editingUser ? t('common.save') : t('common.add')}
                                    </Button>
                                    <Button variant="outline" onClick={() => setShowAddModal(false)} fullWidth>
                                        {t('common.cancel')}
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
