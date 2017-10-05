import React, { Component } from 'react';
import Conversion from './Conversion';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="g">
        <div className="g-col g-span10 g-span6--mid g-col--centered">
          <Conversion />
        </div>
      </div>
    );
  }
}

export default App;
