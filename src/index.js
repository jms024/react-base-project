import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { config } from './config/app/app-config-APP_TARGET';

const Index = () => {
    return (
        <div>Hello</div>
    )
};

ReactDOM.render(
    <Router basename={config.basename}><Index /></Router>,
    document.getElementById('app')
);