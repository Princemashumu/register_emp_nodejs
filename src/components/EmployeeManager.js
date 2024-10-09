import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import storage functions
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import DeletedEmployeeList from './DeletedEmployeeList';
import { db } from '../firebaseConfig';

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storage = getStorage(); // Initialize Firebase Storage

  const fetchEmployees = async () => {
    try {
      const employeesCollection = collection(db, 'employees');
      const snapshot = await getDocs(employeesCollection);
      const employeesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEmployees(employeesData);
    } catch (error) {
      setError('Error fetching employees');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeletedEmployees = async () => {
    try {
      const deletedEmployeesCollection = collection(db, 'deletedemployees');
      const snapshot = await getDocs(deletedEmployeesCollection);
      const deletedEmployeesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDeletedEmployees(deletedEmployeesData);
    } catch (error) {
      setError('Error fetching deleted employees');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDeletedEmployees();
  }, []);

  const handleEmployeeSubmit = async (employeeData) => {
    try {
      let photoURL = '';

      // If a photo is uploaded, upload it to Firebase Storage
      if (employeeData.photo) {
        const storageRef = ref(storage, `employee_photos/${employeeData.photo.name}`);
        await uploadBytes(storageRef, employeeData.photo);
        photoURL = await getDownloadURL(storageRef);
      }

      // Prepare the employee data to be saved
      const employeeToSave = {
        name: employeeData.name,
        surname: employeeData.surname,
        age: employeeData.age,
        idNumber: employeeData.idNumber,
        role: employeeData.role,
        photo: photoURL // Save the URL instead of the file object
      };

      if (editingEmployee) {
        const employeeRef = doc(db, 'employees', editingEmployee.id);
        await updateDoc(employeeRef, employeeToSave);
        setEditingEmployee(null);
      } else {
        await addDoc(collection(db, 'employees'), employeeToSave);
      }
      fetchEmployees();
    } catch (error) {
      setError('Error saving employee data');
      console.error(error);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;

    try {
      const employeeRef = doc(db, 'employees', id);
      const employeeSnapshot = await getDoc(employeeRef);
      const employeeData = { id: employeeSnapshot.id, ...employeeSnapshot.data() };

      await addDoc(collection(db, 'deletedemployees'), employeeData);
      await deleteDoc(employeeRef);
      fetchEmployees();
    } catch (error) {
      setError('Error deleting employee');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Employee Manager</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <EmployeeForm 
        onSubmit={handleEmployeeSubmit} 
        editingEmployee={editingEmployee} 
        setEditingEmployee={setEditingEmployee} 
      />
      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <EmployeeList employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <h2>Deleted Employees</h2>
      <DeletedEmployeeList deletedEmployees={deletedEmployees} />
    </div>
  );
};

export default EmployeeManager;
