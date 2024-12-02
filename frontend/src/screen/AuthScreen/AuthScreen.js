import React, { useEffect, useState } from 'react';
import './AuthScreen.css';
import LoginModal from '../../component/LoginModal/LoginModal';
import SignupModal from '../../component/SignupModal/SignupModal';
import DefaultModal from '../../component/DefaultModal/DefaultModal';
import { useNavigate } from 'react-router-dom';

/**
 * Composant AuthScreen qui représente la page d'authentification de l'application.
 * Cette screen inclus les compsoants `DefaultModal`, `SignupModal` et `LoginModal`
 * 
 * @returns {JSX.Element} La page d'authentification
 */
const AuthScreen = () => {

    // Déclaration de la fonction de navigation pour rediriger l'utilisateur
    const navigate = useNavigate();  

    // État pour gérer le modal actuellement affiché, par défaut il est sur "default"
    const [modalState, setModalState] = useState("default");  

    /**
     * Fonction pour réinitialiser l'état du modal à "default" (état initial)
     */
    const handleDefaultState = () => {
        setModalState("default");
    }

    /**
     * Fonction pour changer l'état du modal à "login"
     */
    const handleLoginState = () => {
        setModalState("login");
    }

    /**
     * Fonction pour changer l'état du modal à "signup"
     */
    const handleSignupState = () => {
        setModalState("signup");
    }

    /**
     * Fonction pour naviguer vers la screen des projets
     */
    const handleNavigation = () => {
        navigate("/project");
    }

    // useEffect qui appelle handleDefaultState à l'initialisation du composant
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