import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BudgetsProvider} from "./pages/component/BudgetsContext"

ReactDOM.render(
    <BrowserRouter>
    <BudgetsProvider>
        <App />
    </BudgetsProvider>
    </BrowserRouter>,
    document.getElementById('root')
);