import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const appContainer = document.getElementById('root');

ReactDOM.render(
	<App />, 
	appContainer
);

registerServiceWorker();
