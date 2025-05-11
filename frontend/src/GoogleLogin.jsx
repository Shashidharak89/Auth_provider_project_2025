import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import './styles/GoogleLogin.css';

const GoogleLogin = (props) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const responseGoogle = async (authResult) => {
        try {
            setIsLoading(true);
            if (authResult["code"]) {
                const result = await googleAuth(authResult.code);
                const { email, name, image, coins, _id } = result.data.user;
                const token = result.data.token;

                // Console log the user data including _id
                console.log("User Data from Google Login:", {
                    email,
                    name,
                    image,
                    coins,
                    _id,
                    token
                });

                const obj = { email, name, token, image, coins, _id };
                localStorage.setItem('user-info', JSON.stringify(obj));
                navigate('/dashboard');
            } else {
                throw new Error(authResult);
            }
        } catch (e) {
            console.log('Error while Google Login...', e);
        } finally {
            setIsLoading(false);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    return (
        <div className="google-login-container">
            <div className="google-login-card">
                <div className="google-login-header">
                    <h2>Welcome</h2>
                    <p>Sign in to continue to the dashboard</p>
                </div>
                
                <button 
                    className={`google-login-button ${isLoading ? 'google-login-button-loading' : ''}`}
                    onClick={googleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="google-login-spinner"></span>
                    ) : (
                        <>
                            <FcGoogle className="google-login-icon" />
                            <span>Sign in with Google</span>
                        </>
                    )}
                </button>
                
                {props.children}
            </div>
        </div>
    );
};

export default GoogleLogin;