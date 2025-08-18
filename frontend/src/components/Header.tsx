import { AuthService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(AuthService.isLoggedIn());
  }, []);
  
  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    navigate("/login"); 
  }
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">eUprava ERP</h1>
      { isLoggedIn && (
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Odjavi se
        </button>
      )}
    </header>
  );
}
