import { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [user1, setUser1] = useState("Vikas");
  const[userId,setUserId]=useState();
  const[userEmail,setUserEmail]=useState();
  const[userName,setUserName]=useState();
  


  return (
    <AuthContext.Provider value={{ user1 ,setUser1}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
