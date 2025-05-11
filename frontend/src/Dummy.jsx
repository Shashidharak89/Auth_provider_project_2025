import User from "./components/User";
import { useAuth } from "./context/AuthContext";

const Dummy = () => {
  const { user1 } = useAuth(); // ✅ Correct usage of custom hook
  console.log(user1);

  return (
    <div>
      
      <User/>
    </div>
  );
};

export default Dummy;
