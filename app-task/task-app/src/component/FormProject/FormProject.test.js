/*import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProjectProvider } from '../../context/ProjectContext/ProjectProvider';
import FormProject from './FormProject'; 
import { addProject } from '../../service/ProjectService'; 

jest.mock('../../service/ProjectService', () => ({
    addProject: jest.fn().mockResolvedValueOnce({}), // Simule un retour réussi
}));

describe('FormProject', () => {
    beforeEach(() => {
        localStorage.setItem('mail', 'test@mail.com'); // Simulez une valeur pour localStorage
        jest.clearAllMocks(); // Réinitialiser les mocks avant chaque test
    });

    test('renders the form and allows project addition', async () => {
        render(
            <ProjectProvider>
                <FormProject />
            </ProjectProvider>
        );

        // Remplir le formulaire
        fireEvent.change(screen.getByPlaceholderText('Project Name'), { target: { value: 'Test Project' } });
        fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'This is a test project' } });
        fireEvent.change(screen.getByPlaceholderText('Begin date'), { target: { value: '2024-10-30T09:00' } });
        fireEvent.change(screen.getByPlaceholderText('End date'), { target: { value: '2024-11-30T09:00' } });

        // Simuler la soumission du formulaire
        fireEvent.click(screen.getByRole('button', { name: 'submit-button' }));

        // Vérifiez que addProject a été appelé avec les bonnes valeurs
        await waitFor(() => {
            expect(addProject).toHaveBeenCalledWith({
                name: 'Test Project',
                description: 'This is a test project',
                owner: 'test@mail.com', // Assurez-vous que cela correspond à votre simulation
                startDate: '2024-10-30T09:00',
                endDate: '2024-11-30T09:00',
            });
        });
    });

    test('resets form fields after successful submission', async () => {
        addProject.mockResolvedValueOnce(); // Simule un ajout de projet réussi

        render(
            <ProjectProvider>
                <FormProject />
            </ProjectProvider>
        );

        // Remplir le formulaire
        fireEvent.change(screen.getByPlaceholderText('Project Name'), { target: { value: 'Test Project' } });
        fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'This is a test project' } });
        fireEvent.change(screen.getByPlaceholderText('Begin date'), { target: { value: '2024-10-30T09:00' } });
        fireEvent.change(screen.getByPlaceholderText('End date'), { target: { value: '2024-11-30T09:00' } });

        // Simuler la soumission du formulaire
        fireEvent.click(screen.getByRole('button', { name: 'submit-button' }));

        // Attendre la réinitialisation des champs
        await waitFor(() => {
            expect(screen.getByPlaceholderText('Project Name').value).toBe('');
            expect(screen.getByPlaceholderText('Description').value).toBe('');
            expect(screen.getByPlaceholderText('Begin date').value).toBe('');
            expect(screen.getByPlaceholderText('End date').value).toBe('');
        });
    });
});*/

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProjectProvider } from '../../context/ProjectContext/ProjectProvider';
import FormProject from './FormProject'; 
import { addProject } from '../../service/ProjectService'; 
import { createProject } from '../../service/ProjectService';

jest.mock('../../service/ProjectService', () => ({
    addProject: jest.fn().mockResolvedValueOnce({}), // Simule un retour réussi
}));

jest.mock('../../service/ProjectService', () => ({
    createProject: jest.fn().mockResolvedValue(),
}));

describe('FormProject', () => {
    beforeEach(() => {
        localStorage.setItem('mail', 'test@mail.com'); // Simulez une valeur pour localStorage
        jest.clearAllMocks(); // Réinitialiser les mocks avant chaque test
    });

    test('renders the form and allows project addition', async () => {

        render(
            <ProjectProvider>
                <FormProject />
            </ProjectProvider>
        );

        // Remplir le formulaire
        fireEvent.change(screen.getByPlaceholderText('Project Name'), { target: { value: 'Test Project' } });
        fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'This is a test project' } });
        fireEvent.change(screen.getByPlaceholderText('Begin date'), { target: { value: '2024-10-30T09:00' } });
        fireEvent.change(screen.getByPlaceholderText('End date'), { target: { value: '2024-11-30T09:00' } });

        // Simuler la soumission du formulaire
        fireEvent.click(screen.getByLabelText('submit-button')); // Utiliser getByLabelText ici

        // Vérifiez que addProject a été appelé avec les bonnes valeurs
        await waitFor(() => {
            expect(createProject).toHaveBeenCalledWith({
                name: 'Test Project',
                description: 'This is a test project',
                owner: 'test@mail.com', // Assurez-vous que cela correspond à votre simulation
                startDate: '2024-10-30T09:00',
                endDate: '2024-11-30T09:00',
            });
        });
    });

    test('resets form fields after successful submission', async () => {
        //addProject.mockResolvedValueOnce(); // Simule un ajout de projet réussi
        
        render(
            <ProjectProvider>
                <FormProject />
            </ProjectProvider>
        );

        // Remplir le formulaire
        fireEvent.change(screen.getByPlaceholderText('Project Name'), { target: { value: 'Test Project' } });
        fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'This is a test project' } });
        fireEvent.change(screen.getByPlaceholderText('Begin date'), { target: { value: '2024-10-30T09:00' } });
        fireEvent.change(screen.getByPlaceholderText('End date'), { target: { value: '2024-11-30T09:00' } });

        // Simuler la soumission du formulaire
        fireEvent.click(screen.getByLabelText('submit-button')); // Utiliser getByLabelText ici

        // Attendre la réinitialisation des champs
        await waitFor(() => {
            expect(screen.getByPlaceholderText('Project Name').value).toBe('');
            expect(screen.getByPlaceholderText('Description').value).toBe('');
            expect(screen.getByPlaceholderText('Begin date').value).toBe('');
            expect(screen.getByPlaceholderText('End date').value).toBe('');
        });
    });
});
