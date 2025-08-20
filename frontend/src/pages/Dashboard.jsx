import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useUser } from "../context/userContext";

const Dashboard = () => {
  const { userC } = useUser();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const kuchBhiNahi = localStorage.getItem("login user");

  const handleDeleteUser = (user) => {
    // const idToDelete = e.target.value;
    axios
      .delete("http://localhost:4000/api/deleteuser", {
        headers: { token: localStorage.getItem("token") },
        data: { _id: user }
      })
      .then((response) => {
        window.location.reload();
        if (response.status === 200) {
          setUserData((prev) => prev.filter((user) => user.email !== emailToDelete));
        }
      })
      .catch((error) => {
        setError("Failed to delete user.");
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/dashboard", {
          headers: { token: localStorage.getItem("token") }
        });
        if (response.status === 200 && response.data.getUsers) {
          const users = response.data.getUsers.map((user) => ({
            email: user.email,
            password: user.password,
            _id: user._id
          }));
          setUserData(users);
        }
      } catch (error) {
        const response = error.response || {};
        if (response.status === 401) {
          setError("Unauthorized access - please log in again.");
        } else {
          setError("Error fetching user data.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {userData.map((user, index) => (
            <div key={user._id || index} className="bg-white shadow-md rounded-lg p-4 mb-4 w-full">
              <h2 className="text-lg font-semibold mb-2">User {index + 1}</h2>
              <p className="text-gray-700 mb-1">
                <strong>Email:</strong> {user.email}
              </p>
              {userC === user.email ? (
                <h1 className="text-green-600 font-bold">
                  You are logged in as {kuchBhiNahi}
                </h1>
              ) : (
                <h1 className="text-red-600 font-bold">
                  You are not logged in as {userC}
                </h1>
              )}
              <p className="text-gray-700">
                <strong>Password:</strong> {user.password}
              </p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
                onClick={()=>handleDeleteUser(user._id)}            
              >
                DELETE
              </button>
            </div>
          ))}
          {userData.length === 0 && (
            <p className="text-gray-500">No user data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;