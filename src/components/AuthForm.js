import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, CircularProgress } from '@mui/material';
import styled from 'styled-components';

// Styled Paper component for form background
const FormContainer = styled(Paper)`
  padding: 40px;
  max-width: 400px;
  margin: auto;
  margin-top: 70px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

// Styled Button component with custom styles
const StyledButton = styled(Button)`
  margin-top: 16px;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
`;

// Styled Typography for error message
const ErrorText = styled(Typography)`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
`;

const AuthForm = ({ handleSubmit, formType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    try {
      await handleSubmit(email, password); // Pass email and password to the handleSubmit function
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer elevation={3}>
      <Typography variant="h5" align="center" gutterBottom>
        {formType === 'login' ? 'Login' : 'Register'}
      </Typography>
      <form onSubmit={handleFormSubmit} aria-label={`${formType} form`}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              helperText={error}
              inputProps={{ 'aria-label': 'Email Input' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
              helperText={error}
              inputProps={{ 'aria-label': 'Password Input' }}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <ErrorText>{error}</ErrorText>
            </Grid>
          )}
          <Grid item xs={12}>
            <StyledButton
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={loading}
              aria-label={`${formType} button`}
            >
              {loading ? <CircularProgress size={24} /> : formType === 'login' ? 'Login' : 'Register'}
            </StyledButton>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
};

export default AuthForm;
