import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './context/AuthContext';

const Verify = () => {
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const {URL}=useAuth();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await axios.get(URL+'/hive/admin/verify');
        if (response.data === true) {
          setIsVerified(true);
        }
      } catch (error) {
        console.error('Verification failed:', error);
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  if (loading) {
    return (
      <div style={{ height: '25vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isVerified) {
    return <p>Verification failed or unauthorized.</p>;
  }

  return (
    <div>
      <h2>Verified successfully!</h2>
      {/* You can render protected content here */}
    </div>
  );
};

export default Verify;
