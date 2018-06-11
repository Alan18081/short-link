import React, {Component} from 'react';
import {Tracker} from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import {Links} from '../../../api/links';
import {Session} from 'meteor/session';

import LinksList from '../LinksList';
import PrivateHeader from '../PrivateHeader';
import AddLink from '../AddLink';
import LinksFilter from '../LinksFilter';

export default class LinksContainer extends Component {
  state = {
    links: []
  };
  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({links});
    });
  }
  componentWillUnmount() {
    this.linksTracker.stop();
  }
  render() {
    return (
      <div>
        <PrivateHeader title="Your links"/>
        <div className="container">
          <LinksFilter/>
          <LinksList links={this.state.links}/>
          <AddLink/>
        </div>
      </div>
    )
  }
}