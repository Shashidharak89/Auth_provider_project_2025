import axios from 'axios';

const api = axios.create({
    baseURL: "https://auth-provider-project-2025.onrender.com/auth/",
    // withCredentials: true,
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);
