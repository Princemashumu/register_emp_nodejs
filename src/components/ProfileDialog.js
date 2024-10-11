import React from 'react';
import styled from 'styled-components';

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DialogContent = styled.div`
  background-color: white;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;

  &:hover {
    background-color: #c62828;
  }
`;

const ProfileDialog = ({ onClose, profile }) => {
  return (
    <DialogOverlay>
      <DialogContent>
        <h2>Profile Details</h2>
        {profile.photo && <img src={profile.photo} alt="Profile" style={{ width: '100px', borderRadius: '50%' }} />}
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Surname:</strong> {profile.surname}</p>
        <p><strong>Email:</strong> {profile.email}</p>

        <CloseButton onClick={onClose}>Close</CloseButton>
      </DialogContent>
    </DialogOverlay>
  );
};

export default ProfileDialog;
