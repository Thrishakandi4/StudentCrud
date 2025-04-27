const express = require('express');
const router = express.Router();
const { getStudents, addStudent, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentControllers');

// Get all students
router.get('/', getStudents);

// Add a new student
router.post('/', addStudent);

// Get a student by ID
router.get('/:id', getStudentById);

// Update a student by ID
router.put('/:id', updateStudent);

// Delete a student by ID
router.delete('/:id', deleteStudent);

module.exports = router;
