import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { TaskContext } from '../../context/TaskContext/TaskContext';
import TicketBoard from './TicketBoard'; // Adjust the import path as necessary

const mockTickets = [
    {
        createDate: '2024-01-01T00:00:00Z',
        title: 'Task 1',
        description: 'Description for Task 1',
        dueDate: '2024-01-05T00:00:00Z',
        status: 'To Do',
    },
    {
        createDate: '2024-01-02T00:00:00Z',
        title: 'Task 2',
        description: 'Description for Task 2',
        dueDate: '2024-01-06T00:00:00Z',
        status: 'In Progress',
    },
];

const mockUpdateTicket = jest.fn();
const mockDeleteTicket = jest.fn();
const mockSelectTicket = jest.fn();
const mockClearSelectedTicket = jest.fn();
const mockSelectTicketField = jest.fn();
const mockClearTicketField = jest.fn();

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
    return render(
        <TaskContext.Provider value={providerProps}>
            {ui}
        </TaskContext.Provider>,
        renderOptions
    );
};

describe('TicketBoard', () => {
    beforeAll(() => {
        global.DragEvent = class extends Event {
            constructor(type, eventInitDict = {}) { // Default to an empty object
                super(type, eventInitDict);
                this.dataTransfer = eventInitDict.dataTransfer || {
                    setData: jest.fn(),
                    getData: jest.fn(() => {}),
                }; // Fallback to a mock object
            }
        };
    });

    beforeEach(() => {
        const providerProps = {
            tickets: mockTickets,
            updateTicket: mockUpdateTicket,
            deleteTicket: mockDeleteTicket,
            selectedTicket: null,
            selectTicket: mockSelectTicket,
            clearSelectedTicket: mockClearSelectedTicket,
            selectTicketField: mockSelectTicketField,
            clearTicketField: mockClearTicketField,
        };
        
        

        renderWithContext(<TicketBoard />, { providerProps });
    });

    it('renders tickets correctly', () => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.getByText('Description for Task 1')).toBeInTheDocument();
        expect(screen.getByText('Description for Task 2')).toBeInTheDocument();
    });

   
    it('deletes a ticket when the delete button is clicked', async () => {
        const deleteButton = screen.getAllByRole('button', { name: '✕' })[0];
        await act(async () => {
            fireEvent.click(deleteButton);
        });

        expect(mockDeleteTicket).toHaveBeenCalledWith('2024-01-01T00:00:00Z');
    });

});
