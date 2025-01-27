import axios from 'axios';
import {useEffect, useState} from 'react'

function User() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      window.location.href = "/login";
    } else {
      setUser(JSON.parse(user));
    }

  },[]);

  const handleUpdate =  async () => {
    try {
      const {data} = await axios.patch('http://localhost:6000/api/v1/user/update', {
        name: user.name,
        email: user.email,
      },{
        headers:{
          "Content-Type":"application/json"
        }
      })
      setUser(data.data);
      setName(data.data.name);
      setEmail(data.data.email);
    } catch (error) {
      console.log(error);
    }
  };

  return user ? (
    <div className="container">
      <h1>Welcome {user?.name}</h1>
      <p>Your email is {user?.email}</p>
      <input
        className="form-control"
        type="text"
        placeholder="t"
        aria-label="default input example"
        value={user?.name || name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="form-control"
        type="text"
        placeholder="t"
        aria-label="default input example"
        value={user?.email || email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="form-control"
        type="text"
        placeholder="demo@email.com"
        aria-label="default input example"
        value={user?.email}
      />
      <button className="btn btn-primary" onClick={handleUpdate}>
        Update
      </button>
    </div>
  ) : (
    <h1>No user</h1>
  );
}

export default User