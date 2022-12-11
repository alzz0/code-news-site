import "./settings.css";
import React, { useEffect, useState } from "react";
import Account from "./settingItems/Account";
import Theme from "./settingItems/Theme";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../service/AuthService";
const Settings = () => {
  const [view, setView] = useState("settings");
  const [toogleSubView, setToogleSubView] = useState(false);
  const settings = [
    { name: "Account Settings", value: "settings" },
    { name: "Theme", value: "theme" },
    { name: "Privacy & Safety Settings", value: "privacy" },
    { name: "Notification Settings", value: "notifications" },
    { name: "Payment Settings", value: "payment" },
  ];

  const navigate = useNavigate();
  useEffect(() => {
    if (!getUser()) {
      navigate("/");
    }
  });
  const handleView = (elm) => {
    setToogleSubView(false);

    setView(elm);
  };

  const childView = () => {
    setToogleSubView((prev) => !prev);
    setView("settings");
  };

  const renderSwitch = () => {
    switch (view) {
      case "settings":
        return <Account subView={toogleSubView} childView={childView} />;
      case "theme":
        return <Theme />;
      //   case "privacy":
      //     return <Privacy />;
      //   case "notifications":
      //     return <Notifications />;
      //   case "payment":
      //     return <Payment />;
      default:
        return <Account subView={toogleSubView} childView={childView} />;
    }
  };

  return (
    <div className="settingsContainer">
      {/* <div className="settings"></div> */}
      <h1 className="savedTitle">Settings</h1>
      <div className="savedHeader">
        <div className="savedBody">
          <div>
            <ul>
              {settings.map((elm) => (
                <li
                  className={"cursor-pointer"}
                  onClick={() => handleView(elm.value)}
                  key={elm.value}
                >
                  {elm.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div>
            <ul>{renderSwitch()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
