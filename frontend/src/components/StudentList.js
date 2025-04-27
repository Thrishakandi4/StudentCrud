import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('https://studentcrud-backend.onrender.com/api/students')  // Updated URL
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios.delete(`https://studentcrud-backend.onrender.com/api/students/${id}`)  // Updated URL
        .then(() => {
          alert('Student deleted successfully!');
          fetchStudents(); // Refresh after deletion
        })
        .catch(error => {
          console.error("Error deleting student:", error);
        });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-student/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  return (
    <div>
      <h2>Student List</h2>
      <Link to="/add-student">Add New Student</Link>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Department</th>
            <th>Enrollment Year</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map(student => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.dob}</td>
                <td>{student.department}</td>
                <td>{student.enrollmentYear}</td>
                <td>{student.isActive ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => handleEdit(student._id)}>Edit</button>
                  <button onClick={() => handleDelete(student._id)} style={{ marginLeft: '8px' }}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No students available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
