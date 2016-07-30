import React from 'react';
import { Link } from 'react-router';

import $ from 'jquery';
window.jQuery = $;
import { Glyphicon } from 'react-bootstrap';

// const Navigation = ({children}, context) => {
  const Navigation = () => {

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">    
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" onlyActiveOnIndex={true} to="/"><img id='logo' className='img-rounded'
            src={'/assets/images/contacts.jpg'} width="100" height="60" /></Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/"><Glyphicon glyph="home" /> Home<span className="sr-only">(current)</span></Link></li>
            <li><Link activeClassName='active' to={{ pathname: '/contacts', query: { userClass: 'generic' } }}>Contacts</Link></li>
            <li><Link activeClassName='active' to={{ pathname: '/contact', query: { userClass: 'generic' } }}>Add Contact</Link></li>
            <li><Link activeClassName='active' to={{ pathname: '/search', query: { userClass: 'generic' } }}>Search Contacts</Link></li>
            <li><Link activeClassName='active' to={{ pathname: '/users', query: { userClass: 'generic' } }}>Users</Link></li>
            <li className="dropdown">
              <Link to="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                My Dropdown<span className="caret"></span></Link>
              <ul className="dropdown-menu">
                <li><Link activeClassName='active' to={{ pathname: '/home', query: { userClass: 'generic' } }}>Home</Link></li>
                <li><Link activeClassName='active' to={{ pathname: '/contacts', query: { userClass: 'generic' } }}>Contacts</Link></li>
                <li><Link activeClassName='active' to={{ pathname: '/contact', query: { userClass: 'generic' } }}>Add Contact</Link></li>
                <li><Link activeClassName='active' to="/user">User Profile</Link></li>
                <li><Link activeClassName='active' to={{ pathname: '/users', query: { userClass: 'generic' } }}>Users</Link></li>
                <li role="separator" className="divider"></li>
                <li><Link activeClassName='active' to={{ pathname: '/about', query: { userClass: 'generic' } }}>About</Link></li>
              </ul>
            </li>
          </ul>
          <form className="navbar-form navbar-left">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search" />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <li><Link activeClassName='active' to={{ pathname: '/about', query: { userClass: 'generic' } }}>About</Link></li>
            <li className="dropdown">
              <Link to="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></Link>
              <ul className="dropdown-menu">
                <li><Link to="/" activeClassName='active'>Home</Link></li>
                <li><Link activeClassName='active' to={{ pathname: '/contacts', query: { userClass: 'generic' } }}>Contacts</Link></li>
                <li><Link activeClassName='active' to={{ pathname: '/contact', query: { userClass: 'generic' } }}>Add Contact</Link></li>
                <li><Link activeClassName='active' to={{ pathname: '/users', query: { userClass: 'generic' } }}>Users</Link></li>
                <li role="separator" className="divider"></li>
                <li><Link activeClassName='active' to={{ pathname: '/about', query: { userClass: 'generic' } }}>About</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
} // class Navigation

Navigation.propTypes = {
  children: React.PropTypes.node
};

Navigation.contextTypes = {
  router: React.PropTypes.object
};

export default Navigation;