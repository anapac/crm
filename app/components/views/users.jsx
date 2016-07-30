'use strict';

import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Glyphicon } from 'react-bootstrap';

export default class Users extends React.Component {
	constructor(props) {
		super(props);

		// Init state --> equivalent to getInitialState() in React.createClass()
		this.state = {
			users: [],
			userId: null,
			userClass: null
		};

		this.render = this.render.bind(this);
		this.showUserDetails = this.showUserDetails.bind(this);
		this.createNewUser = this.createNewUser.bind(this);
		this.delUser = this.delUser.bind(this);
	}	// constructor()

	showUserDetails(userId, setUserClassTo) {
		let targetPath = `/users/${userId}`;

		this.context.router.push({ pathname: targetPath, query: { userId: this.state.userId, userClass: setUserClassTo } });
	}	// showUserDetails()

	createNewUser() {
		let targetPath = '/users/new';
		let setUserClassTo = 'admin';

		this.context.router.push({ pathname: targetPath, query: { userId: this.state.userId, userClass: setUserClassTo } });
	}	// createNewUser()

	delUser(userId, setUserClassTo) {
		let targetPath = `/users/${userId}`;

		if (userId) {
			this.context.UserService.deleteUserById(userId)
				.then(() => {
					this.context.router.push({
						pathname: '/users',
						query: {
							userId: this.state.userId,
							userClass: this.state.userClass
						}
					});
				});
		}
		this.context.router.push({ pathname: targetPath, query: { userId: this.state.userId, userClass: setUserClassTo } });
	}	// delUser()

	componentWillMount() {
		let curUserClass = null;

		if (this.props.location && this.props.location.query && this.props.location.query.userClass) {
			curUserClass = this.props.location.query.userClass;
		}

		this.setState({ userClass: curUserClass });
	}	// componentWillMount()

	componentDidMount() {
		this.context.UserService.getUsers().then((users) => {
			if (users && users.length > 0) {
				this.setState({ users: users });
			}
		});
	}	// componentDidMount()

	render() {
		let userClass = this.state.userClass;

		let userNodes = this.state.users.map((user) => {
			return (
				<div className='row list-row' key={user._id}>
					<div className='col-md-2 username'>
						<Link id={user._id} className='list-group-item'
							to={{ pathname: `/users/${user._id}`, query: { userClass: userClass || null } }}>
							<b>{user.username}</b></Link>
					</div>
					<div className='col-md-6 names'>
						<p className='list-item-text'>{user.namesLast}, {user.namesFirst} {user.namesOther}</p>
					</div>
					<div className='col-md-4 buttons'>
					{
						(userClass === 'generic' || userClass === 'admin')
						? (	<button type='button' className='btn btn-primary list-item-btn' 
							onClick={() => this.showUserDetails(user._id, 'admin')}><Glyphicon glyph="zoom-in" /> Details</button>)
						: (' ')
					}
					{
						(userClass === 'generic' || userClass === 'admin')
						? (	<button type='button' className='btn btn-danger'
							onClick={() => this.delUser(user._id, 'admin')}>Delete User</button> )
						: (' ')
					}
					</div>
				</div>
			);
		});
			
		return (
				<div>
					<h1 className='component-head'><Glyphicon glyph="hand-right" /> List Existing Users</h1>
					<div id='list' className='list-container list-group' key={'_' + userNodes._id}>
					<ReactCSSTransitionGroup
						transitionName="animation"
						transitionEnterTimeout={300}
						transitionLeaveTimeout={300}>
						{userNodes}
					</ReactCSSTransitionGroup>
					</div>
					<div className='btn-row bordered'>
						<button type='button' className='btn btn-default'
							onClick={() => this.createNewUser()}>New User</button>
					</div>
				</div>
		);
	}	// render()
}	// class Users

Users.propTypes = {
	params: React.PropTypes.object,
	query: React.PropTypes.object,
	location: React.PropTypes.object,
	userClass: React.PropTypes.oneOf([null, '', 'generic', 'admin'])
};

Users.contextTypes = {
	UserService: React.PropTypes.object,
	router: React.PropTypes.object
};
