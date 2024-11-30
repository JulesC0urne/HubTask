import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { TaskContext } from '../../context/TaskContext/TaskContext';
import FormTask from './FormTask';

const mockAddTicket = jest.fn();

const renderComponent = (projectId) => {
  return render(
    <TaskContext.Provider value={{ addTicket: mockAddTicket }}>
      <FormTask projectId={projectId} handleBackClick={jest.fn()} />
    </TaskContext.Provider>
  );
};

describe('FormTask', () => {
  beforeEach(() => {
    mockAddTicket.mockClear(); // Clear any previous calls to mock function
  });

  test('renders the form', () => {
    renderComponent('12345');

    expect(screen.getByPlaceholderText('Task Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Due date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save item/i })).toBeInTheDocument();
  });

  test('submits the form with correct data', async () => {
    renderComponent('12345');

    fireEvent.change(screen.getByPlaceholderText('Task Name'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Task description' } });
    fireEvent.change(screen.getByPlaceholderText('Due date'), { target: { value: '2024-10-31T12:00' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'In Progress' } });

    fireEvent.click(screen.getByRole('button', { name: /save item/i }));

    expect(mockAddTicket).toHaveBeenCalledWith({
      title: 'New Task',
      description: 'Task description',
      createDate: expect.any(String), // Checking for a valid date string
      dueDate: '2024-10-31T12:00',
      status: 'In Progress',
      userMail: localStorage.getItem('mail'),
      projectId: '12345',
    });
  });

  test('resets form fields after submission', async () => {
    renderComponent('12345');

    fireEvent.change(screen.getByPlaceholderText('Task Name'), { target: { value: 'Task Name' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Some description' } });
    fireEvent.change(screen.getByPlaceholderText('Due date'), { target: { value: '2024-10-31T12:00' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Done' } });

    fireEvent.click(screen.getByRole('button', { name: /save item/i }));

    // Wait for the reset to take effect
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Task Name').value).toBe('');
      expect(screen.getByPlaceholderText('Description').value).toBe('');
      expect(screen.getByPlaceholderText('Due date').value).toBe('');
      expect(screen.getByRole('combobox').value).toBe('To Do');
    });
  });
});
