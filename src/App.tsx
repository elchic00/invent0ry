import { Outlet } from "react-router-dom";
import { AppRoutes } from "./routes";

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <Outlet />
    </div>
  );
}

export default App;
