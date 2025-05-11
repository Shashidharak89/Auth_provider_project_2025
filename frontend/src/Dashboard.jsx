import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dummy from './Dummy';
import { useAuth } from './context/AuthContext';


const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const{userId,setUserId,
        userEmail,setUserEmail,
        userName,setUserName}=useAuth();
    useEffect(() => {
        const data = localStorage.getItem('user-info');
        const userData = JSON.parse(data);
        setUserInfo(userData);
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user-info');
        navigate('/login');
    }

    setUserId(userInfo?._id);
    setUserEmail(userInfo?.email);
    setUserName(userInfo?.name);

    console.log(userId);

    return (
        <>
            {console.log(userInfo)}
            <h1>Welcome {userInfo?.name}</h1>
            <h1>{userInfo?._id}</h1>
            <h3>{userInfo?.email}</h3>
            <h3>{userInfo?.coins}</h3>
            <img src={userInfo?.image} alt={userInfo?.name} />
            <button onClick={handleLogout}
            >Logout
            </button>
            <Dummy/>
        </>
    )
}

export default Dashboard