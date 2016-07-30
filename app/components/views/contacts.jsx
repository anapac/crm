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
            userClass: null,
            userId: null
        };

        this.render = this.render.bind(this);
    } // constructor()

    showContactDetails(contactId) {
        let targetPath = `/contacts/${contactId}`;
        let curUserClass = this.state.userClass || null;

        this.context.router.push({ pathname: targetPath, query: { userClass: curUserClass } });
    }   // showUserDetails()

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
                            to={{ pathname: `/contacts/${contact._id}`, query: { userClass: userClass || null } }}>
                            <b>{contact.namesLast}, {contact.namesFirst} {contact.namesOther}</b></Link>
                    </div>
                    <div className='col-md-6 names'>
                        <p className='list-item-text'>phone: {contact.phone}, mobile: {contact.mobile},<br />email: {contact.email}</p>
                    </div>
                    <div className='col-md-2 buttons'>
                    {
                        (userClass === 'generic' || userClass === 'admin')
                        ? (<button type='button' className='btn btn-primary list-item-btn'
                            onClick={() => this.showContactDetails(contact._id)}>    Details</button>)
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