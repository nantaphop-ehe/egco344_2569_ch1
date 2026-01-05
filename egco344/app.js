const http = require('http');

// Mock student data
const students = [
    { id: 'S001', name: 'Alice Johnson', department: 'Computer Science', gpa: 3.85 },
    { id: 'S002', name: 'Bob Smith', department: 'Computer Science', gpa: 3.72 },
    { id: 'S003', name: 'Carol Davis', department: 'Electrical Engineering', gpa: 3.90 },
    { id: 'S004', name: 'David Wilson', department: 'Electrical Engineering', gpa: 3.65 },
    { id: 'S005', name: 'Emma Brown', department: 'Civil Engineering', gpa: 3.78 },
    { id: 'S006', name: 'Frank Miller', department: 'Civil Engineering', gpa: 3.55 },
    { id: 'S007', name: 'Grace Lee', department: 'Mechanical Engineering', gpa: 3.88 },
    { id: 'S008', name: 'Henry Chen', department: 'Mechanical Engineering', gpa: 3.92 },
];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // API: Get all students GPA by department
    if (req.url === '/api/students/gpa' && req.method === 'GET') {
        const studentsByDept = {};
        students.forEach(student => {
            if (!studentsByDept[student.department]) {
                studentsByDept[student.department] = [];
            }
            studentsByDept[student.department].push({
                id: student.id,
                name: student.name,
                gpa: student.gpa,
            });
        });
        res.writeHead(200);
        res.end(JSON.stringify(studentsByDept, null, 2));
    }

    // API: Get individual student GPA by ID
    else if (req.url.startsWith('/api/students/') && req.method === 'GET') {
        const studentId = req.url.split('/')[3];
        const student = students.find(s => s.id === studentId);

        if (student) {
            res.writeHead(200);
            res.end(JSON.stringify(student, null, 2));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Student not found' }, null, 2));
        }
    }

    // Invalid route
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route not found' }, null, 2));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Try: http://localhost:${PORT}/api/students/gpa`);
    console.log(`Try: http://localhost:${PORT}/api/students/S001`);
});