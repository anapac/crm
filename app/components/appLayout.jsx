'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Navigation from './navigation';
import Footer from './footer';

import UserService from '../services/user.service';
import ContactService from '../services/contact.service';


const USER_SERVICES_URL = '/api/users';
const CONTACT_SERVICES_URL = '/api/contacts';

export default class AppLayout extends React.Component {
	constructor(props) {
		super(props);

		this.userService = new UserService(USER_SERVICES_URL);				// singleton instance
		this.contactService = new ContactService(CONTACT_SERVICES_URL);		// singleton instance
	}

	getChildContext() {
		return {
			UserService: this.userService,
			ContactService: this.contactService
		}
	}

	render() {
		return(
			<ReactCSSTransitionGroup
						transitionName="animation"
						transitionEnterTimeout={300}
						transitionLeaveTimeout={300}>
				<div id='react' key='react-frame'>
					<main>
						<Navigation />

						<div id='outer'><h1><strong><i>Birds-Of-a-Feather</i> CRM</strong></h1></div>
						{this.props.children}
					</main>

					<Footer />
				</div>
			</ReactCSSTransitionGroup>
		);
	}	// render()
}	// class AppLayout

AppLayout.propTypes = {
	children: React.PropTypes.node
}

AppLayout.childContextTypes = {
	UserService: React.PropTypes.object,
	ContactService: React.PropTypes.object
}