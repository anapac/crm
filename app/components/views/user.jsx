'use strict';

import React from 'react';
import $ from 'jquery';
window.jQuery = $;
import { Glyphicon } from 'react-bootstrap';

export default class User extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.canViewDetails = null;
		this.canEditContent = null;
		this.canCreateContent = null;
		this.isNewRecord = null;

		// Init state --> equivalent to getInitialState() in React.createClass()
		this.state = {
			initialUserRecord: null,
			userRecord: {},
			userRecordId: null,
			userId: null,
			userClass: null
		};

		this.render = this.render.bind(this);
		this.resetForm = this.resetForm.bind(this);
		this.persistForm = this.persistForm.bind(this);
		this.delUser = this.delUser.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
	} // constructor()

	resetForm() {
		// this.setState({ userRecord: $.extend(true, {}, this.state.initialUserRecord) });
		this.setState({ userRecord: this.state.initialUserRecord });
	}	// resetForm()

	persistForm() {
		let curUserRecordId = this.state.userRecordId;

		this.setState({ initialUserRecord: this.state.userRecord });

		if (curUserRecordId) {
			this.context.UserService.updateUserById(curUserRecordId, this.state.userRecord)
				.then(() => {
					this.context.router.push({
						pathname: '/users',
						query: {
							userId: this.state.userId,
							userClass: this.state.userClass
						}
					});
				});
		} else {
			this.context.UserService.createUser(this.state.userRecord)
				.then(() => {
					this.context.router.push({
						pathname: '/users',
						query: {
							userId: this.state.userId,
							userClass: this.state.userClass
						}
					});
				})
		}
	}	// persistForm()

	delUser() {
		let curUserRecordId = this.state.userRecordId;

		this.setState({ initialUserRecord: this.state.userRecord });

		if (curUserRecordId) {
			this.context.UserService.deleteUserById(curUserRecordId)
				.then(() => {
					this.context.router.push({
						pathname: '/users',
						query: {
							userId: this.state.userId,
							userClass: this.state.userClass
						}
					});
				});
		} else {
			// TODO: MODAL Message!
		}
	}	// delUser()

	handleCreate() {
		let curUserRecordState = this.state.userRecord || {};

		if (curUserRecordState) {
			this.context.UserService.createUser(this.state.userRecordId)
				.then((userData) => {
					if (userData) {
						this.setState({ userRecord: userData });
					}
			});
		}
	}	// handleCreate()

	handleFormChange(e) {
		let curUserRecordState = this.state.userRecord;
		// let reader = new FileReader();
		// let file = e.target.files[0];

		// if (e.target.name === 'photo') {
		// 	e.preventDefault();
		// 	reader.onloadend = () => {
		// 		this.setState({
		// 			userRecord: {
		// 				photo: {
		// 					data: file
		// 				}
		// 			}, 
		// 			preview: reader.result
		// 		});
		// 	}
		// } else {
			curUserRecordState[e.target.name] = e.target.value;
			this.setState({ userRecord: curUserRecordState });
		// }

		// reader.readAsDataURL(file);
	}	// handleFormChange()

	componentWillMount() {
		let userId = null;
		let userClass = null;
		let userRecordId = null;

		// Init userId:
		userId = this.props.userId || null;

		// Init userClass:
		if (this.props.userClass) {
			userClass = this.props.userClass || null;
		} else if (this.props.location && this.props.location.query && this.props.location.query.userClass) {
			userClass = this.props.location.query.userClass || null;
		}

		if (![ null, 'generic', 'admin' ].includes(userClass)) {
			userClass = null;
		}

		// Init user privileges:
		if (userClass) {
			if (userClass === 'generic') {
				this.canViewDetails = true;
			}

			if (userClass === 'admin') {
				this.canViewDetails = true;
				this.canEditContent = true;
				this.canCreateContent = true;
			}
		}

		// Init userRecordId:
		if (this.props.userRecordId) {
			userRecordId = this.props.userRecordId;
			this.isNewRecord = false;
		} else if (this.props.location && this.props.location.query && this.props.location.query.userRecordId) {
			userRecordId = this.props.location.query.userRecordId;
			this.isNewRecord = false;
		} else {
			if (this.props.params.userRecordId && this.props.params.userRecordId !== 'new') {
				userRecordId = this.props.params.userRecordId;
				this.isNewRecord = false;
			} else {
				userRecordId = null;
				this.isNewRecord = true;
			}
		}

		this.setState({
			userId: userId,
			userClass: userClass,
			userRecordId: userRecordId
		});
	}	// componentWillMount()

	componentDidMount() {
		let userRecord = {};

		// Init userRecord
		if (this.state.userRecordId && this.state.userRecordId !== 'new' && this.state.userClass) {
			this.context.UserService.getUserById(this.state.userRecordId)
				.then((userData) => {
					if (userData) {
						if (this.state.initialUserRecord) {
							this.setState({ userRecord: userData });
						} else {
							this.setState({ userRecord: userData, initialUserRecord: userData });
						}
					}
			});
		} else {
			userRecord = {
				// fall back to user defaults:
				_id: null,
				username: '',
				password: '',
				namesFirst: '',
				namesLast: '',
				namesOther: '',
				dateOfBirth: new Date().toISOString(),
				phone: '',
				mobile: '',
				email: '',
				skypeId: '',
				address: '',
				zipCode: ''
			};
		}

		this.setState({ userRecord: userRecord });
	}	// componentDidMount()

	render() {
		// let userClass = this.state.userClass;
		let userRecord = this.state.userRecord;

		return (
			<section id='user'>
			<div><h1 className='component-head'><Glyphicon glyph="hand-right" /> Manage Users</h1></div>
			
			<form role='form' className='form-group'>
			<div className='row bordered'>
			{
				(this.canEditContent)
				? ( <div className='form-group col-md-4'>
						<label htmlFor='user-name' className='em12'>Username</label>
						<input type='text' id='user-name' name='username' placeholder='Username' className='form-control'
							value={userRecord.username || ''} onChange={this.handleFormChange} />
					</div> )
				: ( <span className='ro-field col-md-3'><b>Username:</b> {(this.canViewDetails) ? userRecord.username : ''}</span> )
			}
			{
				(this.canEditContent)
				? ( <div className='form-group col-md-4'>
						<label htmlFor='pswd' className='em12'>Password</label>
						<input type='password' id='pswd' name='password' placeholder='Password' className='form-control'
							value={userRecord.password || ''} onChange={this.handleFormChange} />
					</div> )
				: ( <span className='ro-field col-md-3'><b>Password:</b> {(this.canEditContent) ? userRecord.password : ''}</span> )
			}
			</div>
			<div className='row bordered'>
			{
				(this.canEditContent)
				? ( <div className='form-group col-md-4'>
						<label htmlFor='names-first' className='em12'>First Name</label>
						<input type='text' id='names-first' name='namesFirst' placeholder='First Name' className='form-control'
							value={userRecord.namesFirst || ''} onChange={this.handleFormChange} />
					</div> )
				: ( <span className='ro-field col-md-3'><b>First Name:</b> {(this.canViewDetails) ? userRecord.namesFirst : ''}</span> )
			}
			{
				(this.canEditContent)
				? ( <div className='form-group col-md-4'>
						<label htmlFor='names-last'>Last Name</label>
						<input type='text' id='names-last' name='namesLast' placeholder='Last Name' className='form-control'
							value={userRecord.namesLast || ''} onChange={this.handleFormChange} />
					</div> )
				: ( <span className='ro-field col-md-3'><b>Last Name:</b> {(this.canViewDetails) ? userRecord.namesLast : ''}</span> )
			}
			{
				(this.canEditContent)
				? ( <div className='form-group col-md-4'>
						<label htmlFor='names-other'>Other Names</label>
						<input type='text' id='names-other' name='namesOther' placeholder='Other Names' className='form-control'
							value={userRecord.namesOther || ''} onChange={this.handleFormChange} />
					</div> )
				: ( <span className='ro-field col-md-3'><b>Other Names:</b> {(this.canViewDetails) ? userRecord.namesOther : ''}</span> )
			}
			</div>
			<div className='row bordered'>
			{
				(this.canEditContent)
				? ( <div className='form-group col-md-3'>
						<label htmlFor='phone'>Phone</label>
						<input type='text' id='phone' name='phone' placeholder='Phone' className='form-control'
							value={userRecord.phone || ''} onChange={this.handleFormChange} />
					</div> )
				: ( <span className='ro-field col-md-3'><b>Phone:</b> {(this.canViewDetails) ? userRecord.phone : ''}</span> )
			}
			{
				(this.canEditContent)
				? ( <div className='form-group col-md-3'>
						<label htmlFor='mobile'>Mobile</label>
						<input type='text' id='mobile' name='mobile' placeholder='Mobile' className='form-control'
							value={userRecord.mobile || ''} onChange={this.handleFormChange} />
					</div> )
				: ( <span className='ro-field col-md-3'><b>Mobile:</b> {(this.canViewDetails) ? userRecord.mobile : ''}</span> )
			}
			{
				(this.canEditContent)
				? ( <div className='form-group col-md-3'>
						<label htmlFor='email'>Email</label>
						<input type='text' id='email' name='email' placeholder='Email' className='form-control'
							value={userRecord.email || ''} onChange={this.handleFormChange} />
					</div> )
				: ( <span className='ro-field col-md-3'><b>Email:</b> {(this.canViewDetails) ? userRecord.email : ''}</span> )
			}
			{
				(this.canEditContent)
				? ( <div className='form-group col-md-3'>
						<label htmlFor='skypeid'>Skype Id</label>
						<input type='text' id='skypeid' name='skypeId' placeholder='Skype' className='form-control'
							value={userRecord.skypeId || ''} onChange={this.handleFormChange} />
					</div> )
				: ( <span className='ro-field col-md-3'><b>Skype Id:</b> {(this.canViewDetails) ? userRecord.skypeId : ''}</span> )
			}
			</div>
			<div className='row bordered'>
			{
				(this.canEditContent)
				? ( <div className='form-group col-md-8'>
						<label htmlFor='address'>Address</label>
						<input type='text' id='address' name='address' placeholder='Address' className='form-control'
							value={userRecord.address || ''} onChange={this.handleFormChange} />
					</div> )
				: ( <span className='ro-field col-md-9'><b>Address:</b> {(this.canViewDetails) ? userRecord.address : ''}</span> )
			}
			{
				(this.canEditContent)
				? ( <div className='form-group col-md-4'>
						<label htmlFor='zipCode'>Zip Code</label>
						<input type='text' id='zipCode' name='zipCode' placeholder='Zip Code' className='form-control'
							value={userRecord.zipCode || ''} onChange={this.handleFormChange} />
					</div> )
				: ( <span className='ro-field col-md-3'><b>Zip Code:</b> {(this.canViewDetails) ? userRecord.zipCode : ''}</span> )
			}
			</div>
			<div className='row btn-row bordered'>
				<button type='button' className='btn list-item-btn' onClick={() => this.resetForm()}>Reset Form</button>
				{	(!this.isNewRecord)
					?	(<button type='button' className='btn btn-danger' onClick={() => this.delUser()}>Delete User</button>)
					: null
				}
				<button type='button' className='btn btn-success' onClick={() => this.persistForm()}>Save User</button>
			</div>
			</form>
			</section>
		);
	} // render()
} // class User

User.propTypes = {
	params: React.PropTypes.object,
	location: React.PropTypes.object,
	userRecord: React.PropTypes.shape({
		_id: React.PropTypes.string.isRequired,
		username: React.PropTypes.string.isRequired,
		password: React.PropTypes.string.isRequired,
		nameFirst: React.PropTypes.string,
		nameLast: React.PropTypes.string,
		nameOther: React.PropTypes.string,
		photo: React.PropTypes.any,
		dateOfBirth: React.PropTypes.any,
		phone: React.PropTypes.string,
		mobile: React.PropTypes.string,
		email: React.PropTypes.string,
		skypeId: React.PropTypes.string,
		address: React.PropTypes.string,
		zipCode: React.PropTypes.string
	}),
	userRecordId: React.PropTypes.string,
	userClass: React.PropTypes.oneOf([null, '', 'generic', 'admin']),
	userId: React.PropTypes.string
};

User.contextTypes = {
	UserService: React.PropTypes.object,
	router: React.PropTypes.object
};
