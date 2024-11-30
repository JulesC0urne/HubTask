import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TaskContext } from '../../context/TaskContext/TaskContext';
import TicketModal from './TicketModal';

// Mock data for the selected ticket
const mockTicket = {
    createDate: '2024-10-30T10:00:00.000Z',
    description: 'Test description',
    title: 'Test title',
    dueDate: '2024-11-01T10:00:00.000Z'
};

const renderWithContext = (isOpen, ticketField) => {
    const updateTicketMock = jest.fn();
    const onCloseMock = jest.fn(); // Ensure this is a mock function

    render(
        <TaskContext.Provider value={{ selectedTicket: mockTicket, updateTicket: updateTicketMock, ticketField }}>
            <TicketModal isOpen={isOpen} onClose={onCloseMock} />
        </TaskContext.Provider>
    );

    return { updateTicketMock, onCloseMock };
};

describe('TicketModal Component', () => {
    test('renders correctly when open', () => {
        renderWithContext(true, 'title');
        
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText(/Edit title/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(mockTicket.title)).toBeInTheDocument();
    });

    test('closes the modal when cancel button is clicked', () => {
        const onCloseMock = jest.fn();
        render(
            <TaskContext.Provider value={{ selectedTicket: mockTicket, updateTicket: jest.fn(), ticketField: 'title' }}>
                <TicketModal isOpen={true} onClose={onCloseMock} />
            </TaskContext.Provider>
        );

        fireEvent.click(screen.getByText(/✕ Annuler/i));
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    test('updates ticket when accept button is clicked', async () => {
        const { updateTicketMock } = renderWithContext(true, 'title');
    
        // Use getByLabelText to locate the title input
        fireEvent.change(screen.getByLabelText(/modal-title/i), { target: { value: 'Updated title' } });
        fireEvent.click(screen.getByText(/✓ Accepter/i));
    
        expect(updateTicketMock).toHaveBeenCalledWith(mockTicket.createDate, { ...mockTicket, title: 'Updated title' });
    });

    test('renders the correct input field based on ticketField', () => {
        renderWithContext(true, 'description');
    
        // Locate the textarea for description
        expect(screen.getByLabelText(/modal-description/i)).toBeInTheDocument();
        expect(screen.queryByLabelText(/modal-title/i)).not.toBeInTheDocument();
    });

    test('renders null when modal is closed', () => {
        renderWithContext(false, 'title'); // Render with modal closed
        
        // Expect modal content to be absent from the DOM
        expect(screen.queryByText(/Edit title/i)).not.toBeInTheDocument();
    });
    
    

    test('closes the modal when cancel button is clicked', () => {
        const { onCloseMock } = renderWithContext(true, 'title'); // onCloseMock will be defined here
    
        // Simulate click on the cancel button
        fireEvent.click(screen.getByText(/✕ Annuler/i));
    
        // Check if onCloseMock was called
        expect(onCloseMock).toHaveBeenCalled();
    });

    describe('TicketModal Component', () => {
        const selectedTicketMock = {
            createDate: '2023-11-01',
            description: 'Test description',
            title: 'Test title',
            dueDate: '2023-12-01T10:00'
        };
    
        test('renders the correct input field for description', () => {
            renderWithContext(true, 'description', selectedTicketMock);
            expect(screen.getByLabelText('modal-description')).toBeInTheDocument();
            expect(screen.queryByLabelText('modal-title')).not.toBeInTheDocument();
            expect(screen.queryByLabelText('modal-dueDate')).not.toBeInTheDocument();
        });
    
        test('renders the correct input field for title', () => {
            renderWithContext(true, 'title', selectedTicketMock);
            expect(screen.getByLabelText('modal-title')).toBeInTheDocument();
            expect(screen.queryByLabelText('modal-description')).not.toBeInTheDocument();
            expect(screen.queryByLabelText('modal-dueDate')).not.toBeInTheDocument();
        });
    
        test('renders the correct input field for dueDate', () => {
            renderWithContext(true, 'dueDate', selectedTicketMock);
            expect(screen.getByLabelText('modal-dueDate')).toBeInTheDocument();
            expect(screen.queryByLabelText('modal-title')).not.toBeInTheDocument();
            expect(screen.queryByLabelText('modal-description')).not.toBeInTheDocument();
        });
    
        test('calls updateTicket and onClose when accept button is clicked', async () => {
            const updateTicketMock = jest.fn();
            const onCloseMock = jest.fn();
            const selectedTicketMock = {
                createDate: '2023-11-01',
                description: 'Test description',
                title: 'Test title',
                dueDate: '2023-12-01T10:00'
            };
        
            render(
                <TaskContext.Provider value={{
                    selectedTicket: selectedTicketMock,
                    updateTicket: updateTicketMock,
                    ticketField: 'title'
                }}>
                    <TicketModal isOpen={true} onClose={onCloseMock} />
                </TaskContext.Provider>
            );

            // Attempt to click the accept button and ensure it's labeled correctly
            fireEvent.click(screen.getByText('✓ Accepter'));
        
            // Await actions due to async behavior in `handleAccept`
            await waitFor(() => {
                expect(updateTicketMock).toHaveBeenCalledWith(selectedTicketMock.createDate, expect.any(Object));
                expect(onCloseMock).toHaveBeenCalled();
            });
        });
    });
});
