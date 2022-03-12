import { Route, Routes } from "react-router-dom";
import { ExamplePage } from "../pages";
import { AuthPage } from "../pages/Auth";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />}>
        <Route path="/dashboard" element={<div>Dashboard</div>}></Route>
        <Route path="/Inventory" element={<div>Inventory</div>}></Route>
      </Route>
    </Routes>
  );
};
