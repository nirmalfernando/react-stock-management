import React, { useState } from 'react';
import './RegistrationForm.css'; 
import { FaTrash, FaImage } from 'react-icons/fa'; 

const RegistrationForm = () => {
  
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState(null);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  
  const handleDeleteUser = () => {
    
    alert('Delete user functionality will be implemented later.');
  };

  return (
    <div className="registration-form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>

        <div className="column">
          <div className="form-group">
            <label htmlFor="userId">User ID:</label>
            <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        <div className="column">
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
        </div>

        <div className="photo-upload">
          <label htmlFor="photo">Choose Photo:</label>
          <div className="photo-upload-input">
            <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} />
            <label htmlFor="photo" className="file-label"><FaImage /> Choose File</label>
          </div>
        </div>

        <div className="delete-button" onClick={handleDeleteUser}>
          <FaTrash />
        </div>

        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
