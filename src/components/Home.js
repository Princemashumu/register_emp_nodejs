import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; // Import Firestore (db)
import { collection, query, where, getDocs } from 'firebase/firestore';
import EmployeeManager from './EmployeeManager';
import ProfileDialog from './ProfileDialog';

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
  gap: 20px;
`;

const MenuLink = styled.a`
  text-decoration: none;
  color: #004d40;
  font-size: 1em;
  transition: color 0.3s ease;

  &:hover {
    color: #f44336;
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

const Wrapper = styled.div`
  margin-top: 80px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid #007bff;
  border-radius: 8px;
  background-color: rgb(6 182 212);
  border-Top:none;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h2 {
    color: #004d40;
    font-size: 2em;
  }

  p {
    color: #555;
    font-size: 1.2em;
  }
`;

const MainFooter = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #777;
`;

const Home = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false); // State for dialog visibility
  const [showAdminLink, setShowAdminLink] = useState(true); // State to manage if the Admins link should show
  const [profile, setProfile] = useState(null); // State to store profile data
  const currentUser = auth.currentUser;

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (currentUser) {
        const email = currentUser.email;

        // Query Firestore collection to check if email is in `admins`
        const q = query(collection(db, 'admins'), where('email', '==', email));
        const querySnapshot = await getDocs(q);

        // If email exists in admins collection, hide the Admins link (setShowAdminLink to false)
        setShowAdminLink(querySnapshot.empty); // If no documents found, it means email is NOT in admins collection
        
        // Fetch the user's profile if they are in the admins collection
        if (!querySnapshot.empty) {
          const adminData = querySnapshot.docs[0].data();
          setProfile({
            name: adminData.name,
            surname: adminData.surname,
            email: adminData.email,
            photo: adminData.photo, // Assuming you have a photo field
          });
        }
      }
    };

    checkAdminStatus();
  }, [currentUser]);

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
      <NavBar>
        <CompanyName>
          <a href="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>ERStaff</h1>
          </a>
        </CompanyName>
        
        <Menu>
          {showAdminLink && <MenuLink href="/Admins">Admins</MenuLink>} {/* Conditionally render Admins link */}
          <MenuLink onClick={() => setShowProfile(true)}>Profile</MenuLink> {/* Open Profile Dialog */}
        </Menu>

        <LogoutButton onClick={handleLogout}>
          LOGOUT
        </LogoutButton>
      </NavBar>

      <Wrapper>
        <Header>
          <h2>WELCOME</h2>
          <p>Design and manage employees efficiently.</p>
        </Header>

        <EmployeeManager />

        <MainFooter>
          <p>Media and Graphics Prince Mashumu 2024</p>
        </MainFooter>
      </Wrapper>

      {/* Show Profile Dialog */}
      {showProfile && profile && (
        <ProfileDialog 
          profile={profile} 
          onClose={() => setShowProfile(false)} // Close dialog
        />
      )}
    </>
  );
};

export default Home;
