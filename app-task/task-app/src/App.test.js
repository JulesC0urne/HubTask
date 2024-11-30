import { render } from '@testing-library/react';
import App from './App'; // adjust the import as necessary

test('renders AuthScreen at the root path', () => {
  // Render the App component directly, assuming it contains a Router.
  render(<App />); // No need to wrap it in MemoryRouter
});
