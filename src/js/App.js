import '../styles/App.css';

import { ThemeProvider } from '@mui/material';
import { appTheme } from './utils/Themes';
import NavigationBar from './components/menu/NavigationBar';

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={appTheme}>
        <NavigationBar />
      </ThemeProvider>
    </div>
  );
}

export default App;
