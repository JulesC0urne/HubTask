import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthScreen from './AuthScreen';

// Mocking the child components
jest.mock('../../component/LoginModal/LoginModal', () => (props) => (
    <div>
        <h1>Login Modal</h1>
        <button aria-label="back" onClick={props.backClick}>Back</button>
    </div>
));

jest.mock('../../component/SignupModal/SignupModal', () => (props) => (
    <div>
        <h1>Signup Modal</h1>
        <button aria-label="back" onClick={props.backClick}>Back</button>
    </div>
));

jest.mock('../../component/DefaultModal/DefaultModal', () => (props) => (
    <div>
        <h1>Default Modal</h1>
        <button aria-label="login" onClick={props.loginClick}>Login</button>
        <button aria-label="signup" onClick={props.signupClick}>Signup</button>
    </div>
));

describe('AuthScreen', () => {
    test('renders DefaultModal by default', () => {
        render(
            <MemoryRouter>
                <AuthScreen />
            </MemoryRouter>
        );

        expect(screen.getByText(/default modal/i)).toBeInTheDocument();
    });

    test('renders LoginModal when login button is clicked', () => {
        render(
            <MemoryRouter>
                <AuthScreen />
            </MemoryRouter>
        );

        // Simulate click on login button
        fireEvent.click(screen.getByLabelText(/login/i));

        expect(screen.getByText(/login modal/i)).toBeInTheDocument();
    });

    test('renders SignupModal when signup button is clicked', () => {
        render(
            <MemoryRouter>
                <AuthScreen />
            </MemoryRouter>
        );

        // Simulate click on signup button
        fireEvent.click(screen.getByLabelText(/signup/i));

        expect(screen.getByText(/signup modal/i)).toBeInTheDocument();
    });

    test('returns to DefaultModal when back button in LoginModal is clicked', () => {
        render(
            <MemoryRouter>
                <AuthScreen />
            </MemoryRouter>
        );

        // Go to LoginModal
        fireEvent.click(screen.getByLabelText(/login/i));

        // Click back button
        fireEvent.click(screen.getByLabelText(/back/i));

        expect(screen.getByText(/default modal/i)).toBeInTheDocument();
    });

    test('returns to DefaultModal when back button in SignupModal is clicked', () => {
        render(
            <MemoryRouter>
                <AuthScreen />
            </MemoryRouter>
        );

        // Go to SignupModal
        fireEvent.click(screen.getByLabelText(/signup/i));

        // Click back button
        fireEvent.click(screen.getByLabelText(/back/i));

        expect(screen.getByText(/default modal/i)).toBeInTheDocument();
    });
});
