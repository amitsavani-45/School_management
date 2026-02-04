import React, { useState, useEffect } from 'react';
import './Data.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
function Data() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students whenever searchTerm changes
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/students/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data from server');
      }

      const data = await response.json();
      
      console.log('API Response:', data);
      
      if (Array.isArray(data)) {
        setStudents(data);
        setFilteredStudents(data);
      } else if (data.students && Array.isArray(data.students)) {
        setStudents(data.students);
        setFilteredStudents(data.students);
      } else if (data.results && Array.isArray(data.results)) {
        setStudents(data.results);
        setFilteredStudents(data.results);
      } else {
        setStudents([]);
        setFilteredStudents([]);
        console.warn('Unexpected data format:', data);
      }
      
      setError(null);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Error connecting to server. Please make sure Django backend is running.');
      setStudents([]);
      setFilteredStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/student/${id}/delete/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setStudents(students.filter(student => student.id !== id));
        alert('Record deleted successfully!');
      } else {
        alert('Error deleting record');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Error connecting to server');
    }
  };

  const handleRefresh = () => {
    setSearchTerm('');
    fetchStudents();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-message">Loading student records...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleRefresh} className="refresh-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="records-section">
        <button onClick={handleRefresh} className="refresh-btn">
        <i className="bi bi-arrow-clockwise"></i> Refresh
        </button>

      {/* Search Bar */}
<div className="search-container">
  <div className="search-wrapper">
    <i className="bi bi-search search-icon"></i>
    <input
      type="text"
      className="search-input"
      placeholder="Search by student name..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
    {searchTerm && (
      <button className="clear-search-btn" onClick={clearSearch}>
        <i className="bi bi-x"></i>
      </button>
    )}
  </div>
  {searchTerm && (
    <p className="search-results-text">
      Found {filteredStudents.length} student(s) matching "{searchTerm}"
    </p>
  )}
</div>

        {filteredStudents.length === 0 ? (
          <div className="no-records">
            {searchTerm ? (
              <>
                <p>No students found matching "{searchTerm}"</p>
                <p>Try a different search term or clear the search.</p>
              </>
            ) : (
              <>
                <p>No student records found.</p>
                <p>Add some students using the form page.</p>
              </>
            )}
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="records-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>AGE</th>
                  <th>CLASS</th>
                  <th>SCHOOL</th>
                  <th>SUBJECT</th>
                  <th>SCORE</th>
                  <th>RESULT</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.student_class}</td>
                    <td>{student.school}</td>
                    <td>{student.subject}</td>
                    <td>{student.score}</td>
                    <td>
                      <span className={`badge ${student.result === 'Pass' ? 'badge-pass' : 'badge-fail'}`}>
                        {student.result}
                      </span>
                    </td>
                    <td>
                  <button 
                   onClick={() => handleDelete(student.id)} 
                   className="delete-btn"
                   >
                   <i className="bi bi-trash"></i> Delete
                   </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="records-footer">
          <p>Total Records: <strong>{students.length}</strong></p>
          <p>Pass: <strong>{students.filter(s => s.result === 'Pass').length}</strong></p>
          <p>Fail: <strong>{students.filter(s => s.result === 'Fail').length}</strong></p>
          {searchTerm && (
            <p>Showing: <strong>{filteredStudents.length}</strong></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Data;