import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from "react-router-dom";
import config from './config/app/app-config-APP_TARGET';

import Components from './components';

const Index = () => (
    <Components />
)

ReactDOM.render(
    <Router basename={config.basename}><Index /></Router>,
    document.getElementById('app')
);