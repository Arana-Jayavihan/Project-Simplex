import React from "react";
import App from './App'
import { Provider } from 'react-redux'
import store from "./store"
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

window.store = store

const root = createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
)
