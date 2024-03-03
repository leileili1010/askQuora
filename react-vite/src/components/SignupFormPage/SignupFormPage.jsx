import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import './SignupForm.css'

function SignupFormPage() {
  // background image
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

const sessionUser = useSelector((state) => state.session.user);
const dispatch = useDispatch();
const navigate = useNavigate()
const [email, setEmail] = useState("");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [profileImg, setProfileImg] = useState(null);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [position, setPosition] = useState("");
const [field, setField] = useState("");
const [yearsOfExperience, setYearsOfExperience] = useState("");
const [errors, setErrors] = useState({});

useEffect(() => {
  if (sessionUser) navigate("/topics");
}, [sessionUser, navigate]);


const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});


  // validation of input
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const validationErrors = {};
  if (!email) validationErrors.email = "Email is required";
  if (!email.match(validRegex))
    validationErrors.email = "Must be valid email";
  if (!username) validationErrors.username = "Username is required";
  if (!firstName) validationErrors.firstName = "First name is required";
  if (!lastName) validationErrors.lastName = "Last name is required";
  if (!password) validationErrors.password = "Password is required";
  if (password.length < 6)
    validationErrors.password = "Password must be at least 6 characters";
  if (password !== confirmPassword)
    validationErrors.confirmPassword =
      "Confirm Password field must be the same as the Password field";
  if (!field) validationErrors.field = "Your field/major/specialy/rearch area is required"
  if (!position) validationErrors.position = "Your job position or education background is required"
  if (!yearsOfExperience) validationErrors.yearsOfExperience = "Years of experience is required"


  if (Object.values(validationErrors).length) {
    setErrors(validationErrors);
  } else {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile_img", profileImg);
    formData.append("field", field);
    formData.append("years_of_experience", yearsOfExperience);
    formData.append("position", position);
    console.log("🚀 ~ handleSubmit ~ formData:", formData.username)



    const serverResponse = await dispatch(thunkSignup(formData));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/topics")
    }
  }
};

return (
  <div id="sign-up-container">
    <h1>askQuora</h1>
    <p className="slogan">A place to connect and share knowledge</p>
    {errors.server && <p className="input-error">{errors.server}</p>}
    <div className="signup">
      <form className="login-signup-form" onSubmit={handleSubmit}>
        
        <div className="basic-credential">
          <div className="basic-info">
            <p>Basic Information</p>
            <label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
            </label>
            {errors.email && <p className="input-errors">{errors.email}</p>}
            <label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
              />
            </label>
            {errors.username && <p className="input-errors">{errors.username}</p>}
            <label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="First Name"
              />
            </label>
            {errors.first_name && (
              <p className="input-errors">{errors.first_name}</p>
            )}
            <label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Last Name"
              />
            </label>
            {errors.last_name && <p className="input-errors">{errors.last_name}</p>}
            <label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </label>
            {errors.password && <p className="input-errors">{errors.password}</p>}
            <label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Your Password"
              />
            </label>
            {errors.confirmPassword && (
              <p className="input-errors">{errors.confirmPassword}</p>
            )}
            <label>
              <p className="profile-img">Profile Image (Optional)</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImg(e.target.files[0])}
                id="image-upload"
              />
            </label>
          </div>
          
          <div className="seperator"></div>

          <div className="credential">
              <p>Credential</p>
              <label>
                <input
                  type="text"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  required
                  placeholder="Field / Major / Specialty / Research Area"
                />
              </label>
              {errors.field && <p className="input-errors">{errors.field}</p>}
              <label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                  placeholder="Job Position or Education Background"
                />
              </label>
              {errors.position && <p className="input-errors">{errors.position}</p>}
              <label>
                <input
                  type="number"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                  required
                  placeholder="Years of Experience"
                />
              </label>
              {errors.yearsOfExperience && <p className="input-errors">{errors.password}</p>}
              <button type="submit" className="signup-button">
                 Sign Up
              </button>
            <p className = "have-account">Already have an account?</p>
            <Link to="/">Sign In</Link>
          </div>
        </div>
        
        
      </form>
    </div>
  </div>
);
}


export default SignupFormPage;
