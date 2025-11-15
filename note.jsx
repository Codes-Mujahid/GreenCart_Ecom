import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const [islogged, setIsLogged] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showUserRegister, setShowUserRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  // ✅ Add this useEffect to persist login state
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setIsLogged(true);
    }
  }, []);

  // ✅ Whenever islogged changes, update localStorage
  useEffect(() => {
    if (islogged) {
      localStorage.setItem('loggedInUser', 'true');
    } else {
      localStorage.removeItem('loggedInUser');
    }
  }, [islogged]);

  const value = {
    navigate,
    toast,
    islogged,
    setIsLogged,
    showUserLogin,
    showUserRegister,
    setShowUserLogin,
    setShowUserRegister,
    formData,
    setFormData,
    loginData,
    setLoginData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
