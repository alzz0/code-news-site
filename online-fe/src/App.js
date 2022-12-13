import Routing from "./routes";
import { useState, useEffect } from "react";
import { AuthContext } from "./hooks/AuthContext";

function App() {
  const [auth, setAuth] = useState();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    console.log(theme);
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    }
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <>
        <Routing />
      </>
    </AuthContext.Provider>
  );
}

export default App;
