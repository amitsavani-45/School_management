import React, { useState, useEffect } from 'react';
import './ViewRecords.css';

function ViewRecords() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data when component loads
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/students/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data from server');
      }

      const data = await response.json();
      setStudents(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Error connecting to server. Please make sure Django backend is running.');
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
        // Remove the deleted student from the list
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
    fetchStudents();
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
        <div className="records-header">
          <h1 className="records-title">Student Records</h1>
          <button onClick={handleRefresh} className="refresh-btn">
            🔄 Refresh
          </button>
        </div>

        {students.length === 0 ? (
          <div className="no-records">
            <p>No student records found.</p>
            <p>Add some students using the form page.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="records-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Class</th>
                  <th>School</th>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Result</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
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
                        Delete
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
        </div>
      </div>
    </div>
  );
}

export default ViewRecords;