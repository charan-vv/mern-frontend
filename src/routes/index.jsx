import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "../components";

const Login = React.lazy(() => import("../pages/Auth"));
const Register =React.lazy(()=>import ("../pages/Auth/Register"));
const ForgotPassword =React.lazy(()=>import ('../pages/Auth/ForgotPassword'));

const RouteComponent = () => {
  const routes = [
    { path: "/login", element: <Login pageId="Login" /> },
    {path:"/forgot-password",element:<ForgotPassword pageId='ForgetPassword'/>},
    {path:"/register",element:<Register pageId ='register'/>},
    { path: "/", element: <Navigate to="/login" replace /> },
  ];

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes?.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default RouteComponent;
