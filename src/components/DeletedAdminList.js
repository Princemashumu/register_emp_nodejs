import React from 'react';
import './DeletedAdminList.css'; // Import CSS for styling if needed

const DeletedAdminList = ({ deletedAdmins }) => {
  return (
    <div>
      <h3>Deleted Admins</h3>
      {deletedAdmins.length > 0 ? (
        <table className="deleted-admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>ID Number</th>
              <th>Email</th>
              <th>Role</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {deletedAdmins.map((admin) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No deleted admins found.</p>
      )}
    </div>
  );
};

export default DeletedAdminList;
