'use strict';

import $ from 'jquery';
window.jQuery = $;
require('bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useQueries } from 'history';

// Import all React view-components:
import AppLayout from './components/appLayout';
import Home from './components/views/home';
import About from './components/views/about';
import SearchContacts from './components/views/search';
import Contacts from './components/views/contacts';
import Contact from './components/views/contact';
import Users from './components/views/users';
import User from './components/views/user';

const AppHistory = useQueries(useRouterHistory(createBrowserHistory))();

ReactDOM.render((
	<Router history={AppHistory}>
		<Route path='/' component={AppLayout}>
			<IndexRoute component={Home} />
			<Route path='/home' component={Home} />
			<Route path='/about' component={About} />
			<Route path='/search' component={SearchContacts} />
			<Route path='/contacts' component={Contacts} />
			<Route path='/contacts/:contactRecordId' component={Contact} />
			<Route path='/users' component={Users} />
			<Route path='/users/:userRecordId' component={User} />
		</Route>
	</Router>
), document.getElementById('app-entry'));