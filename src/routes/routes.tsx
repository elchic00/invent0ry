import { Route, Routes } from "react-router-dom";
import { paths } from "./paths";
import { AuthPage } from "../pages/Auth";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={paths.default} element={<AuthPage />}>
                <Route path={paths.dashboard} element={<div>Dashboard</div>}></Route>
                <Route path={paths.inventory} element={<div>Inventory</div>}></Route>
                <Route path={paths.settings} element={<div>settings</div>}></Route>
                <Route path={paths.profile} element={<div>profile</div>}></Route>
            </Route>
        </Routes>
    );
};