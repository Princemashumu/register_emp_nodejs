import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Authentication functions
import AdminForm from './AdminForm';
import AdminList from './AdminList';
import DeletedAdminList from './DeletedAdminList';
import { db } from '../firebaseConfig';

const AdminManager = () => {
  const [admins, setAdmins] = useState([]);
  const [deletedAdmins, setDeletedAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storage = getStorage(); // Initialize Firebase Storage
  const auth = getAuth(); // Initialize Firebase Auth

  // Fetch current admins from Firestore
  const fetchAdmins = async () => {
    try {
      const adminsCollection = collection(db, 'admins');
      const snapshot = await getDocs(adminsCollection);
      const adminsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAdmins(adminsData);
    } catch (error) {
      setError('Error fetching admins');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch deleted admins from Firestore
  const fetchDeletedAdmins = async () => {
    try {
      const deletedAdminsCollection = collection(db, 'deletedadmins');
      const snapshot = await getDocs(deletedAdminsCollection);
      const deletedAdminsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDeletedAdmins(deletedAdminsData);
    } catch (error) {
      setError('Error fetching deleted admins');
      console.error(error);
    }
  };

  // Load the data when the component mounts
  useEffect(() => {
    fetchAdmins();
    fetchDeletedAdmins();
  }, []);

  // Handle form submission for adding or updating an admin
  const handleAdminSubmit = async (adminData) => {
    try {
      let photoURL = '';

      // If a photo is uploaded, upload it to Firebase Storage
      if (adminData.photo) {
        const storageRef = ref(storage, `admin_photos/${adminData.photo.name}`);
        await uploadBytes(storageRef, adminData.photo);
        photoURL = await getDownloadURL(storageRef);
      }

      // Prepare the admin data to be saved
      const adminToSave = {
        name: adminData.name,
        surname: adminData.surname,    
        age: adminData.age,            
        idNumber: adminData.idNumber,  
        email: adminData.email,
        role: adminData.role || 'sysadmin', // Default role
        photo: photoURL                 // Save the URL instead of the file object
      };

      if (editingAdmin) {
        const adminRef = doc(db, 'admins', editingAdmin.id);
        await updateDoc(adminRef, adminToSave);
        setEditingAdmin(null); // Reset editing state after update
      } else {
        // Create user in Firebase Auth with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, adminData.email, adminData.password);
        const uid = userCredential.user.uid; // Get user ID from Firebase Auth

        // Save admin data along with the Auth UID in Firestore
        await addDoc(collection(db, 'admins'), { ...adminToSave, uid });
      }

      fetchAdmins(); // Refresh the admin list
    } catch (error) {
      setError('Error saving admin data: ' + error.message);
      console.error(error);
    }
  };

  // Handle edit operation
  const handleEdit = (admin) => {
    setEditingAdmin(admin);
  };

  // Handle delete operation (move to deletedadmins collection)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this admin?');
    if (!confirmDelete) return;

    try {
      const adminRef = doc(db, 'admins', id);
      const adminSnapshot = await getDoc(adminRef);
      const adminData = { id: adminSnapshot.id, ...adminSnapshot.data() };

      await addDoc(collection(db, 'deletedadmins'), adminData); // Move admin to deletedadmins
      await deleteDoc(adminRef); // Remove admin from admins
      fetchAdmins(); // Refresh the admin list
    } catch (error) {
      setError('Error deleting admin');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Admin Manager</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <AdminForm 
        onSubmit={handleAdminSubmit} 
        editingAdmin={editingAdmin} 
        setEditingAdmin={setEditingAdmin} 
      />
      {loading ? (
        <p>Loading admins...</p>
      ) : (
        <AdminList admins={admins} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <h2>Deleted Admins</h2>
      <DeletedAdminList deletedAdmins={deletedAdmins} />
    </div>
  );
};

export default AdminManager;
