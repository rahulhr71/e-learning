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
      <Navbar /><br /><br />
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Email</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Password</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {userData.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">

                  <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{user.password}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {kuchBhiNahi === user.email ? (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>x X x
        </div>
      )}
    </div>
  );
};

export default Dashboard;