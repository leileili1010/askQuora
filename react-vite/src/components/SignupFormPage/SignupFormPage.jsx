import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import './SignupForm.css'

function SignupFormPage() {
  useEffect(() => {
    document.body.style.backgroundImage = "url('https://askcora.s3.us-west-1.amazonaws.com/topics_image/background.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.height = "100vh";
    document.body.style.margin = "0"; 
    document.body.style.width = "100%";
    document.body.style.overflowX = "hidden"; 

    return () => {
        document.body.style.backgroundImage = "";
        document.body.style.backgroundSize = "";
        document.body.style.backgroundPosition = "";
        document.body.style.backgroundRepeat = "";
        document.body.style.height = "";
        document.body.style.margin = "";
        document.body.style.width = "";
        document.body.style.overflowX = "";
    };
}, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
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
    <div className="landing-page">
      <h1>askQuora</h1>
      <p className="slogan">A place to connect and share knowledge</p>
      {errors.server && <p>{errors.server}</p>}
      <div className="login-signup">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="input-error">{errors.email}</p>}
          <label>
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p className="input-error">{errors.username}</p>}
          <label>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="input-error">{errors.password}</p>}
          <label>
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
