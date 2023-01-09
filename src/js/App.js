import '../styles/App.css';

import { ThemeProvider } from '@mui/material';
import { appTheme } from './utils/Themes';

import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router/AppRouter';

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={appTheme}>
        <RouterProvider router={appRouter}>
          <main></main>
        </RouterProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
