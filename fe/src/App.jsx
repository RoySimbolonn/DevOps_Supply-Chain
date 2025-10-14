import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import DashboardStakeholderPage from "./components/pages/DashboardStakeholderPage";
import DashboardSupplierPage from "./components/pages/DashboardSupplierPage";
import StakeholderTransaction from "./components/pages/StakeholderTransaction";
import StakeholderReportPage from "./components/pages/StakeholderReportPage";
import ProductPage from "./components/pages/ProductPage";
import SupplierTransactionPage from "./components/pages/SupplierTransactionPage";

import AuthLayout from "./components/templates/AuthLayout";
import StakeholderLayout from "./components/templates/StakeholderLayout";
import SupplierLayout from "./components/templates/SupplierLayout";
import ReportProduct from "./components/pages/ReportProduct";

import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"/login"} />,
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        ),
      },
    ],
  },

  {
    path: "/stakeholder",
    element: <StakeholderLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"/stakeholder/dashboard"} />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardStakeholderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "transaction",
        element: (
          <ProtectedRoute>
            <StakeholderTransaction />
          </ProtectedRoute>
        ),
      },
      {
        path: "report",
        element: (
          <ProtectedRoute>
            <StakeholderReportPage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/supplier",
    element: <SupplierLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"/supplier/dashboard"} />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardSupplierPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRoute>
            <ProductPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "transaction",
        element: (
          <ProtectedRoute>
            <SupplierTransactionPage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "report/:id",
    element: (
      <ProtectedRoute>
        <ReportProduct />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
