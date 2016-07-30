import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }   // constructor()

    render() {
        return (
            <section id='home'>
                <ReactCSSTransitionGroup
                        transitionName="animation"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}>
                <div className='login-container col-md-4' key='login-container'>
                    <div className="card card-container" key='card-container'>
                        <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" key='profile-img' />
                        <p id="profile-name" className="profile-name-card" key='profile-name'></p>
                        <form className="form-signin" key='form-signin'>
                            <span id="reauth-email" className="reauth-email" key='reauth-email'></span>
                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" key='inputEmail' required autoFocus />
                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" key='inputPassword' required />
                            <div id="remember" className="checkbox" key='remember'>
                                <label key='checkbox-label'>
                                    <input type="checkbox" value="remember-me" key='remember-me' /> Remember me
                                </label>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit" key='submit-btn'>Sign in</button>
                        </form>
                        <Link to="#" className="forgot-password" key='forgot-password-link'>
                            Forgot the password?
                        </Link>
                    </div>
                </div>
                </ReactCSSTransitionGroup>
                <div className='jumbotron'>
                    <h1>Home / Login</h1>
                    <p>This is the entry component</p>
                </div>
            </section>
        );
    }   // render()
}   // class Home