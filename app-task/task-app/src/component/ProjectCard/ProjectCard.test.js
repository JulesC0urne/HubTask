import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from './ProjectCard'; // Adjust the import path as necessary

describe('ProjectCard', () => {
    const mockProjects = [
        {
            id: '1',
            name: 'Project Alpha',
            description: 'Description of Project Alpha',
            startDate: '2024-01-01',
            endDate: '2024-06-01',
            owner: 'Owner A',
            members: 'Member 1, Member 2'
        },
        {
            id: '2',
            name: 'Project Beta',
            description: 'Description of Project Beta',
            startDate: '2024-02-01',
            endDate: '2024-07-01',
            owner: 'Owner B',
            members: 'Member 3, Member 4'
        }
    ];

    const mockOnClick = jest.fn();
    const mockOnDelete = jest.fn();

    beforeEach(() => {
        render(
            <ProjectCard 
                title="My Projects"
                projects={mockProjects}
                onDelete={mockOnDelete}
                onClick={mockOnClick}
            />
        );
    });

    it('renders project cards correctly', () => {
        // Check if project names are rendered
        expect(screen.getByText('Project Alpha')).toBeInTheDocument();
        expect(screen.getByText('Project Beta')).toBeInTheDocument();

        // Check if descriptions are rendered
        expect(screen.getByText(/Description: Description of Project Alpha/i)).toBeInTheDocument();
        expect(screen.getByText(/Description: Description of Project Beta/i)).toBeInTheDocument();

        // Check other project details
        expect(screen.getByText(/Start Date: 01\/01\/2024/i)).toBeInTheDocument();
        expect(screen.getByText(/End Date: 01\/06\/2024/i)).toBeInTheDocument();
        expect(screen.getByText(/Owner: Owner A/i)).toBeInTheDocument();
        expect(screen.getByText(/Members: Member 1, Member 2/i)).toBeInTheDocument();
    });

    it('handles project card click', () => {
        const projectCard = screen.getByText('Project Alpha').closest('.project-card');
        fireEvent.click(projectCard);

        expect(mockOnClick).toHaveBeenCalledWith('1');
    });

    it('handles delete button click', () => {
        const deleteButton = screen.getAllByRole('button', { name: '✕' })[0]; // First project's delete button
        fireEvent.click(deleteButton);

        expect(mockOnDelete).toHaveBeenCalledWith('1');
    });

    it('does not trigger project card click when delete button is clicked', () => {
        const deleteButton = screen.getAllByRole('button', { name: '✕' })[0]; // First project's delete button
        const projectCard = screen.getByText('Project Alpha').closest('.project-card');

        fireEvent.click(deleteButton);
        expect(mockOnClick).not.toHaveBeenCalled(); // The onClick should not have been called
    });
});
