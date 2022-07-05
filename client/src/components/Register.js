import '../App.css';
import { fetchData } from "../main.js";
import { useState } from "react";
import { useNavigate , Link} from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { username, email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault();
    fetchData("/user/register",
      {
        username,
        email,
        password
      },
      "POST")
      .then((data) => {
        if (!data.message) {
          console.log(data)
          navigate("/login")
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
              <div className="form-user">
                <h4 className="text-center font-weight-bold"> Registration!! </h4>
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" placeholder="Enter username" id="username"
                name='username'
                onChange={onChange}
                value={username}
                required 
                />
              </div>
              <div className="form-user">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" placeholder="Enter Email" id="email"
                  name='email'
                  onChange={onChange}
                  value={email}
                  required />
              </div>
              <div className="form-password">
                <label htmlFor="password1">Password</label>
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
                <p> Done with account Creation? <Link to="/login">Login Here</Link></p>

              </div>
            </form>
          </section>
        </section>
      </section>
    </div>
  );
}
export default Register;