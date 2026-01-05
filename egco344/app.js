const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

/**
 * Mock student data (Faculty of Engineering)
 */
const students = [
  {
    id: "ENG001",
    name: "Alice Tan",
    department: "Computer Engineering",
    gpa: 3.75
  },
  {
    id: "ENG002",
    name: "Ben Lee",
    department: "Mechanical Engineering",
    gpa: 3.40
  },
  {
    id: "ENG003",
    name: "Clara Wong",
    department: "Electrical Engineering",
    gpa: 3.90
  },
  {
    id: "ENG004",
    name: "Daniel Lim",
    department: "Civil Engineering",
    gpa: 3.20
  },
  {
    id: "ENG005",
    name: "Eva Chen",
    department: "Chemical Engineering",
    gpa: 3.60
  }
];

/**
 * API 1: Get all student GPAs
 * GET /api/students
 */
app.get('/api/students', (req, res) => {
  res.json({
    faculty: "Engineering",
    totalStudents: students.length,
    students: students.map(s => ({
      id: s.id,
      name: s.name,
      department: s.department,
      gpa: s.gpa
    }))
  });
});

/**
 * API 2: Get GPA by student ID
 * GET /api/students/:id
 */
app.get('/api/students/:id', (req, res) => {
  const studentId = req.params.id;

  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  res.json({
    id: student.id,
    name: student.name,
    department: student.department,
    gpa: student.gpa
  });
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});