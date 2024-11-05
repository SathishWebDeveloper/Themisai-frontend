/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, LazyExoticComponent, Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import MiniDrawer from "src/components/side-navbar";
import { useAuth } from "src/hooks/useAuth";
import { privateRoutes, publicRoutes } from "./app-routes";
import ProtectedRoute from "./private-route";

const AppRoutes: () => JSX.Element = () => {
  // Further we can access the authkey with redux as of now Ill access it localstorage
  // const authKey = JSON.parse(localStorage.getItem("authJwt")) || "";
  // console.log("authkey", authKey, typeof authKey, authToken);
  // const items = JSON.parse(localStorage.getItem('items'));
  // const navigate: NavigateFunction = useNavigate();

  const isLogin = useSelector((state: any) => state.login.userInfo);
  // const isAuthenticated = useSelector((state: any) => state.login.isAuth);
  // console.log("isAuthenticated: ", isAuthenticated);
  const { authenticated }: { authenticated: boolean } = useAuth();
  // const authData = getAuth();
  // const authorizationKey: string  = authData.token;
  // console.log("authorizationKey: ", authorizationKey);

  return (
    <React.Fragment>
      {/* Public Routes */}
      <Routes>
        {publicRoutes.map((route, index) => {
          const Component: LazyExoticComponent<FC> =
            route.component;
          return (
            <Route
              key={`route-${index}`}
              path={route.path}
              element={
                <Suspense fallback={<></>}>
                  {/* {isAuthenticated ? navigate("/dashboard") : <Component />} */}
                  <Component />
                </Suspense>
              }
            />
          );
        })}
        {/* Private Routes */}
        <Route element={<MiniDrawer />}>
          {privateRoutes.map((route, index) => {
            const Component = route.component;
            return (
              // this route will act as a parent route and using outlet this children component correctly render on the outlet area
              // check the outlet in the sidebar field
              <Route
                key={`privateroute-${index}`}
                path={route.path}
                element={
                  <Suspense fallback={<></>}>
                    <ProtectedRoute
                      authorizationKey={authenticated || isLogin?.status}
                    >
                      <Component />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </React.Fragment>
  );
};
export default AppRoutes;
