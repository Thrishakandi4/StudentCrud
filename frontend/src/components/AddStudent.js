import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
  const [student, setStudent] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true, // default
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting student data:', student);

    // Use environment variable for backend URL
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://studentcrud-backend.onrender.com/api/students';

    try {
      const response = await axios.post(backendUrl, student);
      console.log('Student added:', response.data);
      alert("Student Added Successfully!");
      navigate('/students');
    } catch (err) {
      console.error("Error details: ", err.response ? err.response.data : err.message);
      alert(`Error adding student: ${err.response ? err.response.data.error : err.message}`);
    }
  };

  // Optional: Disable submit button if form is not valid
  const isFormValid = student.studentId && student.firstName && student.lastName && student.email && student.dob && student.department && student.enrollmentYear;

  return (
    <div>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="studentId"
          placeholder="Student ID"
          value={student.studentId}
          onChange={handleChange}
          required
        />
        <input
          name="firstName"
          placeholder="First Name"
          value={student.firstName}
          onChange={handleChange}
          required
          minLength={2}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={student.lastName}
          onChange={handleChange}
          required
          minLength={2}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={student.email}
          onChange={handleChange}
          required
        />
        <input
          name="dob"
          placeholder="Date of Birth"
          type="date"
          value={student.dob}
          onChange={handleChange}
          required
        />
        <input
          name="department"
          placeholder="Department"
          value={student.department}
          onChange={handleChange}
          required
        />
        <input
          name="enrollmentYear"
          placeholder="Enrollment Year"
          type="number"
          value={student.enrollmentYear}
          onChange={handleChange}
          required
          min="2000"
          max={new Date().getFullYear()}
        />
        <label>
          Active:
          <input
            name="isActive"
            type="checkbox"
            checked={student.isActive}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" disabled={!isFormValid}>Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
