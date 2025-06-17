import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "../components";
import ProtectedLayout from "../layout/ProtectedLayout";
import PublicLayout from "../layout/PublicLayout";

// Lazy load pages
const PageNotFound = lazy(() => import("../NotFoundPage"));
const Login = lazy(() => import("../pages/Auth"));
const Register = lazy(() => import("../pages/Auth/Register"));
const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPassword"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Budget = lazy(() => import("../pages/Budget"));
const Categories = lazy(() => import("../pages/Categories"));
const Reports = lazy(() => import("../pages/Reports"));
const Settings = lazy(() => import("../pages/Settings"));
const Transactions = lazy(() => import("../pages/Transactions"));

const RouteComponent = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected Routes with Main Layout */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/transactions" element={<Transactions />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Suspense>
);

export default RouteComponent;
