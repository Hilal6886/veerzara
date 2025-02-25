import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase'; // Adjust the import path as needed

function Users() {
  const [users, setUsers] = useState([]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!newUserEmail || !newUserPassword) {
      setError("Please provide email and password.");
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword);
      const { user } = userCredential;

      // Add user to Firestore as a normal user
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: newUserEmail,
        admin: false, // Default to non-admin
      });

      setUsers([...users, { id: user.uid, email: newUserEmail, admin: false }]);
      setNewUserEmail("");
      setNewUserPassword("");
      setError("");
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Failed to add user.");
    }
  };

  const handleToggleAdmin = async (userId, isAdmin) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { admin: !isAdmin });

      // Update local state
      setUsers(users.map(user =>
        user.id === userId ? { ...user, admin: !isAdmin } : user
      ));
    } catch (err) {
      console.error("Error updating admin status:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Delete user from Firestore
      await deleteDoc(doc(db, "users", userId));
      
      // Optionally delete user from Firebase Authentication
      // await deleteUser(auth.currentUser); // Uncomment if you want to delete user from auth
      
      // Update local state
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <input
          type="email"
          className="w-full bg-gray-100 border-2 border-gray-200 rounded-md p-3 mb-4 outline-none focus:border-blue-500"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="w-full bg-gray-100 border-2 border-gray-200 rounded-md p-3 mb-4 outline-none focus:border-blue-500"
          value={newUserPassword}
          onChange={(e) => setNewUserPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          onClick={handleAddUser}
          className="w-full bg-blue-500 text-white rounded-md py-3 hover:bg-blue-600 transition duration-300"
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">Email</th>
              <th className="border border-gray-300 p-2 text-left">Admin</th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2 text-center">{user.admin ? "Yes" : "No"}</td>
                <td className="border border-gray-300 p-2 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => handleToggleAdmin(user.id, user.admin)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    {user.admin ? "Revoke Admin" : "Make Admin"}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
