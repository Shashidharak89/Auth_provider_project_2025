import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/User.css';
import { Pencil } from 'lucide-react';
import ApiInfo from './ApiInfo';
import { useAuth } from '../context/AuthContext';

const User = () => {
  const [userapi, setUserapi] = useState('user-api-key-1234');
  const [members, setMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  
 const {URL}=useAuth();
  useEffect(() => {
    fetchUserData(userapi);
  }, [userapi]);

  const fetchUserData = async (apiKey) => {
    try {
      const res = await axios.get(`${URL}/hive/admin/${apiKey}/viewdata`);
      setMembers(res.data.members || []);
    } catch (err) {
      console.error('Error fetching data:', err);
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

  const handleSubmit = async () => {
    try {
      const updatedUser = {
        userapi,
        members
      };
      await axios.put(`${URL}/hive/admin/${userapi}/update`, updatedUser);
      setUpdateMessage('Members updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Update failed:', err);
      setUpdateMessage('Failed to update members');
    }
  };

  return (
    <div className="user-wrapper-abc321">
        <ApiInfo/>
      <div className="user-header-abc321">
        <h2>User Members (API Key: {userapi})</h2>
        <button className="user-edit-btn-abc321" onClick={handleEditToggle}>
          <Pencil size={18} />
        </button>
      </div>

      <div className="user-list-abc321">
        {members.map((member, index) => (
          <div key={member._id || index} className="user-card-abc321">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => handleChange(index, 'email', e.target.value)}
                />
                <input
                  type="text"
                  value={member.password}
                  onChange={(e) => handleChange(index, 'password', e.target.value)}
                />
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Password:</strong> {member.password}</p>
                <p><strong>Token:</strong> {member.token || 'N/A'}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="user-submit-section-abc321">
          <button onClick={handleSubmit}>Submit Changes</button>
        </div>
      )}

      {updateMessage && <p className="user-msg-abc321">{updateMessage}</p>}
    </div>
  );
};

export default User;
