import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🎓 Student Management System</h1>
      <p>Manage student records easily — add, edit, view, and delete students!</p>

      <div style={{ marginTop: '30px' }}>
        <button onClick={() => navigate('/students')} style={buttonStyle}>
          View Students
        </button>
        <button onClick={() => navigate('/add')} style={buttonStyle}>
          Add New Student
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default Home;
