import React, { useState } from "react";
import "../settings.css";

export default function Account({ subView, childView }) {
  const [view, setView] = useState("account");

  const settings = [
    {
      name: "Account information",
      subText:
        "See your account information like your phone number and email address.",
      value: "account",
    },
    {
      name: "Change your password",
      subText: "Change your password at any time",
      value: "changepass",
    },
    {
      name: "Download an archive of your data",
      subText:
        "Get insights into the type of information stored for your account",
      value: "download",
    },
    {
      name: "Subscription stats",
      subText:
        "Invite anyone to Tweet from this account using the Teams feature in TweetDeck.",
      value: "stats",
    },
    {
      name: "Deactivate your account",
      subText: "Find out how you can deactivate your account.",
      value: "deactivate",
    },
    { name: "Additional resources", subText: "", value: "resources" },
  ];
  const handleView = (elm) => {
    childView();
    setView(elm);
  };
  const renderSwitch = () => {
    return (
      <div>
        <button onClick={childView}>BACK</button> {view.name}
      </div>
    );
    // switch (view) {
    //   case "":
    //     return <Account />
    //   case "account":
    //     return <Account />
    //   case "security":
    //     return <Security />
    //   case "privacy":
    //     return <Privacy />
    //   case "notifications":
    //     return <Notifications />
    //   case "accessibility":
    //     return <Accessibility />
    //   case "resources":
    //     return <Resources />
    //   default:
    //     return <Account />
    // }
  };
  if (!subView) {
    return (
      <div className="account-settings-container">
        {settings.map((elm) => (
          <li
            className="cursor-pointer"
            onClick={() => handleView(elm)}
            key={elm.value}
          >
            <span className="item-header">{elm.name}</span> <br />
            <span>{elm.subText}</span>
          </li>
        ))}
      </div>
    );
  } else {
    return <div>{renderSwitch()}</div>;
  }
}
