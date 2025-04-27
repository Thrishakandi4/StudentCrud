import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true,
  });

  useEffect(() => {
    axios.get(`https://studentproject-backend.onrender.com/${id}`)
      .then(response => {
        setStudent(response.data);
      })
      .catch(error => {
        console.error("Error fetching student:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://studentproject-backend.onrender.com/${id}`, student)
      .then(() => {
        alert('Student updated successfully!');
        navigate('/students');
      })
      .catch(error => {
        console.error("Error updating student:", error);
      });
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={student.studentId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={student.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={student.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dob"
          value={student.dob}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={student.department}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="enrollmentYear"
          placeholder="Enrollment Year"
          value={student.enrollmentYear}
          onChange={handleChange}
          required
        />
        <label>
          Active:
          <input
            type="checkbox"
            name="isActive"
            checked={student.isActive}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
}

export default StudentEdit;
