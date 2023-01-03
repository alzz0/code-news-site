import { useEffect } from "react";
import { resetUserSession, getUser } from "../../service/AuthService";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import Toggle from "../../utils/input/toggle/Toggle";
const Profile = ({ themeMode }) => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    if (getUser) {
      resetUserSession();
      window.location.reload();
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    console.log(user);
  });

  const toggleTheme = () => {
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
    } else if (localStorage.getItem("theme") === "light") {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
    themeMode();
  };

  return (
    <div className="profileContainer">
      {/* <div className="settings"></div> */}
      <h1 className="savedTitle">Profile</h1>
      <div className="savedHeader">
        <div className="savedBody">
          <div>Username: {user}</div>
          <div>Email: {user}</div>
          {/* <div>Date Joined: {formatDate()}</div> */}
        </div>
        <div>
          <div className="profile-list">
            <ul className="profile-items">
              <li>
                Theme: <Toggle toggleTheme={toggleTheme} />
                <label className="profile-switch">
                  <span className="profile-slider round"></span>
                </label>
              </li>
              <li>TBD</li>
              <li onClick={handleLogout}>logout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
