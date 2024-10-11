import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import styled from 'styled-components';
import AuthForm from './AuthForm';
import { auth, db } from '../firebaseConfig'; // Import auth and db from your firebaseConfig
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the auth method
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar component from MUI
import MuiAlert from '@mui/material/Alert'; // Import MUI Alert component
import { getDocs, collection } from 'firebase/firestore'; // Import Firestore methods

// Styled components for the layout
const AlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Alert = styled.div`
  background-color: red;
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 80%;
`;

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
`;

const CompanyName = styled.div`
  color: red;
  font-size: 1.5em;
  font-weight: bold;
`;

const CompanyLogo = styled.div`
  img {
    height: 50px;
    width: auto;
  }
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  margin-top: 70px; /* Adjusted for fixed NavBar */
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

const Footer = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #777;
`;

const SocMedContainer = styled.p`
  text-align: center;
  margin: 20px 0;

  a {
    margin: 0 10px;
    display: inline-block;
  }

  img {
    vertical-align: middle;
  }
`;

// MUI Alert component for Snackbar
const AlertSnackbar = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Styled Menu Link
const MenuLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: red;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;

  &:hover {
    background-color: darkred; /* Darker shade on hover */
  }
`;

const LoginPage = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // State for successful login
  const [isAdmin, setIsAdmin] = useState(false); // State to check if user is admin
  const [adminEmails, setAdminEmails] = useState([]); // State to hold admin emails
  const navigate = useNavigate();

  // Fetch admin emails from Firestore when the component mounts
  useEffect(() => {
    const fetchAdminEmails = async () => {
      try {
        const adminCollection = collection(db, 'admins'); // Use db reference here
        const adminSnapshot = await getDocs(adminCollection);
        const emails = adminSnapshot.docs.map(doc => doc.data().email); // Adjust based on your data structure
        setAdminEmails(emails); // Set admin emails in state
      } catch (error) {
        console.error("Error fetching admin emails:", error);
      }
    };

    fetchAdminEmails();
  }, []); // Empty array means this runs only once on mount

  const handleLogin = async (email, password) => {
    console.log('Attempting login with:', { email, password }); // Log values for debugging

    try {
      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if user is admin
      if (adminEmails.includes(email)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      // Handle successful login
      console.log('Login successful:', userCredential); // You can log or save user data here
      
      // Trigger the success Snackbar
      setLoginSuccess(true);
      setTimeout(() => {
        navigate('/home'); // Redirect to home page after successful login
      }, 1500); // Delay for showing the Snackbar
    } catch (error) {
      console.error('Login error:', error);
      setLoginFailed(true);
      setTimeout(() => setLoginFailed(false), 3000); // Hide alert after 3 seconds
    }
  };

  return (
    <>
      <NavBar>
        <CompanyName>ERStaff</CompanyName>
        <CompanyLogo>
          <img src="Applogo.png" alt="Company Logo" />
        </CompanyLogo>
      </NavBar>
      <LoginWrapper>
        <Header>
          <h2>
            FAST <span style={{ color: 'red' }}>EASY</span> EFFECTIVE.
          </h2>
          <p>Way To Design and Manage employees Efficiently.</p>
          <div>
            {loginFailed && (
              <AlertOverlay>
                <Alert>Invalid email or password</Alert>
              </AlertOverlay>
            )}
            <AuthForm handleSubmit={handleLogin} formType="login" />
          </div>
        </Header>
        <Footer>
          <p>Media and Graphics Prince Mashumu 2024</p>
        </Footer>
      </LoginWrapper>
      <SocMedContainer>
        <a href="https://www.facebook.com/eTvStaff/" target="_blank" rel="noopener noreferrer">
          <img id="fb-img" width="25" src="https://i.imgur.com/6ye5lwf.png" alt="Facebook" />
        </a>
        <a href="https://www.instagram.com/eTvStaff/" target="_blank" rel="noopener noreferrer">
          <img id="ig-img" width="25" src="https://i.imgur.com/SEsRzFL.png" alt="Instagram" />
        </a>
        <a href="https://www.twitter.com/eTvStaff/" target="_blank" rel="noopener noreferrer">
          <img id="twitter-img" width="25" src="https://i.imgur.com/y8o23cc.png" alt="Twitter" />
        </a>
      </SocMedContainer>

      {/* Snackbar for successful login */}
      <Snackbar
        open={loginSuccess}
        autoHideDuration={3000}
        onClose={() => setLoginSuccess(false)}
      >
        <AlertSnackbar onClose={() => setLoginSuccess(false)} severity="success">
          Login Successful!
        </AlertSnackbar>
      </Snackbar>

      {/* Conditional Rendering of Admin Menu Link */}
      {isAdmin && (
        <MenuLink to="/AdminPage">Admin Page</MenuLink> // Example of conditional rendering
      )}
    </>
  );
};

export default LoginPage;
