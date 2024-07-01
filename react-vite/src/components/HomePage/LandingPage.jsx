import { useEffect, useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './LandingPage.css'
import { Link } from "react-router-dom";
import BackgroundLoader from "./BackgroundLoader";

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (sessionUser) navigate("/topics");
  }, [sessionUser, navigate]);

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
      navigate("/topics");
    }
  };

  const demoUserLogin = async () => {
    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/topics");
    }
  };



    return (
      <>
      <BackgroundLoader/>
        <div className="landing-page">
         
            <h1>askQuora</h1>
            <p className="slogan">A place to connect and share knowledge</p>
            {errors.length > 0 &&
                errors.map((message) => <p key={message}>{message}</p>)}
            <div className="login-signup">
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            placeholder="Your email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <div className="input-error-container">
                        {errors.email && <p className="input-error">{errors.email}</p>}
                    </div>
                    <label>
                        <input
                            placeholder="Your password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <div className="input-error-container">
                        {errors.password && <p className="input-error"> {errors.password}</p>}
                    </div>
                    <button type="submit" className="login-button">Sign In</button>
                </form>
                <div className="sign-up-container">
                    <p>or</p>
                    <button className="demouser-button" onClick={demoUserLogin}>Sign in as Demo User </button>
                    {/* <p>or</p> */}
                    {/* <div className="google-sign-in">
                        <button id="google-button">
                            <img
                                src="https://askcora.s3.us-west-1.amazonaws.com/topics_image/google-log.png"
                                alt="Google logo"
                                style={{ width: "25px", height: "25px" }} />
                            <span>Sign in with Google</span>
                        </button>
                    </div> */}
                    <div className="create-account">
                        <p>Don&apos;t have an account?</p>
                        <Link to="/signup">Create account</Link>
                    </div>
                </div>
            </div>
        </div>
      </>
      
  );
}

export default LandingPage;

