import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/auth';
import FormProvider from './context/FormContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <ChakraProvider>
    <CSSReset />
    <BrowserRouter>
    <AuthProvider>
        <FormProvider>
    
    <ToastContainer />
    <App />
    </FormProvider>
    </AuthProvider>

    </BrowserRouter>
    </ChakraProvider>

)
