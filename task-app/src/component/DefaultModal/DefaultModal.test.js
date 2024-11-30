// DefaultModal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DefaultModal from './DefaultModal'; // Assurez-vous que le chemin est correct

describe('DefaultModal', () => {
  const loginClickMock = jest.fn(); // Mock de la fonction de connexion
  const signupClickMock = jest.fn(); // Mock de la fonction d'inscription

  beforeEach(() => {
    render(<DefaultModal loginClick={loginClickMock} signupClick={signupClickMock} />);
  });

  test('renders the welcome message', () => {
    const welcomeMessage = screen.getByText(/welcome to tasks list app/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders the login button', () => {
    const loginButton = screen.getByLabelText(/login-access/); 
    expect(loginButton).toBeInTheDocument();
  });

  test('renders the signup button', () => {
    const signupButton = screen.getByLabelText(/signup-access/); 
    expect(signupButton).toBeInTheDocument();
  });

  test('calls loginClick function when login button is clicked', () => {
    const loginButton = screen.getByLabelText(/login-access/); 
    fireEvent.click(loginButton);
    expect(loginClickMock).toHaveBeenCalledTimes(1); // Vérifie que la fonction est appelée une fois
  });

  test('calls signupClick function when signup button is clicked', () => {
    const signupButton = screen.getByLabelText(/signup-access/); 
    fireEvent.click(signupButton);
    expect(signupClickMock).toHaveBeenCalledTimes(1); // Vérifie que la fonction est appelée une fois
  });
});
