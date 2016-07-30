import React from 'react';
import { Glyphicon } from 'react-bootstrap';

export default class Footer extends React.Component {
	render() {
		return (
			<footer className='footer'>
				<div className='div'>
					<p className='span3 offset6 footer-text'><em>Copyleft <Glyphicon glyph="copyright-mark" /> anapac</em></p>
				</div>
			</footer>
		);
	}
}