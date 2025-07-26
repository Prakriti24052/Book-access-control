// src/components/admin/UserManagement.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, updateUserRole } from '../../services/userService';
import { toast } from 'react-toastify';
import { useAuth } from "../../context/authContext" // ✅ Three levels up

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        toast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(users.map(u => 
        u._id === userId ? { ...u, role: newRole } : u
      ));
      toast.success('User role updated successfully');
    } catch (error) {
      toast.error('Failed to update user role');
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((userItem) => (
              <tr key={userItem._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {userItem.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {userItem.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {userItem.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {userItem._id !== user._id && (
                    <select
                      value={userItem.role}
                      onChange={(e) => handleRoleChange(userItem._id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="regular">Regular User</option>
                      <option value="admin">Admin</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;