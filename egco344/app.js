const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ehe te nandayo\n');          
});

const port = process.env.PORT || 8080; 

server.listen(port,() => {
  console.log(`Listening on port ${port}`);
});

// Mock student data
const students = [
    { id: 1, name: 'Alice Johnson', department: 'Civil Engineering', gpa: 3.8 },
    { id: 2, name: 'Bob Smith', department: 'Electrical Engineering', gpa: 3.6 },
    { id: 3, name: 'Carol White', department: 'Mechanical Engineering', gpa: 3.9 },
    { id: 4, name: 'David Brown', department: 'Civil Engineering', gpa: 3.5 },
    { id: 5, name: 'Eve Davis', department: 'Computer Engineering', gpa: 3.7 },
];

// API endpoint to get all students by department
server.on('request', (req, res) => {
    if (req.url === '/api/students' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(students));
    } else if (req.url.startsWith('/api/students/') && req.method === 'GET') {
        // API endpoint to get student by ID
        const id = parseInt(req.url.split('/')[3]);
        const student = students.find(s => s.id === id);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        if (student) {
            res.end(JSON.stringify(student));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Student not found' }));
        }
    }
});