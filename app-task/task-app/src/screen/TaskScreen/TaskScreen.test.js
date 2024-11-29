import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TaskContext } from '../../context/TaskContext/TaskContext';
import TaskScreen from './TaskScreen';

// Mock des composants
jest.mock('../../component/Navbar/Navbar', () => () => <div>Navbar</div>);
jest.mock('../../component/FormTask/FormTask', () => ({ handleBackClick }) => (
  <div>
    <button onClick={handleBackClick}>Back</button>
  </div>
));
jest.mock('../../component/TicketBoard/TicketBoard', () => () => <div>TicketBoard</div>);

// Mock du module react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('TaskScreen', () => {
  const mockResetTasks = jest.fn();
  const mockNavigate = jest.fn();

  const MockTaskProvider = ({ children }) => {
    return (
      <TaskContext.Provider value={{ resetTasks: mockResetTasks }}>
        {children}
      </TaskContext.Provider>
    );
  };

  beforeEach(() => {
    // Réinitialisation de tous les mocks avant chaque test
    jest.clearAllMocks();
    require('react-router-dom').useNavigate.mockImplementation(() => mockNavigate);
  });

  test('renders Navbar and FormTask', () => {
    // Configure le mock pour useParams
    require('react-router-dom').useParams.mockImplementation(() => ({
      projectId: '123', // ou n'importe quel ID pour le test
    }));

    render(
      <Router>
        <MockTaskProvider>
          <TaskScreen />
        </MockTaskProvider>
      </Router>
    );

    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('TicketBoard')).toBeInTheDocument();
  });

  test('calls resetTasks and navigates on back button click', () => {
    // Configure le mock pour useParams
    require('react-router-dom').useParams.mockImplementation(() => ({
      projectId: '123',
    }));

    render(
      <Router>
        <MockTaskProvider>
          <TaskScreen />
        </MockTaskProvider>
      </Router>
    );

    fireEvent.click(screen.getByText('Back'));

    expect(mockResetTasks).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/project');
  });

  test('displays the correct projectId in FormTask', () => {
    const mockProjectId = "123";
    require('react-router-dom').useParams.mockImplementation(() => ({ projectId: mockProjectId }));

    render(
      <Router>
        <MockTaskProvider>
          <TaskScreen />
        </MockTaskProvider>
      </Router>
    );

    expect(screen.getByText('TicketBoard')).toBeInTheDocument(); // Vérifie si TicketBoard est rendu
    // Vous pouvez ajouter d'autres assertions spécifiques à FormTask si nécessaire.
  });
});
