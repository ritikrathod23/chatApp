
export default async function UserLogin(email, password){

    try {
        const response = await fetch(`http://localhost:8000/user/login`, {
          method: 'POST', // Use POST for login
          headers: {
            "Content-Type": "application/json", // Inform the server you're sending JSON
          },
          body: JSON.stringify({
            email: email, // Include email and password in the request body
            password: password,
          }),
          credentials: "include"
        });
    
        // Parse the JSON response
        const data = await response.json();
    
        if (response.ok) {
          console.log("Login successful:", data);
          // Handle successful login, e.g., store token, navigate, etc.
        } else {
          console.error("Login failed:", data);
          // Handle login failure, e.g., show an error message
        }
      } catch (error) {
        console.error("Error connecting to server:", error);
        // Handle network errors
      }
}