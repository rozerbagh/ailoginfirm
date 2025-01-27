import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import User from "./pages/User";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);
  return <>{isAuth ? <User /> : <Login />}</>;
}

export default App;
