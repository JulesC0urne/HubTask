import './App.css';
import AuthScreen from './screen/AuthScreen/AuthScreen';
import TaskScreen from './screen/TaskScreen/TaskScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext/TaskContext';
import ProjectScreen from './screen/ProjectScreen/ProjectScreen';
import { ProjectProvider } from './context/ProjectContext/ProjectProvider';
import { ConversationProvider } from './context/ConversationContext/ConversationContext';

function App() {

  return (
    
      <ProjectProvider>
          <TaskProvider>
          <ConversationProvider>
            <Router>
              <div>
                <Routes>
                  <Route path="/" element={<AuthScreen />} />
                  <Route path="/project" element={<ProjectScreen />} />
                  <Route 
                    path="/task/:projectId" 
                    element={<TaskScreen /> } 
                  />
                </Routes>
              </div>
            </Router>
            </ConversationProvider>
          </TaskProvider>
      </ProjectProvider>
    
  );
}

export default App;
