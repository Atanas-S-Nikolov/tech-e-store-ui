import '../styles/App.css';

import { ThemeProvider } from '@mui/material';
import { appTheme } from './utils/Themes';

import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router/AppRouter';

import { store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import { persistStore } from 'reduxjs-toolkit-persist';

import Loader from './components/utils/Loader';

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <PersistGate loading={<Loader open/>} persistor={persistStore(store)}>
          <ThemeProvider theme={appTheme}>
            <RouterProvider router={appRouter}/>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
