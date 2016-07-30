'use strict';

import React from 'react';
import { Glyphicon } from 'react-bootstrap';

export default class About extends React.Component {
  render() {
    return (
      <section id='about'>
        <div>
          <h1 className='component-head'><Glyphicon glyph="hand-right" /> About</h1>
          <p>About component</p>
        </div>
      </section>
    );
  }
}