import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from "react-router-dom";

const config = require('./config/app.config.json');

import Components from './components';

const Index = () => (
    <Components />
)

ReactDOM.render(
    <Router basename={config.basename}><Index /></Router>,
    document.getElementById('app')
);

module.hot.accept();