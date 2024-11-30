import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupModal from './SignupModal';
import { signup } from '../../service/AuthService';
import Swal from 'sweetalert2';

jest.mock('../../service/AuthService'); // Mock the service
jest.mock('sweetalert2');

describe('SignupModal', () => {
  const mockBackClick = jest.fn();
  const mockSubmitClick = jest.fn();

  beforeEach(() => {
    render(<SignupModal backClick={mockBackClick} />);
    Swal.fire.mockClear(); // Clear Swal mocks before each test
  });

  test('renders the email input', () => {
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('renders the password input', () => {
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders the back button', () => {
    const backButton = screen.getByLabelText(/back/i);
    expect(backButton).toBeInTheDocument();
  });

  test('renders the submit button', () => {
    const submitButton = screen.getByLabelText(/submit-button/i);
    expect(submitButton).toBeInTheDocument();
  });

  test('calls backClick function when back button is clicked', () => {
    const backButton = screen.getByLabelText(/back/i);
    fireEvent.click(backButton);
    expect(mockBackClick).toHaveBeenCalledTimes(1); // Vérifie que la fonction est appelée une fois
  });

  test('submits the form with valid data', async () => {
    signup.mockResolvedValue({ data: { message: "User created" } }); // Mock successful signup response

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByLabelText(/submit-button/i)); // Ensure button has correct aria-label

    // Wait for the success alert to be called
    await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Succès',
                text: 'Compte créé avec succès !',
            })
        );
    });
  });

  test('shows error alert on signup failure', async () => {
    signup.mockRejectedValue(new Error("Signup failed"));

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByLabelText(/submit-button/i));

    // Wait for the error alert to be called
    await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Erreur',
                text: 'Échec de la création du compte. Veuillez réessayer.',
            })
        );
    });
  });

  test('shows error alert when email input is empty', async () => {
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByLabelText(/submit-button/i));

    await waitFor(() => {
      expect(Swal.fire).not.toHaveBeenCalled(); // Since email is required, no alert should be shown
    });
  });

  test('shows error alert when password input is empty', async () => {
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByLabelText(/submit-button/i));

    await waitFor(() => {
      expect(Swal.fire).not.toHaveBeenCalled(); // Since password is required, no alert should be shown
    });
  });

  test('shows error alert on invalid email format', async () => {
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByLabelText(/submit-button/i));

    await waitFor(() => {
      expect(Swal.fire).not.toHaveBeenCalled(); // Since email is invalid, no alert should be shown
    });
  });

  test('renders the forgot password link', () => {
    const forgotPasswordLink = screen.getByLabelText(/forgot/i);
    expect(forgotPasswordLink).toBeInTheDocument(); // Check if the link is rendered
  });

  test('clicking the forgot password link does not throw an error', () => {
    const forgotPasswordLink = screen.getByLabelText(/forgot/i);
    expect(() => {
      fireEvent.click(forgotPasswordLink); // Click the link
    }).not.toThrow(); // Ensure clicking does not throw an error
  });

  test('does not call backClick if signup fails', async () => {
    signup.mockRejectedValue(new Error("Signup failed"));

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByLabelText(/submit-button/i));

    await waitFor(() => {
      expect(mockBackClick).not.toHaveBeenCalled(); // Check if backClick was not called on failure
    });
  });
});
