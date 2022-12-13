import { useEffect, useState } from "react";
import "./toggle.css";
const Toggle = () => {
  const [checked, setChecked] = useState();
  const toggletheme = () => {
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
      if (document.body.className === "dark-mode") {
        document.body.classList.remove("dark-mode");
      }
      setChecked(false);
    } else if (localStorage.getItem("theme") === "light") {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark-mode");
      setChecked(true);
    } else {
      localStorage.setItem("theme", "light");
      setChecked(true);
    }
  };

  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          onChange={() => toggletheme()}
          checked={
            checked || localStorage.getItem("theme") === "dark" ? true : false
          }
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Toggle;
