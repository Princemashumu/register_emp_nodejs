import React from 'react';
import './AdminList.css'; // Import CSS for styling if needed

const AdminList = ({ admins, onEdit, onDelete, onBlock }) => {
  return (
    <div>
      <h3>Admin List</h3>
      {admins.length > 0 ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>ID Number</th>
              <th>Email</th>
              <th>Role</th>
              <th>Photo</th>
              <th>Actions</th> {/* Removed Password column */}
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>{admin.surname}</td>
                <td>{admin.age}</td>
                <td>{admin.idNumber}</td>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
                <td>
                  {admin.photo ? (
                    <img src={admin.photo} alt={admin.name} width="100" />
                  ) : (
                    'No Photo'
                  )}
                </td>
                <td>
                  <button className="edit" onClick={() => onEdit(admin)}>Edit</button>
                  <button className="delete" onClick={() => onDelete(admin.id)}>Delete</button>
                  <button className="block" onClick={() => onBlock(admin.id)}>Block</button> {/* Block button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No admins found.</p>
      )}
    </div>
  );
};

export default AdminList;
