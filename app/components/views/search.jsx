import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Glyphicon } from 'react-bootstrap';

export default class SearchContacts extends React.Component {
    constructor(props) {
        super(props);

        // Init state --> equivalent to getInitialState() in React.createClass()
        this.state = {
            contacts: [],
            searchData: {},
            userId: null,
            userClass: null
        };

        this.render = this.render.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    } // constructor()

    handleFormChange(e) {
        let curSearchState = this.state.searchData;
        curSearchState[e.target.id] = e.target.value;
        this.setState({ searchData: curSearchState });
    }   // handleFormChange()

    showContactDetails(contactId) {
        let targetPath = `/contacts/${contactId}`;
        let curUserClass = this.state.userClass || null;

        this.context.router.push({ pathname: targetPath, query: { userClass: curUserClass } });
    }   // showUserDetails()

    handleSearch() {
        console.info(`[ handleSearch ] this.state.searchData ==> ${JSON.stringify(this.state.searchData)}`);

        let curData = this.state.searchData || null;
        let curDataItemsFound = 0;

        if (curData) {
            curDataItemsFound += (curData.strName) ? 1 : 0;
            curDataItemsFound += (curData.strPhones) ? 1 : 0;
            curDataItemsFound += (curData.strEmail) ? 1 : 0;
            curDataItemsFound += (curData.strCity) ? 1 : 0;
            curDataItemsFound += (curData.strCountry) ? 1 : 0;
        }

        console.info(`[ handleSearch ] curDataItemsFound ==> ${curDataItemsFound}`);

        if (curDataItemsFound > 0) {
            curData.strName = curData.strName || '';
            curData.strPhones = curData.strPhones || '';
            curData.strEmail = curData.strEmail || '';
            curData.strCity = curData.strCity || '';
            curData.strCountry = curData.strCountry || '';

            this.context.ContactService.getSearchContacts(curData).then((contacts) => {
            if (contacts && contacts.length > 0) {
                this.setState({ contacts: contacts });
            }
        });
        }
    }   // handleSearch()

    componentWillMount() {
        let curUserId = null;
        let curUserClass = null;

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

        this.setState({ userId: curUserId, userClass: curUserClass });
    }   // componentWillMount()

    // componentDidMount() {

    // }   // componentDidMount()

    render() {
        /*  Search on:
            names (namesFirst, namesLast, namesOther); phone; mobile; email; country; city;
        */
        let userClass = this.state.userClass || '';

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
                <h1 className='component-head'><Glyphicon glyph="hand-right" /> Search Contacts</h1>

                <div id='list' className='list-group list-container'>
                    <form role='form' className='form-group'>
                        <div className='row list-row'>
                            <div className='form-group col-md-12'>
                                <label htmlFor='strName' className='col-md-2'>Search in Names</label>
                                <input type='text' className='form-control col-md-*' id='strName' placeholder='Names' 
                                    onChange={this.handleFormChange} />
                            </div>
                        </div>
                        <div className='row list-row'>
                            <div className='form-group col-md-12'>
                                <label htmlFor='strPhones' className='col-md-2'>Search in Phones Details</label>
                                <input type='text' className='form-control col-md-*' id='strPhones' placeholder='Phones' 
                                    onChange={this.handleFormChange} />
                            </div>
                        </div>
                        <div className='row list-row'>
                            <div className='form-group col-md-12'>
                                <label htmlFor='strEmail' className='col-md-2'>Search in Emails</label>
                                <input type='text' className='form-control col-md-*' id='strEmail' placeholder='Emails' 
                                    onChange={this.handleFormChange} />
                            </div>
                        </div>
                        <div className='row list-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor='strCity' className='col-md-6'>Search by City</label>
                                <input type='text' className='form-control col-md-*' id='strCity' placeholder='Cities' 
                                    onChange={this.handleFormChange} />
                            </div>
                            <div className='form-group col-md-6'>
                                <label htmlFor='strCountry' className='col-md-6'>Search by Country</label>
                                <input type='text' className='form-control col-md-*' id='strCountry' placeholder='Countries'
                                    onChange={this.handleFormChange} />
                            </div>
                        </div>
                        <div id='btn-container' className='row button'>
                            <button type='button' className='btn btn-success btn-search' onClick={() => this.handleSearch()}>
                                <Glyphicon glyph="search" /> Search
                            </button>
                        </div>
                    </form>
                </div>

                {
                    (this.state.contacts.length > 0)
                    ? ( <div id='list' className='list-group list-container'>
                        <ReactCSSTransitionGroup
                            transitionName="animation"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}>
                            {contactNodes}
                        </ReactCSSTransitionGroup>
                        </div> )
                    : null
                }
            </div>
        );
    }   // render()
}   // class SearchContacts

SearchContacts.propTypes = {
    params: React.PropTypes.object,
    query: React.PropTypes.object,
    location: React.PropTypes.object,
    userClass: React.PropTypes.oneOf([null, '', 'generic', 'admin'])
};

SearchContacts.contextTypes = {
    ContactService: React.PropTypes.object,
    router: React.PropTypes.object
}