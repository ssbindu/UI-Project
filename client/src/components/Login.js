import '../App.css';
import { fetchData } from "../main.js";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const { username, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault();
    fetchData("/user/login",
      {
        username,
        password
      },
      "POST")
      .then((data) => {
        console.log(data);
        if (!data.message) {
          var user_id = username;
          fetchData("/post/viewpost",
            {
              user_id
            },
            "POST")
            .then((res) => {
              console.log(res);
              if (!res.message) {
                navigate("/profile", { state: { name: username, data: res } });
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
      .catch((error) => {
        console.log(error)
      })

  }
  
    return (
        <div>
  <section className="container-fluid">
    
    <section className="row justify-content-center">
      <section className="col-12 col-sm-6 col-md-4 app">
        <form onSubmit={onSubmit} className="form-container">
        <h4 className="text-center font-weight-bold"> Login!! </h4>
        <div className="form-user">
          <label htmlFor="username">Username</label>
           <input type="text" className="form-control" placeholder="Enter Username" name='username'
              id='username'
              onChange={onChange}
              value={username}
              required/>
        </div>
        <div className="form-password">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" placeholder="Password" id="password"
              name='password'
              onChange={onChange}
              value={password}
              required/>
        </div>
        <div className="submit">
        <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </div>
        <div className="form-footer">
          <p> Don't have an account? <Link to="/register">Sign Up</Link></p>
          
        </div>
        </form>
      </section>
    </section>
  </section>

        </div>
    );
 }
    export default Login;