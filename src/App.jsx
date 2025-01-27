import { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'

function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    isAuth && console.log('User is authenticated');
  }, []);
  return (
    <>
      <Login />
    </>
  )
}

export default App
