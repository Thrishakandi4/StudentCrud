import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentEdit from './components/StudentEdit';
import AddStudent from './components/AddStudent'; // Assuming you have AddStudent page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/students" element={<StudentList />} />
        <Route path="/edit-student/:id" element={<StudentEdit />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="*" element={<StudentList />} />
      </Routes>
    </Router>
  );
}

export default App;
