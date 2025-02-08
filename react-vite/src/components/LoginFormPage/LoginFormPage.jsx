import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  console.log({
    email,
    password
  })

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-form-page">
      <p>What's your phone number or email</p>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <div className="content">
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p>{errors.email}</p>}
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p>{errors.password}</p>}
          <button type="submit">Log In</button>
        </form>
        <div>
          <div className="overlay">or</div>
        </div>
        <button onClick={()=>{
          setEmail('b@user.io')
          setPassword('password')
          handleSubmit()
        }}>Login as Burak</button>

        <button onClick={()=>{
          setEmail('g@user.io')
          setPassword('password')
          handleSubmit()
        }}>Login as Gabe</button>

        <button onClick={()=>{
          setEmail('k@user.io')
          setPassword('password')
          handleSubmit()
        }}>Login as Katie</button>

        <button onClick={()=>{
          setEmail('m@user.io')
          setPassword('password')
          handleSubmit()
        }}>Login as Mar</button>

        <button onClick={()=>{
          setEmail('s@user.io')
          setPassword('password')
          handleSubmit()
        }}>Login as Sama</button>
      </div>
    </div>
  );
}

export default LoginFormPage;
