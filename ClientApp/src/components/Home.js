import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div className={'appFont'}>
        <p>Welcome to Tramlaw, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
          <li><a href='https://developer.walmartlabs.com/'>Walmart open api</a> for data access layer</li>
        </ul>
        <p>Click on the Search link at the top of the screen to begin.</p>
      </div>
    );
  }
}
