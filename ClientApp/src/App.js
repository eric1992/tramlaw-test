import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Search } from './components/Search';
import { Detail } from './components/Detail';
import { Home } from './components/Home';
import './App.css';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/Search' component={Search} />
        <Route path='/Detail/:itemId' component={Detail} />
      </Layout>
    );
  }
}
