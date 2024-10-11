import React, { useState } from 'react'; // Import useState for managing dialog visibility
import AdminManager from './AdminManager';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import ProfileDialog from './ProfileDialog'; // Import the ProfileDialog component

// Styled Components for NavBar (reused from Home)
const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 15px 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 50px;
`;

const CompanyName = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: red;

  h1 {
    margin: 0;
    font-size: 1.5em;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 20px; /* Space between menu items */
`;

const MenuLink = styled.a`
  text-decoration: none;
  color: #004d40;
  font-size: 1em;
  transition: color 0.3s ease;

  &:hover {
    color: #f44336; /* Change color on hover */
  }
`;

const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c62828;
  }
`;

// Wrapper for AdminPage
const Wrapper = styled.div`
  margin-top: 80px; // Adjusted margin to account for fixed NavBar
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid #007bff; /* Add a border around the AdminPage */
  border-radius: 8px; /* Optional: rounded corners */
  background-color: rgb(6 182 212); /* Optional: background color */
  border-Top:none;
 
`;

const AdminPage = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false); // State to control ProfileDialog visibility
  const profile = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Admin"
  }; // Replace with dynamic user data

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to login page after sign-out
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      {/* Reusing the NavBar component */}
      <NavBar>
        <CompanyName>
          <a href="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>ERStaff</h1>
          </a>
        </CompanyName>

        <Menu>
          <MenuLink href="/Home">Home</MenuLink>
          <MenuLink onClick={() => setShowProfile(true)}>Profile</MenuLink> {/* Open Profile Dialog */}
        </Menu>

        <LogoutButton onClick={handleLogout}>
          LOGOUT
        </LogoutButton>
      </NavBar>

      {/* Admin Manager Content */}
      <Wrapper>
        <AdminManager />
      </Wrapper>

      {/* Profile Dialog */}
      {showProfile && (
        <ProfileDialog 
          profile={profile} 
          onClose={() => setShowProfile(false)} // Close dialog
        />
      )}
    </>
  );
};

export default AdminPage;
