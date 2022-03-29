import { Route, Routes } from "react-router-dom";
import { paths } from "./paths";
import { AuthPage } from "../pages/Auth";
import { Dashboard } from "../pages/Dashboard";
import { SideBar } from "../components/SideBar";
import { AuthenticatedView } from "../views";
import { Inventory } from "../pages";
import { BusinessSpecifics } from "../pages/BusinessSpecifics/BusinessSpecifics";
import { AddItem } from "../components/AddItem/AddItem";
import { AddLocation } from "../pages/AddLocation/AddLocation";
import { LocationGrid } from "../pages/Locations/locations";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.default} element={<AuthPage />} />
      <Route
        path={paths.user}
        element={
          <AuthenticatedView>
            <SideBar />
          </AuthenticatedView>
        }
      >
        <Route path={paths.dashboard} element={<Dashboard />}></Route>
        <Route path={paths.inventory} element={<Inventory />}></Route>
        <Route path={paths.settings} element={<div>settings</div>}></Route>
        <Route path={paths.profile} element={<div>profile</div>}></Route>
        <Route
          path={paths.businessSpecifics}
          element={<BusinessSpecifics />}
        ></Route>
        <Route path={paths.addLoc} element={<AddLocation />}></Route>
        <Route path={paths.locations} element={<LocationGrid />}></Route>
      </Route>
    </Routes>
  );
};
