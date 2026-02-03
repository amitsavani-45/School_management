import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    student_class: '',
    school: '',
    subject: '',
    score: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateResult = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 40) {
      return 'Pass';
    } else {
      return 'Fail';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.age || !formData.student_class || !formData.school || !formData.subject || !formData.score) {
      alert('Please fill in all fields');
      return;
    }

    if (parseFloat(formData.score) < 0 || parseFloat(formData.score) > 100) {
      alert('Score must be between 0 and 100');
      return;
    }

    const passResult = calculateResult(formData.score);
    setResult(passResult);
    setLoading(true);

    try {
      // Send data to Django backend
      const response = await fetch('http://127.0.0.1:8000/api/student/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success - show result for 2 seconds then reset
        setTimeout(() => {
          setFormData({
            name: '',
            age: '',
            student_class: '',
            school: '',
            subject: '',
            score: ''
          });
          setResult(null);
          alert('Data saved successfully to database!');
        }, 2000);
      } else {
        alert('Error saving data: ' + (data.message || 'Please check your input'));
        setResult(null);
      }
    } catch (error) {
      alert('Error connecting to server. Please make sure Django backend is running on http://127.0.0.1:8000/');
      console.error('Error:', error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="form-title">School Management System</h1>
        
        <form onSubmit={handleSubmit} className="school-form">
          <div className="form-group">
            <label htmlFor="name">Student Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="5"
              max="100"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="student_class">Class</label>
            <input
              type="text"
              id="student_class"
              name="student_class"
              value={formData.student_class}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="school">School Name</label>
            <input
              type="text"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="score">Score (0-100)</label>
            <input
              type="number"
              id="score"
              name="score"
              value={formData.score}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.01"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {result && (
          <div className={`result-message ${result === 'Pass' ? 'pass' : 'fail'}`}>
            Result: {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;