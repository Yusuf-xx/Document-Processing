// Mock data for IDCM System

export interface Document {
    id: string;
    referenceNumber: string;
    title: string;
    sender: string;
    dateReceived: string;
    dateOfLetter: string;
    status: string;
    classification: string;
    department: string;
    assignedTo: string;
    dueDate: string;
    priority: string;
    description: string;
    ccList: string[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    status: string;
}

export interface Activity {
    id: string;
    documentId: string;
    user: string;
    action: string;
    timestamp: string;
    details: string;
}

export const mockDocuments: Document[] = [
    {
        id: '1',
        referenceNumber: 'DOC-2025-001',
        title: 'Budget Proposal for Q1 2026',
        sender: 'Ministry of Finance',
        dateReceived: '2025-12-01',
        dateOfLetter: '2025-11-28',
        status: 'Pending Verification',
        classification: 'Restricted',
        department: 'Finance',
        assignedTo: 'Ahmad bin Ali',
        dueDate: '2025-12-08', // Due Today
        priority: 'High',
        description: 'Annual budget proposal for the first quarter of 2026.',
        ccList: ['Director General', 'Deputy Director']
    },
    {
        id: '2',
        referenceNumber: 'DOC-2025-002',
        title: 'Staff Training Program Approval',
        sender: 'Human Resources Department',
        dateReceived: '2025-12-02',
        dateOfLetter: '2025-12-01',
        status: 'In Progress',
        classification: 'Operational',
        department: 'HR',
        assignedTo: 'Siti Nurhaliza',
        dueDate: '2025-12-09', // Due Tomorrow
        priority: 'Medium',
        description: 'Request for approval of the annual staff training program.',
        ccList: ['All Department Heads']
    },
    {
        id: '3',
        referenceNumber: 'DOC-2025-003',
        title: 'Security Protocol Update',
        sender: 'National Security Council',
        dateReceived: '2025-11-25',
        dateOfLetter: '2025-11-24',
        status: 'Overdue',
        classification: 'Classified',
        department: 'Security',
        assignedTo: 'Mohd Razak',
        dueDate: '2025-12-01', // Overdue
        priority: 'Urgent',
        description: 'Updated security protocols for handling classified documents.',
        ccList: ['Security Team']
    },
    {
        id: '4',
        referenceNumber: 'DOC-2025-004',
        title: 'Infrastructure Development Plan',
        sender: 'Public Works Department',
        dateReceived: '2025-12-04',
        dateOfLetter: '2025-12-03',
        status: 'Pending Review',
        classification: 'Restricted',
        department: 'Development',
        assignedTo: 'Lee Wei Ming',
        dueDate: '2025-12-15', // Due Next Week
        priority: 'Medium',
        description: 'Comprehensive plan for infrastructure development projects.',
        ccList: ['Planning Committee']
    },
    {
        id: '5',
        referenceNumber: 'DOC-2025-005',
        title: 'Annual Performance Report',
        sender: 'Performance Management Unit',
        dateReceived: '2025-12-05',
        dateOfLetter: '2025-12-04',
        status: 'Closed',
        classification: 'Information',
        department: 'Administration',
        assignedTo: 'Fatimah Abdullah',
        dueDate: '2025-12-20', // Future
        priority: 'Low',
        description: 'Annual performance report summarizing key achievements.',
        ccList: ['All Staff']
    },
    {
        id: '6',
        referenceNumber: 'DOC-2025-006',
        title: 'IT Hardware Procurement',
        sender: 'IT Vendor',
        dateReceived: '2025-12-01',
        dateOfLetter: '2025-11-30',
        status: 'Received',
        classification: 'Operational',
        department: 'IT',
        assignedTo: 'Tan Bee Leng',
        dueDate: '2025-12-10',
        priority: 'Medium',
        description: 'Quotation for new laptops and servers.',
        ccList: ['IT Manager']
    },
    {
        id: '7',
        referenceNumber: 'DOC-2025-007',
        title: 'Historical Land Records',
        sender: 'Land Office',
        dateReceived: '2025-11-15',
        dateOfLetter: '2025-11-10',
        status: 'Scanned',
        classification: 'Restricted',
        department: 'Legal',
        assignedTo: 'Raj Kumar',
        dueDate: '2025-11-30', // Past Due
        priority: 'Low',
        description: 'Digitized copies of historical land titles.',
        ccList: ['Legal Advisor']
    },
    {
        id: '8',
        referenceNumber: 'DOC-2025-008',
        title: 'Press Release Draft',
        sender: 'Comms Team',
        dateReceived: '2025-12-06',
        dateOfLetter: '2025-12-06',
        status: 'OCR Verified',
        classification: 'Information',
        department: 'Public Relations',
        assignedTo: 'Sarah Lee',
        dueDate: '2025-12-08', // Due Today
        priority: 'High',
        description: 'Draft press release for upcoming community event.',
        ccList: ['Director']
    },
    {
        id: '9',
        referenceNumber: 'DOC-2025-009',
        title: 'Confidential Audit Report',
        sender: 'External Auditor',
        dateReceived: '2025-12-07',
        dateOfLetter: '2025-12-05',
        status: 'Classified',
        classification: 'Classified',
        department: 'Finance',
        assignedTo: 'Ahmad bin Ali',
        dueDate: '2025-12-12',
        priority: 'Urgent',
        description: 'Preliminary findings from the Q3 financial audit.',
        ccList: ['Minister']
    },
    {
        id: '10',
        referenceNumber: 'DOC-2025-010',
        title: 'Employee Handbook Update',
        sender: 'HR Policy Unit',
        dateReceived: '2025-10-01',
        dateOfLetter: '2025-09-28',
        status: 'Approved',
        classification: 'Operational',
        department: 'HR',
        assignedTo: 'Siti Nurhaliza',
        dueDate: '2025-10-15', // Completed past
        priority: 'Low',
        description: 'Revised employee handbook with new remote work policies.',
        ccList: ['All Staff']
    },
    {
        id: '11',
        referenceNumber: 'DOC-2025-011',
        title: 'Project Alpha Blueprint',
        sender: 'Consultant',
        dateReceived: '2025-11-01',
        dateOfLetter: '2025-10-25',
        status: 'Archived',
        classification: 'Restricted',
        department: 'Development',
        assignedTo: 'System',
        dueDate: '2025-11-10',
        priority: 'Medium',
        description: 'Final blueprint for Project Alpha.',
        ccList: ['Project Manager']
    }
];

export const mockUsers: User[] = [
    {
        id: '1',
        name: 'Ahmad bin Ali',
        email: 'ahmad.ali@gov.my',
        role: 'C-Suite',
        department: 'Finance',
        status: 'Active'
    },
    {
        id: '2',
        name: 'Siti Nurhaliza',
        email: 'siti.nurhaliza@gov.my',
        role: 'Top Management',
        department: 'HR',
        status: 'Active'
    },
    {
        id: '3',
        name: 'Mohd Razak',
        email: 'mohd.razak@gov.my',
        role: 'Executive',
        department: 'Security',
        status: 'Active'
    },
    {
        id: '4',
        name: 'Lee Wei Ming',
        email: 'lee.weiming@gov.my',
        role: 'Executive',
        department: 'Development',
        status: 'Active'
    },
    {
        id: '5',
        name: 'Fatimah Abdullah',
        email: 'fatimah.abdullah@gov.my',
        role: 'Clerical',
        department: 'Administration',
        status: 'Active'
    }
];

// Department head mapping for auto-assignment
export const departmentHeads: Record<string, { designation: string; name: string; email: string }> = {
    'Finance': { designation: 'Chief Financial Officer', name: 'Ahmad bin Ali', email: 'ahmad.ali@gov.my' },
    'HR': { designation: 'HR Director', name: 'Siti Nurhaliza', email: 'siti.nurhaliza@gov.my' },
    'Security': { designation: 'Security Chief', name: 'Mohd Razak', email: 'mohd.razak@gov.my' },
    'Development': { designation: 'Development Manager', name: 'Lee Wei Ming', email: 'lee.weiming@gov.my' },
    'Administration': { designation: 'Administrative Officer', name: 'Fatimah Abdullah', email: 'fatimah.abdullah@gov.my' },
    'IT': { designation: 'IT Manager', name: 'Tan Bee Leng', email: 'tan.beeleng@gov.my' },
    'Legal': { designation: 'Legal Counsel', name: 'Raj Kumar', email: 'raj.kumar@gov.my' },
    'Operations': { designation: 'Operations Manager', name: 'Sarah Lee', email: 'sarah.lee@gov.my' }
};

export const mockActivities: Activity[] = [
    {
        id: '1',
        documentId: '1',
        user: 'Ahmad bin Ali',
        action: 'Document Received',
        timestamp: '2024-12-01 09:30',
        details: 'Document received and registered in the system'
    },
    {
        id: '2',
        documentId: '1',
        user: 'System',
        action: 'OCR Processing',
        timestamp: '2024-12-01 09:35',
        details: 'Automatic text extraction completed with 98% confidence'
    },
    {
        id: '3',
        documentId: '2',
        user: 'Siti Nurhaliza',
        action: 'Document Assigned',
        timestamp: '2024-12-02 10:15',
        details: 'Document assigned to HR department for review'
    },
    {
        id: '4',
        documentId: '3',
        user: 'Mohd Razak',
        action: 'Document Approved',
        timestamp: '2024-12-03 14:20',
        details: 'Security protocol update approved and forwarded to implementation'
    },
    {
        id: '5',
        documentId: '5',
        user: 'Fatimah Abdullah',
        action: 'Document Closed',
        timestamp: '2024-12-05 16:45',
        details: 'Annual report reviewed and archived'
    }
];

export const departments = [
    'Finance',
    'HR',
    'Security',
    'Development',
    'Administration',
    'IT',
    'Legal',
    'Operations'
];

export const classifications = [
    'Information',
    'Operational',
    'Restricted',
    'Classified'
];

export const statuses = [
    'Received',
    'Pending Scan',
    'Scanned',
    'Pending OCR',
    'Pending Verification',
    'Pending Classification',
    'Approved',
    'In Progress',
    'Pending Review',
    'Closed',
    'Archived'
];
