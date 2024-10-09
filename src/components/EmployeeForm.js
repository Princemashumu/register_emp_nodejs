import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ onSubmit, editingEmployee, setEditingEmployee }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [role, setRole] = useState('');
  const [photo, setPhoto] = useState(null); // For storing the file object

  useEffect(() => {
    if (editingEmployee) {
      setName(editingEmployee.name);
      setSurname(editingEmployee.surname);
      setAge(editingEmployee.age);
      setIdNumber(editingEmployee.idNumber);
      setRole(editingEmployee.role);
      setPhoto(editingEmployee.photo); // Set the photo if editing
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
    const employeeData = {
      name,
      surname,
      age,
      idNumber,
      role,
      photo // Pass the file object here
    };
    onSubmit(employeeData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} required />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
      <input type="text" placeholder="ID Number" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required />
      <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} required />
      <input type="file" onChange={(e) => setPhoto(e.target.files[0])} /> {/* File input for photo */}
      <button type="submit">{editingEmployee ? 'Update' : 'Add'} Employee</button>
    </form>
  );
};

export default EmployeeForm;
