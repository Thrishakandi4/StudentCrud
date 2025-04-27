const Student = require('../models/Student');

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new student
const addStudent = async (req, res) => {
  try {
    const { studentId, firstName, lastName, email, dob, department, enrollmentYear, isActive } = req.body;

    // Creating a new student
    const newStudent = new Student({
      studentId,
      firstName,
      lastName,
      email,
      dob,
      department,
      enrollmentYear,
      isActive,
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(400).json({ error: error.message });
  }
};

// Get a student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a student by ID
const updateStudent = async (req, res) => {
  try {
    const { studentId, firstName, lastName, email, dob, department, enrollmentYear, isActive } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { studentId, firstName, lastName, email, dob, department, enrollmentYear, isActive },
      { new: true } // Return the updated student
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getStudents,
  addStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
