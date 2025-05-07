import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_URL

const useLogout = () =>{
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
          const response = await fetch(`${API_URL}/user/logout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
    
          // Parse the JSON response
          const data = await response.json();
    
          if (response.ok) {
            navigate('/')
          } else {
            console.error("Logout failed:", data);
          }
        } catch (error) {
          console.error("Error connecting to server:", error);
        }
        localStorage.removeItem('user');
      };

      return {handleLogout}
    
}

export default useLogout;