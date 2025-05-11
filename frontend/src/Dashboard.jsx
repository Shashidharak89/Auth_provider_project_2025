import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dummy from './Dummy';
import { useAuth } from './context/AuthContext';
import './styles/Dashboard.css'; // Make sure to create this CSS file with the styles

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const {
        userId, setUserId,
        userEmail, setUserEmail,
        userName, setUserName
    } = useAuth();
    
    useEffect(() => {
        const data = localStorage.getItem('user-info');
        const userData = JSON.parse(data);
        setUserInfo(userData);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user-info');
        navigate('/login');
    }
    
    const handleViewMore = () => {
        navigate('/user');
    }

    // Set auth context values
    setUserId(userInfo?._id);
    setUserEmail(userInfo?.email);
    setUserName(userInfo?.name);

    return (
        <div className="dashboard__container">
            <div className="dashboard__header">
                <h1 className="dashboard__welcome">Welcome {userInfo?.name}</h1>
                <h2 className="dashboard__user-id">ID: {userInfo?._id}</h2>
            </div>
            
            <div className="dashboard__info-card">
                <h3 className="dashboard__email">{userInfo?.email}</h3>
                <h3 className="dashboard__coins">{userInfo?.coins} Coins</h3>
            </div>
            
            <div className="dashboard__profile-section">
                <div className="dashboard__image-container">
                    <img 
                        className="dashboard__profile-image"
                        src={userInfo?.image} 
                        alt={userInfo?.name} 
                    />
                </div>
                <div className="dashboard__buttons-container">
                    <button 
                        className="dashboard__button dashboard__button-secondary"
                        onClick={handleViewMore}
                    >
                        View More
                    </button>
                    <button 
                        className="dashboard__button dashboard__button-primary"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
            
          
        </div>
    )
}

export default Dashboard