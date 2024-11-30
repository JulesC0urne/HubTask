// LoginModal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginModal from './LoginModal'; // Assurez-vous que le chemin est correct
import { login } from '../../service/AuthService'; // Importez le service de connexion

jest.mock('../../service/AuthService'); // Mock du service de connexion

describe('LoginModal', () => {
  const backClickMock = jest.fn(); // Mock pour la fonction de retour
  const goToProjectMock = jest.fn(); // Mock pour la fonction d'aller au projet

  beforeEach(() => {
    render(<LoginModal backClick={backClickMock} goToProject={goToProjectMock} />);
  });

  test('renders back button', () => {
    const backButton = screen.getByLabelText(/back/i); 
    expect(backButton).toBeInTheDocument();
  });

  test('renders submit button', () => {
    const backButton = screen.getByLabelText(/submit-button/);
    expect(backButton).toBeInTheDocument();
  });

  test('calls backClick function when back button is clicked', () => {
    const backButton = screen.getByLabelText(/back/i); 
    fireEvent.click(backButton);
    expect(backClickMock).toHaveBeenCalledTimes(1); 
  });

  test('submits the form with valid data', async () => {
    login.mockResolvedValue('mockToken'); // Mock du retour de la fonction de connexion

    fireEvent.change(screen.getByLabelText(/email/) , { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'submit-button' })); // Ciblez le bouton de soumission par son nom

    expect(login).toHaveBeenCalledWith({
      username: 'test@example.com',
      password: 'password123',
      role: 'USER'
    });
    
    // Attendez le rendu de l'alerte de succès
    const successAlert = await screen.findByText(/connexion réussie/i);
    expect(successAlert).toBeInTheDocument();
  });
  
  test('shows error alert on login failure', async () => {
    login.mockRejectedValue(new Error('Invalid credentials')); // Simulez une erreur

    fireEvent.change(screen.getByLabelText(/email/) , { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'submit-button' }));

    const errorAlert = await screen.findByText(/identifiants invalides/i);
    expect(errorAlert).toBeInTheDocument();
  });

});
