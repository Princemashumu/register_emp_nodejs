import React, { useState, useEffect } from 'react';
import './Modal.css'; // Import the CSS for modal styling

const EmployeeForm = ({ onSubmit, editingEmployee, setEditingEmployee }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [role, setRole] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

  // Open/close modal functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (editingEmployee) {
      setName(editingEmployee.name);
      setSurname(editingEmployee.surname);
      setAge(editingEmployee.age);
      setIdNumber(editingEmployee.idNumber);
      setRole(editingEmployee.role);
      setPhoto(editingEmployee.photo);
    } else {
      setName('');
      setSurname('');
      setAge('');
      setIdNumber('');
      setRole('');
      setPhoto(null);
    }
  }, [editingEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = { name, surname, age, idNumber, role, photo };
    onSubmit(employeeData);
    closeModal(); // Close modal after form submission
  };

  return (
    <div>
      {/* Button to open the form modal */}
      <button className="open-modal-button" onClick={openModal}>
        {editingEmployee ? 'Edit Employee' : 'Add Employee'}
      </button>

      {/* Modal for the form */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal-button" onClick={closeModal}>
              &times;
            </button>

            {/* The Employee Form */}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="ID Number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              <button type="submit">{editingEmployee ? 'Update' : 'Add'} Employee</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeForm;
