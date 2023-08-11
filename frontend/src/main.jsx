import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
 
    <ChakraProvider>
    <CSSReset />
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ChakraProvider>

)
