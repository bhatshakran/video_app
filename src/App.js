import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';

function App() {
	return (
		<div className='app'>
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/videopage/:slug' component={VideoPage} />
			</Switch>
		</div>
	);
}

export default App;
