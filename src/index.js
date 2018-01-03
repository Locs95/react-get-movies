import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import MovieDetails from './components/MovieDetails.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
   <BrowserRouter>
     <Switch>
	  <Route exact path="/" component={App} />
	  <Route path="/:id" component={MovieDetails} />
	</Switch>
   </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
