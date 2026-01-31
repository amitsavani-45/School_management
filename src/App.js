import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    class: '',
    school: '',
    subject: '',
    score: ''
  });

  const [result, setResult] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.age || !formData.class || !formData.school || !formData.subject || !formData.score) {
      alert('Please fill in all fields');
      return;
    }

    if (parseFloat(formData.score) < 0 || parseFloat(formData.score) > 100) {
      alert('Score must be between 0 and 100');
      return;
    }

    const passResult = calculateResult(formData.score);
    setResult(passResult);

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        age: '',
        class: '',
        school: '',
        subject: '',
        score: ''
      });
      setResult(null);
    }, 2000);
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="class">Class</label>
            <input
              type="text"
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
         
              required
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
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>

        
      </div>
    </div>
  );
}

export default App;