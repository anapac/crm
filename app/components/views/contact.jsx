'use strict';

import React from 'react';
import $ from 'jquery';
window.jQuery = $;
import { Glyphicon } from 'react-bootstrap';

export default class Contact extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.canViewDetails = null;
		this.canEditContent = null;
		this.canCreateContent = null;
		this.isNewRecord = null;

        // Init state --> equivalent to getInitialState() in React.createClass()
        this.state = {
			initialContactRecord: null,
            contactRecord: {},
            contactRecordId: null,
            userId: null,
            userClass: null
        };

        this.render = this.render.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }   // constructor()

    resetForm() {
		this.setState({ userRecord: this.state.initialUserRecord });
	}	// resetForm()

	persistForm() {
		let curContactRecordId = this.state.contactRecordId;

		this.setState({ initialContactRecord: this.state.contactRecord });

		if (curContactRecordId) {
			this.context.ContactService.updateContactById(curContactRecordId, this.state.contactRecord)
				.then(() => {
					this.context.router.push({
						pathname: '/contacts',
						query: {
							userId: this.state.userId,
							userClass: this.state.userClass
						}
					});
				});
		} else {
			this.context.ContactService.createContact(this.state.contactRecord)
				.then(() => {
					this.context.router.push({
						pathname: '/contacts',
						query: {
							userId: this.state.userId,
							userClass: this.state.userClass
						}
					});
				})
		}
	}	// persistForm()

	delContact() {
		let curContactRecordId = this.state.contactRecordId;

		this.setState({ initialContactRecord: this.state.contactRecord });

		if (curContactRecordId) {
			this.context.ContactService.deleteContactById(curContactRecordId)
				.then(() => {
					this.context.router.push({
						pathname: '/contacts',
						query: {
							userId: this.state.userId,
							userClass: this.state.userClass
						}
					});
				});
		} else {
			// TODO: MODAL Message!
		}
	}	// delContact()

	handleCreate() {
		let curContactRecordState = this.state.contactRecord || {};

		if (curContactRecordState) {
			this.context.ContactService.createContact(this.state.contactRecordId)
				.then((contactData) => {
					if (contactData) {
						this.setState({ contactRecord: contactData });
					}
			});
		}
	}	// handleCreate()

	handleFormChange(e) {
		let curContactRecordState = this.state.contactRecord;
		console.info(`${e.target.name} - ${e.target.value}`)
		curContactRecordState[e.target.name] = e.target.value;
		this.setState({ contactRecord: curContactRecordState });
	}	// handleFormChange()

    componentWillMount() {
        let userId = null;
		let userClass = null;
		let contactRecordId = null;

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

		// Init contactRecordId:
		if (this.props.contactRecordId) {
			contactRecordId = this.props.contactRecordId;
			this.isNewRecord = false;
		} else if (this.props.location && this.props.location.query && this.props.location.query.contactRecordId) {
			contactRecordId = this.props.location.query.contactRecordId;
			this.isNewRecord = false;
		} else {
			if (this.props.params.contactRecordId && this.props.params.contactRecordId !== 'new') {
				contactRecordId = this.props.params.contactRecordId;
				this.isNewRecord = false;
			} else {
				contactRecordId = null;
				this.isNewRecord = true;
			}
		}

        this.setState({
			userId: userId,
			userClass: userClass,
			contactRecordId: contactRecordId
        });
    }   // componentWillMount()

    componentDidMount() {
        let contactRecord = {};

        // Init contactRecord:
        if (this.state.userClass && this.state.contactRecordId) {
            this.context.ContactService.getContactById(this.state.contactRecordId)
                .then((contactData) => {
                    if (contactData) {
                        this.setState({ contactRecord: contactData });
                    }
                });
        } else {
            contactRecord = {
                // fall back to contact defaults:
                _id: null,
                title: '',
                namesFirst: '',
                namesLast: '',
                namesOther: '',
                dateOfBirth: new Date().toISOString(),
                phone: '',
                mobile: '',
                email: '',
                skypeId: '',
                country: '',
                city: '',
                address: '',
                zipCode: '',
                company: '',
                companyWebSite: ''
            };

            this.setState({ contactRecord: contactRecord });
        }
    } // componentDidMount()

    render() {
        // let userClass = this.state.userClass;
        let contactRecord = this.state.contactRecord;
        console.info(`${JSON.stringify(this.state.contactRecord)}`);

        return (
            <section id='contact'>
            <div><h1 className='component-head'><Glyphicon glyph="hand-right" /> Manage Contacts</h1></div>

            <form role='form' className='form-group'>
            <div className='row bordered'>
            {
                (this.canEditContent)
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='namesFirst'>First Name</label>
                        <input type='text' id='namesFirst' name='namesFirst' placeholder='First Name' className='form-control'
                            value={contactRecord.namesFirst || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span className='ro-field col-md-3'><b>First Name:</b> {contactRecord.namesFirst || ''}</span> )
            }
            {
                (this.canEditContent)
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='namesLast'>Last Name</label>
                        <input type='text' id='namesLast' name='namesLast' placeholder='Last Name' className='form-control'
                            value={contactRecord.namesLast || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span className='ro-field col-md-3'><b>Last Name:</b> {contactRecord.namesLast}</span> )
            }
            {
                (this.canEditContent)
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='namesOther'>Other Names</label>
                        <input type='text' id='namesOther' name='namesOther' placeholder='Other Names' className='form-control'
                            value={contactRecord.namesOther || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span className='ro-field col-md-3'><b>Other Names:</b> {contactRecord.namesOther}</span> )
            }
            {
                (this.canEditContent)
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='title' className='em12'>Title</label>
                        <input type='text' id='title' name='title' placeholder='Title' className='form-control'
                            value={contactRecord.title || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span className='ro-field col-md-3'><b>Title:</b> {contactRecord.title || ''}</span> )
            }
            </div>
            <div className='row bordered'>
            {
                (this.canEditContent)
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='phone'>Phone</label>
                        <input type='text' id='phone' name='phone' placeholder='Phone' className='form-control'
                            value={contactRecord.phone || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span className='ro-field col-md-3'><b>Phone:</b> {contactRecord.phone}</span> )
            }
            {
                (this.canEditContent)
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='mobile'>Mobile</label>
                        <input type='text' id='mobile' name='mobile' placeholder='Mobile' className='form-control'
                            value={contactRecord.mobile || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span className='ro-field col-md-3'><b>Mobile:</b> {contactRecord.mobile}</span> )
            }
            {
                (this.canEditContent)
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='text' id='email' name='email' placeholder='Email' className='form-control'
                            value={contactRecord.email || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span className='ro-field col-md-3'><b>Email:</b> {contactRecord.email}</span> )
            }
            {
                (this.canEditContent)
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='skypeId'>Skype Id</label>
                        <input type='text' id='skypeId' name='skypeId' placeholder='Skype' className='form-control'
                            value={contactRecord.skypeId || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span className='ro-field col-md-3'><b>Skype Id:</b> {contactRecord.skypeId}</span> )
            }
            </div>
            <div className='row bordered'>
            {
                (this.canEditContent)
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='country'>Country</label>
                        <input type='text' id='country' name='country' placeholder='Country' className='form-control'
                            value={contactRecord.country || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span className='ro-field col-md-3'><b>Country:</b> {contactRecord.country}</span> )
            }
            {
                (this.canEditContent)
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='city'>City</label>
                        <input type='text' id='city' name='city' placeholder='City' className='form-control'
                            value={contactRecord.city || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span className='ro-field col-md-3'><b>City:</b> {contactRecord.city}</span> )
            }
            </div>
            <div className='row bordered'>
            {
                (this.canEditContent)
                ? ( <div className='form-group col-md-9'>
                        <label htmlFor='address'>Address</label>
                        <input type='text' id='address' name='address' placeholder='Address' className='form-control'
                            value={contactRecord.address || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span className='ro-field col-md-9'><b>Address:</b> {contactRecord.address}</span> )
            }
            {
                (this.canEditContent)
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='zipCode'>Zip Code</label>
                        <input type='text' id='zipCode' name='zipCode' placeholder='Zip Code' className='form-control'
                            value={contactRecord.zipCode || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span className='ro-field col-md-3'><b>Zip Code:</b> {contactRecord.zipCode}</span> )
            }
            </div>
            <div className='row bordered'>
            {
                (this.canEditContent)
                ? ( <div className='form-group col-md-6'>
                        <label htmlFor='company'>Company Name</label>
                        <input type='text' id='company' name='company' placeholder='Company' className='form-control'
                            value={contactRecord.company || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span className='ro-field col-md-6'><b>Company Name:</b> {contactRecord.company}</span> )
            }
            {
                (this.canEditContent)
                ? ( <div className='form-group col-md-6'>
                        <label htmlFor='companyWebSite'>Web Site</label>
                        <input type='text' id='companyWebSite' name='companyWebSite' placeholder='Web Site' className='form-control'
                            value={contactRecord.companyWebSite || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span className='ro-field col-md-6'><b>Web Site:</b> {contactRecord.companyWebSite}</span> )
            }
            </div>
            <div className='row btn-row bordered'>
				<button type='button' className='btn list-item-btn' onClick={() => this.resetForm()}>Reset Form</button>
				{	(!this.isNewRecord)
					?	(<button type='button' className='btn btn-danger' onClick={() => this.delContact()}>Delete Contact</button>)
					: null
				}
				<button type='button' className='btn btn-success' onClick={() => this.persistForm()}>Save Contact</button>
			</div>
            </form>
            </section>
        );
    }   // render()
}   // class Contact

Contact.propTypes = {
    params: React.PropTypes.object,
    location: React.PropTypes.object,
    contact: React.PropTypes.shape({
        _id: React.PropTypes.string.isRequired,
        title: React.PropTypes.string,
        namesFirst: React.PropTypes.string,
        namesLast: React.PropTypes.string,
        namesOther: React.PropTypes.string,
        dateOfBirth: React.PropTypes.any,
        phone: React.PropTypes.string,
        mobile: React.PropTypes.string,
        email: React.PropTypes.string,
        skypeId: React.PropTypes.string,
        country: React.PropTypes.string,
        city: React.PropTypes.string,
        address: React.PropTypes.string,
        zipCode: React.PropTypes.string,
        company: React.PropTypes.string,
        companyWebSite: React.PropTypes.string
    }),
    contactRecordId: React.PropTypes.string,
    userClass: React.PropTypes.oneOf([null, '', 'generic', 'admin']),
    userId: React.PropTypes.string
};

Contact.contextTypes = {
    ContactService: React.PropTypes.object,
    router: React.PropTypes.object
};