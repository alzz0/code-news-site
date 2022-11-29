import Routing from "./routes";
import { useState } from "react";
import { AuthContext } from "./hooks/AuthContext";
import Sidebar from "./components/sidebar";

function App() {
  const [auth, setAuth] = useState();
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <>
        <Routing />
      </>
    </AuthContext.Provider>
  );
}

export default App;
