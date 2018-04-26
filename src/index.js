import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import App from './components/App';

render(
	<App customPlayerOptions={playerOptions} />,
	document.getElementById('ed-video-hub')
);
