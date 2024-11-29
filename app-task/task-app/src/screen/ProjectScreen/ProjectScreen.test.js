import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProjectContext } from '../../context/ProjectContext/ProjectProvider';
import { TaskContext } from '../../context/TaskContext/TaskContext';
import { BrowserRouter as Router } from 'react-router-dom';
import ProjectScreen from './ProjectScreen';

// Mock des composants
jest.mock('../../component/Navbar/Navbar', () => () => <div>Navbar</div>);
jest.mock('../../component/FormProject/FormProject', () => () => <div>FormProject</div>);
jest.mock('../../component/ProjectCard/ProjectCard', () => ({ title, projects, onClick }) => (
  <div>
    <h2>{title}</h2>
    {projects.map((project) => (
      <div key={project.id} onClick={() => onClick(project.id)}>
        {project.name}
      </div>
    ))}
  </div>
));

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const MockProjectProvider = ({ children }) => {
  const mockProjectsOwned = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
  ];
  const mockProjectsMember = [
    { id: 3, name: 'Project A' },
    { id: 4, name: 'Project B' },
  ];

  const mockGetProjectsOwned = jest.fn().mockResolvedValue();
  const mockFetchProjectsByMember = jest.fn().mockResolvedValue();
  const mockDeleteProject = jest.fn();

  const contextValue = {
    projectsOwned: mockProjectsOwned,
    projectsMember: mockProjectsMember,
    loadingOwned: false,
    loadingMember: false,
    getProjectsOwned: mockGetProjectsOwned,
    fetchProjectsByMember: mockFetchProjectsByMember,
    deleteProject: mockDeleteProject,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};

const MockTaskProvider = ({ children }) => {
  const mockSetProjectId = jest.fn();
  return (
    <TaskContext.Provider value={{ setProjectId: mockSetProjectId }}>
      {children}
    </TaskContext.Provider>
  );
};

describe('ProjectScreen', () => {
  test('renders Navbar and FormProject', () => {
    render(
      <Router>
        <MockProjectProvider>
          <MockTaskProvider>
            <ProjectScreen />
          </MockTaskProvider>
        </MockProjectProvider>
      </Router>
    );

    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('FormProject')).toBeInTheDocument();
  });

  test('displays loading message for owned projects', async () => {
    const contextValue = {
      projectsOwned: [],
      projectsMember: [],
      loadingOwned: true,
      loadingMember: true,
      getProjectsOwned: jest.fn(),
      fetchProjectsByMember: jest.fn(),
      deleteProject: jest.fn(),
    };

    render(
      <Router>
        <ProjectContext.Provider value={contextValue}>
          <TaskContext.Provider value={{ setProjectId: jest.fn() }}>
            <ProjectScreen />
          </TaskContext.Provider>
        </ProjectContext.Provider>
      </Router>
    );

    expect(screen.getByText(/Loading owned projects.../i)).toBeInTheDocument();
    expect(screen.getByText(/Loading member projects.../i)).toBeInTheDocument();
  });

  test('displays message when no owned projects are present', () => {
    const contextValue = {
      projectsOwned: [],
      projectsMember: [],
      loadingOwned: false,
      loadingMember: false,
      getProjectsOwned: jest.fn(),
      fetchProjectsByMember: jest.fn(),
      deleteProject: jest.fn(),
    };

    render(
      <Router>
        <ProjectContext.Provider value={contextValue}>
          <TaskContext.Provider value={{ setProjectId: jest.fn() }}>
            <ProjectScreen />
          </TaskContext.Provider>
        </ProjectContext.Provider>
      </Router>
    );

    expect(screen.getByText(/You don't have owned projects./i)).toBeInTheDocument();
  });

  test('displays message when no member projects are present', () => {
    const contextValue = {
      projectsOwned: [],
      projectsMember: [],
      loadingOwned: false,
      loadingMember: false,
      getProjectsOwned: jest.fn(),
      fetchProjectsByMember: jest.fn(),
      deleteProject: jest.fn(),
    };

    render(
      <Router>
        <ProjectContext.Provider value={contextValue}>
          <TaskContext.Provider value={{ setProjectId: jest.fn() }}>
            <ProjectScreen />
          </TaskContext.Provider>
        </ProjectContext.Provider>
      </Router>
    );

    expect(screen.getByText(/You don't have member projects./i)).toBeInTheDocument();
  });

  test('navigates to task on project click', async () => {
    render(
      <Router>
        <MockProjectProvider>
          <MockTaskProvider>
            <ProjectScreen />
          </MockTaskProvider>
        </MockProjectProvider>
      </Router>
    );

    // Simuler un clic sur un projet
    fireEvent.click(screen.getByText('Project 1'));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/task/1'));

    fireEvent.click(screen.getByText('Project A'));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/task/3'));
  });
});
