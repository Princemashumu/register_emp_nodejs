import React, { useState, useEffect } from 'react';
import './Modal.css'; // Import the CSS for modal styling

const AdminForm = ({ onSubmit, editingAdmin, setEditingAdmin }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('sysadmin'); // Default role
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState(''); // New password state
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [error, setError] = useState('');

  // Function to generate a random password
  const generateRandomPassword = (length = 12) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // Open/close modal functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Pre-fill form fields if editing an existing admin
  useEffect(() => {
    if (editingAdmin) {
      setName(editingAdmin.name);
      setSurname(editingAdmin.surname);
      setAge(editingAdmin.age);
      setIdNumber(editingAdmin.idNumber);
      setEmail(editingAdmin.email);
      setRole(editingAdmin.role);
      setPhoto(null); // Keep photo optional during editing
      setPassword(''); // Reset password when editing
    } else {
      resetForm(); // Reset the form for a new admin
    }
  }, [editingAdmin]);

  const resetForm = () => {
    setName('');
    setSurname('');
    setAge('');
    setIdNumber('');
    setEmail('');
    setRole('sysadmin'); // Reset to default
    setPhoto(null);
    setPassword(generateRandomPassword()); // Generate a random password for new admins
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (photo && !['image/jpeg', 'image/png', 'image/gif'].includes(photo.type)) {
      setError('Please upload a valid image (JPEG, PNG, GIF).');
      return;
    }

    const adminData = {
      name,
      surname,
      age,
      idNumber,
      email,
      role,
      photo,
      password, // Include password in admin data
    };

    onSubmit(adminData);
    alert(`${editingAdmin ? 'Admin updated' : 'Admin added'} successfully!`); // Alert on success
    resetForm(); // Reset form fields after submission
    closeModal(); // Close modal after form submission
  };

  const handleCancel = () => {
    setEditingAdmin(null); // Reset editing state
    closeModal(); // Close modal
    resetForm(); // Reset form when cancelled
  };

  return (
    <div>
      {/* Button to open the form modal */}
      <button className="open-modal-button" onClick={openModal}>
        {editingAdmin ? 'Edit Admin' : 'Add Admin'}
      </button>

      {/* Modal for the form */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal-button" onClick={closeModal}>
              &times;
            </button>

            {/* The Admin Form */}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="admin-name">Name</label>
                <input
                  id="admin-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="admin-surname">Surname</label>
                <input
                  id="admin-surname"
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="admin-age">Age</label>
                <input
                  id="admin-age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="admin-id-number">ID Number</label>
                <input
                  id="admin-id-number"
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="admin-email">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="admin-role">Role</label>
                <select
                  id="admin-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="sysadmin">SysAdmin</option>
                  <option value="super-admin">Super Admin</option>
                </select>
              </div>
              <div>
                <label htmlFor="admin-password">Password</label>
                <input
                  id="admin-password"
                  type="text"
                  value={password}
                  readOnly // Make password field read-only
                />
                <button type="button" onClick={() => setPassword(generateRandomPassword())}>
                  Generate Random Password
                </button>
              </div>
              <div>
                <label htmlFor="admin-photo">Photo</label>
                <input
                  id="admin-photo"
                  type="file"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button type="submit">{editingAdmin ? 'Update Admin' : 'Add Admin'}</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminForm;
