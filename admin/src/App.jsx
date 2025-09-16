import AdminDashboard from "./pages/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
     
      return <Login />;
    }
    return children; 
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
       <Route path="*" element={ <div>404 not Fount</div>}/>
      </Routes>
    </>
  );
}

export default App;
