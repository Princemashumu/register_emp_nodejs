import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm'; // Assuming EmployeeForm is in the same folder
import './Modal.css'; // CSS for the modal

const EmployeeModal = ({ onSubmit, editingEmployee, setEditingEmployee }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Button to trigger the modal */}
      <button className="open-modal-button" onClick={openModal}>
        Add Employee
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal-button" onClick={closeModal}>
              &times;
            </button>
            <EmployeeForm
              onSubmit={(employeeData) => {
                onSubmit(employeeData);
                closeModal(); // Close modal after submitting form
              }}
              editingEmployee={editingEmployee}
              setEditingEmployee={setEditingEmployee}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeModal;
