import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "../components";

// Lazy loaded pages

const PageNotFound = lazy(() => import("../NotFoundPage"));
const Login =  lazy(()=>import('../pages/Auth')) 
const Register = lazy(()=>import('../pages/Auth/Register')) 
const ForgotPassword = lazy(()=>import('../pages/Auth/ForgotPassword')) 
const Dashboard = lazy(()=>import('../pages/Dashboard')) 
const Budget = lazy(()=>import('../pages/Budget')) 
const Categories = lazy(()=>import('../pages/Categories')) 
const Reports = lazy(()=>import('../pages/Reports')) ;
const Settings = lazy(()=>import('../pages/Settings')) ;
const Transactions = lazy(()=>import('../pages/Transactions')) ;

const isAuthenticated = () => !!localStorage.getItem("token");

const ProtectedRoute = ({ children }) => isAuthenticated() ? children : <Navigate to="/login" replace />;
const PublicRoute = ({ children }) => !isAuthenticated() ? children : <Navigate to="/dashboard" replace />;

const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
];
const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/budget", element: <Budget /> },
  { path: "/categories", element: <Categories /> },
  { path: "/reports", element: <Reports /> },
  { path: "/settings", element: <Settings /> },
  { path: "/transactions", element: <Transactions /> },
];

const RouteComponent = () => (
 <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      {publicRoutes?.map(({ path, element }) => (
        <Route key={path} path={path} element={<PublicRoute>{element}</PublicRoute>} />
      ))}
      {protectedRoutes?.map(({ path, element }) => (
        <Route key={path} path={path} element={<ProtectedRoute>{element}</ProtectedRoute>} />
      ))}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Suspense>
);

export default RouteComponent;
