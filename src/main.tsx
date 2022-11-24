import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { GlobalStyles } from './styles/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <>
      <GlobalStyles />
      <App />
    </>
  </React.StrictMode>,
);
