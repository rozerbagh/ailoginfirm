import {useState} from "react";
import axios from "axios";
import {FiEye} from "react-icons/fi"
function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formInput, setFormInput] = useState({
    email:{
      value: '',
      isValid: false
    },
    password:{
      value: '',
      isValid: false
    } 
  });
  const handleLogin= ()=>{
    if(formInput.email.isValid && formInput.password.isValid){
      axios
        .post("http://localhost:6000/api/v1/user/login", {
          email: formInput.email.value,
          password: formInput.password.value,
        },{
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <>
      <div className="mb-3 w50">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          value={formInput.email.value}
          onChange={(e)=>{
            setFormInput({
              ...formInput,
              email:{
                value: e.target.value,
                isValid: e.target.value.includes('@')
              }
            })
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputPassword6" className="col-form-label">
          Password
        </label>
        <input
          type={passwordVisible ? "text" :"password"}
          id="inputPassword6"
          className="form-control"
          aria-describedby="passwordHelpInline"
          value={formInput.password.value}  
          onChange={(e)=>{
            setFormInput({
              ...formInput,
              password:{
                value: e.target.value,
                isValid: e.target.value.length >= 8 && e.target.value.length <= 20
              }
            })
          }}  
        />
        <div className="col-auto">
          <span id="passwordHelpInline" className="form-text">
            Must be 8-20 characters long.
            <FiEye fontSize={22} onClick={()=>setPasswordVisible(ps=>!ps)} style={{cursor:"pointer"}}/>
          </span>
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </>
  );
}

export default Login