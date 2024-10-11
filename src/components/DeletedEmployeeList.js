import React from 'react';
import './DeletedEmployeeList.css'; // Ensure you import your CSS file

const DeletedEmployeeList = ({ deletedEmployees }) => {
  return (
    <div>
      <h3>Deleted Employee List</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>ID Number</th>
            <th>Role</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {deletedEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.surname}</td>
              <td>{employee.age}</td>
              <td>{employee.idNumber}</td>
              <td>{employee.role}</td>
              <td>
                {employee.photo ? (
                  <img
                    src={employee.photo}
                    alt={employee.name}
                    style={{ width: '50px', height: '50px' }} // Consistent size
                  />
                ) : (
                  'No Photo'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeletedEmployeeList;
