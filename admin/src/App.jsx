import AdminDashboard from "./pages/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // if no token, redirect to login
      return <Login />;
    }
    return children; // if token exists, allow access
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
