'use strict';

import React from 'react';
import { Glyphicon } from 'react-bootstrap';

export default class Contact extends React.Component {
    constructor(props, context) {
        super(props, context);

        // Init state --> equivalent to getInitialState() in React.createClass()
        this.state = {
            contact: {},
            contactId: null,
            userId: null,
            userClass: null
        };

        this.render = this.render.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }   // constructor()

    handleFormChange(e) {
        let curContactState = this.state.contact;

        curContactState[e.target.name] = e.target.value;
        this.setState({ contact: curContactState });
    }   // handleFormChange()

    componentWillMount() {
        let curContactId = null;
        let curUserId = null;
        let curUserClass = null;

        if (this.props.params && this.props.params.contactId) {
            curContactId = this.props.params.contactId;
        }

        if (this.props.location && this.props.location.query) {
            if (this.props.location.query.userClass) {
                if (this.props.location.query.userClass === 'generic')
                    curUserClass = 'generic';
                if (this.props.location.query.userClass === 'admin')
                    curUserClass = 'admin';
            }

            if (this.props.location.query.userId) {
                curUserId = this.props.location.query.userId;
            }
        }

        this.setState({ contactId: curContactId, userId: curUserId, userClass: curUserClass });
    }   // componentWillMount()

    componentDidMount() {
        let curContactData = null;

        if (this.state.userClass && this.state.contactId) {
            this.context.ContactService.getContactById(this.state.contactId)
                .then((contactData) => {
                    if (contactData) {
                        this.setState({ contact: contactData });
                    }
                });
        } else {
            curContactData = {
                // init to user defaults:
                _id: null,
                title: null,
                namesFirst: null,
                namesLast: null,
                namesOther: null,
                photo: null,
                dateOfBirth: null,
                phone: null,
                mobile: null,
                email: null,
                skypeId: null,
                country: null,
                city: null,
                address: null,
                zipCode: null,
                company: null,
                companyWebSite: null
            };

            this.setState({ contact: curContactData });
        }
    } // componentDidMount()

    render() {
        let userClass = this.state.userClass;
        let contact = this.state.contact;

        return (
            <section id='contact'>
            <div><h1 className='component-head'><Glyphicon glyph="hand-right" /> Create New Contact</h1></div>

            <form role='form' className='form-group'>
            <div className='row bordered'>
            {
                (userClass === 'generic' || userClass === 'admin')
                ? ( <div className='form-group col-md-4'>
                        <label htmlFor='namesFirst' className='em12'>First Name</label>
                        <input type='text' id='namesFirst' name='name-first' placeholder='First Name' className='form-control'
                            value={contact.namesFirst || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span>First Name: {contact.namesFirst || ''}</span> )
            }
            {
                (userClass === 'generic' || userClass === 'admin')
                ? ( <div className='form-group col-md-4'>
                        <label htmlFor='namesLast' className='em12'>Last Name</label>
                        <input type='text' id='namesLast' name='name-last' placeholder='Last Name' className='form-control'
                            value={contact.namesLast || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span>Last Name: {contact.namesLast}</span> )
            }
            {
                (userClass === 'generic' || userClass === 'admin')
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='namesOther'>Other Names</label>
                        <input type='text' id='namesOther' name='names-other' placeholder='Other Names' className='form-control'
                            value={contact.namesOther || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span>Other Names: {contact.namesOther}</span> )
            }
            {
                (userClass === 'generic' || userClass === 'admin')
                ? ( <div className='form-group col-md-1'>
                        <label htmlFor='title' className='em12'>Title</label>
                        <input type='text' id='title' name='title' placeholder='Title' className='form-control'
                            value={contact.title || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span>Title: {contact.title || ''}</span> )
            }
            </div>
            <div className='row bordered'>
            {
                (userClass === 'generic' || userClass === 'admin')
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='phone'>Phone</label>
                        <input type='text' id='phone' name='phone' placeholder='Phone' className='form-control'
                            value={contact.phone || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span>Phone: {contact.phone}</span> )
            }
            {
                (userClass === 'generic' || userClass === 'admin')
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='mobile'>Mobile</label>
                        <input type='text' id='mobile' name='mobile' placeholder='Mobile' className='form-control'
                            value={contact.mobile || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span>Mobile: {contact.mobile}</span> )
            }
            {
                (userClass === 'generic' || userClass === 'admin')
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='text' id='email' name='email' placeholder='Email' className='form-control'
                            value={contact.email || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span>Email: {contact.email}</span> )
            }
            {
                (userClass === 'generic' || userClass === 'admin')
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='skypeId'>Skype Id</label>
                        <input type='text' id='skypeId' name='skype' placeholder='Skype' className='form-control'
                            value={contact.skypeId || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span>Skype Id: {contact.skypeId}</span> )
            }
            </div>
            <div className='row bordered'>
            {
                (userClass === 'generic' || userClass === 'admin')
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='country'>Country</label>
                        <input type='text' id='country' name='country' placeholder='Country' className='form-control'
                            value={contact.country || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span>Country: {contact.country}</span> )
            }
            {
                (userClass === 'generic' || userClass === 'admin')
                ? ( <div className='form-group col-md-3'>
                        <label htmlFor='city'>City</label>
                        <input type='text' id='city' name='city' placeholder='City' className='form-control'
                            value={contact.city || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span>City: {contact.city}</span> )
            }
            </div>
            <div className='row bordered'>
            {
                (userClass === 'generic' || userClass === 'admin')
                ? ( <div className='form-group col-md-10'>
                        <label htmlFor='address'>Address</label>
                        <input type='text' id='address' name='address' placeholder='Address' className='form-control'
                            value={contact.address || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span>Address: {contact.address}</span> )
            }
            {
                (userClass === 'generic' || userClass === 'admin')
                ? ( <div className='form-group col-md-2'>
                        <label htmlFor='zipCode'>Zip Code</label>
                        <input type='text' id='zipCode' name='zipCode' placeholder='Zip Code' className='form-control'
                            value={contact.zipCode || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span>Zip Code: {contact.zipCode}</span> )
            }
            </div>
            <div className='row bordered'>
            {
                (userClass === 'generic' || userClass === 'admin')
                ? ( <div className='form-group col-md-4'>
                        <label htmlFor='company'>Company Name</label>
                        <input type='text' id='company' name='company' placeholder='Company' className='form-control'
                            value={contact.company || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span>Company Name: {contact.company}</span> )
            }
            {
                (userClass === 'generic' || userClass === 'admin')
                ? ( <div className='form-group col-md-4'>
                        <label htmlFor='companyWebSite'>Web Site</label>
                        <input type='text' id='companyWebSite' name='companyWebSite' placeholder='Web Site' className='form-control'
                            value={contact.companyWebSite || ''} onChange={this.handleFormChange} />
                    </div> )
                : ( <span>Web Site: {contact.companyWebSite}</span> )
            }
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
        nameFirst: React.PropTypes.string,
        nameLast: React.PropTypes.string,
        nameOther: React.PropTypes.string,
        photo: React.PropTypes.any,
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
    userClass: React.PropTypes.oneOf([null, '', 'generic', 'admin']),
    userId: React.PropTypes.string
};

Contact.contextTypes = {
    ContactService: React.PropTypes.object,
    router: React.PropTypes.object
};