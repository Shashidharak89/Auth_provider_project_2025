// Ver.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const Ver = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const {
        setUserId,
        setUserEmail,
        setUserName
    } = useAuth();

    useEffect(() => {
        const data = localStorage.getItem('user-info');
        if (!data) {
            navigate('/login'); // Redirect if no user data found
            return;
        }

        const userData = JSON.parse(data);
        setUserInfo(userData);
        setUserId(userData?._id);
        setUserEmail(userData?.email);
        setUserName(userData?.name);
    }, [navigate, setUserId, setUserEmail, setUserName]);

    return <div style={{ display: 'none' }} />;
};

export default Ver;
