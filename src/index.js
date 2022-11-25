import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { UserContextProvider } from './components/context/userContext';
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();
root.render(
  <React.StrictMode>
    <UserContextProvider>
    <QueryClientProvider client={client}>
     <App />
     </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);

