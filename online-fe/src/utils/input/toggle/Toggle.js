import "./toggle.css";
const Toggle = ({ toggleTheme }) => {
  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          onChange={() => toggleTheme()}
          checked={localStorage.getItem("theme") === "dark" ? true : false}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Toggle;
