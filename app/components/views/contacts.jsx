'use strict';

import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Glyphicon } from 'react-bootstrap';

export default class Contacts extends React.Component {
    constructor(props) {
        super(props);

        // Init state --> equivalent to getInitialState() in React.createClass()
        this.state = {
            contacts: [],
            userId: null,
            userClass: null
        };

        this.render = this.render.bind(this);
        this.showContactDetails = this.showContactDetails.bind(this);
        this.createNewContact = this.createNewContact.bind(this);
        this.delContact = this.delContact.bind(this);
    } // constructor()

    showContactDetails(contactId, setUserClassTo) {
        let targetPath = `/contacts/${contactId}`;

        this.context.router.push({ pathname: targetPath, query: { userId: this.state.userId, userClass: setUserClassTo } });
    }   // showContactDetails()

    createNewContact() {
        let targetPath = '/contacts/new';
        let setUserClassTo = 'admin';

        this.context.router.push({ pathname: targetPath, query: { userId: this.state.userId, userClass: setUserClassTo } });
    }   // createNewContact()

    delContact(contactId, setUserClassTo) {
        let targetPath = `/contacts/${contactId}`;

        if (contactId) {
            this.context.ContactService.deleteContactById(contactId)
                .then(() => {
                    this.context.router.push({
                        pathname: '/contacts',
                        query: {
                            userId: this.state.userId,
                            userClass: setUserClassTo
                        }
                    });
                });
        }

        this.context.router.push({ pathname: targetPath, query: { userId: this.state.userId, userClass: setUserClassTo } });
    }   // delContact()

    componentWillMount() {
        let curUserClass = null;

        if (this.props.location && this.props.location.query && this.props.location.query.userClass) {
            curUserClass = this.props.location.query.userClass;
        }

        this.setState({ userClass: curUserClass });
    }   // componentWillMount()

    componentDidMount() {
        this.context.ContactService.getContacts().then((contacts) => {
            if (contacts && contacts.length > 0) {
                this.setState({ contacts: contacts });
            }
        });
    }   // componentDidMount()

    render() {
        let userClass = this.state.userClass;

        let contactNodes = this.state.contacts.map((contact) => {
            return (
                <div className='row list-row' key={contact._id}>
                    <div className='col-md-4 contactname'>
                        <Link id={contact._id} className='list-group-item'
                            to={{ pathname: `/contacts/${contact._id}`, query: { userId: this.state.userId, userClass: 'generic' } }}>
                            <b>{contact.namesLast}, {contact.namesFirst} {contact.namesOther}</b></Link>
                    </div>
                    <div className='col-md-5 names'>
                        <p className='list-item-text'>phone: {contact.phone}, mobile: {contact.mobile},<br />email: {contact.email}</p>
                    </div>
                    <div className='col-md-3 buttons'>
                    {
                        (userClass === 'generic' || userClass === 'admin')
                        ? (<button type='button' className='btn btn-primary list-item-btn'
                            onClick={() => this.showContactDetails(contact._id, 'admin')}><Glyphicon glyph="zoom-in" /> Details</button>)
                        : (' ')
                    }
                    {
                        (userClass === 'generic' || userClass === 'admin')
                        ? ( <button type='button' className='btn btn-danger list-item-btn'
                            onClick={() => this.delContact(contact._id, 'admin')}>Delete Contact</button> )
                        : (' ')
                    }
                    </div>
                </div>
            );
        });

        return (
                <div>
                    <h1 className='component-head'><Glyphicon glyph="hand-right" /> Contacts</h1>
                    <div id='list' className='list-group list-container' key={'_' + contactNodes._id}>
                    <ReactCSSTransitionGroup
                        transitionName="animation"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}>
                        {contactNodes}
                    </ReactCSSTransitionGroup>
                    </div>
                    <div className='btn-row bordered'>
                        <button type='button' className='btn btn-default'
                            onClick={() => this.createNewContact()}>New Contact</button>
                    </div>
                </div>
        );
    } // render()
} // Contacts

Contacts.propTypes = {
    params: React.PropTypes.object,
    query: React.PropTypes.object,
    location: React.PropTypes.object,
    userClass: React.PropTypes.oneOf([null, '', 'generic', 'admin'])
};

Contacts.contextTypes = {
    ContactService: React.PropTypes.object,
    router: React.PropTypes.object
}