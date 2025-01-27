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
      console.log(JSON.parse(userData).data);
      setUser(JSON.parse(userData).data);
    }

  },[]);

  const handleUpdate =  async () => {
    try {
      const {data} = await axios.patch('http://localhost:5500/api/v1/user/update', {
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
        value={name || user?.name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="form-control"
        type="text"
        placeholder="t"
        aria-label="default input example"
        value={email || user?.email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        readOnly
        className="form-control"
        type="text"
        placeholder="demo@email.com"
        aria-label="default input example"
        value={user?.password}
        disabled
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