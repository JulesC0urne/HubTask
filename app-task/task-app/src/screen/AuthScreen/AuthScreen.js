import React, { useEffect, useState } from 'react';
import './AuthScreen.css';
import LoginModal from '../../component/LoginModal/LoginModal';
import SignupModal from '../../component/SignupModal/SignupModal';
import DefaultModal from '../../component/DefaultModal/DefaultModal';
import { useNavigate } from 'react-router-dom';

const AuthScreen = () => {

    const navigate = useNavigate();
    const [modalState, setModalState] = useState("default");

    const handleDefaultState = () => {
        setModalState("default");
    }

    const handleLoginState = () => {
        setModalState("login");
    }

    const handleSignupState = () => {
        console.log("click signup");
        setModalState("signup");
    }

    const handleNavigation = () => {
        navigate("/project");
    }

    useEffect(() => {
        handleDefaultState();
    }, []);

    return (
        <div className="info-screen">
            { modalState === "default" ? 
            (
                <DefaultModal loginClick={() => handleLoginState()} signupClick={() => handleSignupState()} />
            ) : modalState === "login" ? (
                <LoginModal backClick={() => handleDefaultState()} goToProject={handleNavigation} goToSignup={() => handleSignupState()}/>
            ) : modalState === "signup" ? (
                <SignupModal backClick={() => handleDefaultState()} goToLogin={() => handleLoginState()}/>
            ) : null}
        </div>
    );
};

export default AuthScreen;