import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import { useNavigate } from 'react-router-dom';

const GoogleLogin = (props) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const responseGoogle = async (authResult) => {
        try {
            if (authResult["code"]) {
                const result = await googleAuth(authResult.code);
                const { email, name, image, coins, _id } = result.data.user; // include _id
                const token = result.data.token;

                // Console log the user data including _id
                console.log("User Data from Google Login:", {
                    email,
                    name,
                    image,
                    coins,
                    _id, // Log _id
                    token
                });

                const obj = { email, name, token, image, coins, _id };
                localStorage.setItem('user-info', JSON.stringify(obj));
                navigate('/dashboard');
            } else {
                console.log(authResult);
                throw new Error(authResult);
            }
        } catch (e) {
            console.log('Error while Google Login...', e);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    return (
        <div className="App">
            <button onClick={googleLogin}>
                Sign in with Google
            </button>    
        </div>
    );
};

export default GoogleLogin;
