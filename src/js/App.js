import '../styles/App.css';

import { ThemeProvider } from '@mui/material';
import { appTheme } from './utils/Themes';
import NavigationBar from './components/menu/NavigationBar';
import AppContent from './components/content/AppContent';

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={appTheme}>
        <NavigationBar />
        <AppContent />
      </ThemeProvider>
    </div>
  );
}

export default App;
