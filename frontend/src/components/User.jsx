import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/User.css';
import { Pencil, Save, X } from 'lucide-react';
import ApiInfo from './ApiInfo';
import { useAuth } from '../context/AuthContext';

const User = () => {
  const [userapi, setUserapi] = useState('user-api-key-1234');
  const [members, setMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  
  const { URL,userId } = useAuth();
  
  
  useEffect(() => {
    fetchUserData(userapi);
  }, [userapi]);

  const fetchUserData = async (apiKey) => {
    try {
      const res = await axios.get(`${URL}/hive/admin/${apiKey}/viewdata`);
      setMembers(res.data.members || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      showMessage('Failed to fetch user data', 'error');
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setUpdateMessage('');
  };

  const handleChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const showMessage = (message, type) => {
    setUpdateMessage(message);
    setMessageType(type);
    
    // Auto-dismiss message after 3 seconds
    setTimeout(() => {
      setUpdateMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleSubmit = async () => {
    try {
      const updatedUser = {
        userapi,
        members
      };
      await axios.put(`${URL}/hive/admin/${userapi}/update`, updatedUser);
      showMessage('Members updated successfully!', 'success');
      setIsEditing(false);
    } catch (err) {
      console.error('Update failed:', err);
      showMessage('Failed to update members', 'error');
    }
  };

  const cancelEditing = () => {
    // Revert changes by refetching data
    fetchUserData(userapi);
    setIsEditing(false);
    setUpdateMessage('');
  };

  return (
    <div className="user-container">
      <ApiInfo />
      
      <div className="user-header">
        <h2>
          User Members
          <span className="user-api-key">{userapi}</span>
        </h2>
        
        {isEditing ? (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="user-edit-btn" onClick={cancelEditing}>
              <X size={16} /> Cancel
            </button>
            <button className="user-submit-btn" onClick={handleSubmit}>
              <Save size={16} style={{ marginRight: '4px' }} /> Save Changes
            </button>
          </div>
        ) : (
          <button className="user-edit-btn" onClick={handleEditToggle}>
            <Pencil size={16} style={{ marginRight: '4px' }} /> Edit Members
          </button>
        )}
      </div>

      <div className="user-members-grid">
        {members.map((member, index) => (
          <div key={member._id || index} className="user-member-card">
            {isEditing ? (
              <>
                <div className="user-input-group">
                  <label className="user-input-label">Name</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    placeholder="Enter name"
                  />
                </div>
                
                <div className="user-input-group">
                  <label className="user-input-label">Email</label>
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) => handleChange(index, 'email', e.target.value)}
                    placeholder="Enter email"
                  />
                </div>
                
                <div className="user-input-group">
                  <label className="user-input-label">Password</label>
                  <input
                    type="text"
                    value={member.password}
                    onChange={(e) => handleChange(index, 'password', e.target.value)}
                    placeholder="Enter password"
                  />
                </div>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Password:</strong> {member.password}</p>
                <p>
                  <strong>Token:</strong> 
                  <span className="user-token">{member.token || 'N/A'}</span>
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {updateMessage && (
        <div className={`user-message ${messageType}`}>
          {updateMessage}
        </div>
      )}
    </div>
  );
};

export default User;