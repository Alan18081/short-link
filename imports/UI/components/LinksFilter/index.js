import React, {Component} from 'react';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

export default class LinksFilter extends Component {
  state = {
    showVisible: false
  };
  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      this.setState({
        showVisible: Session.get('showVisible')
      })
    });
  }
  componentWillUnmount() {
    this.tracker.stop();
  }
  change = e => {
    Session.set('showVisible',!e.target.checked);
  };
  render() {
    return (
      <div className="link-filter">
        <label>
          <input
            type="checkbox"
            checked={!this.state.showVisible}
            onChange={this.change}/>
          Show hidden links
        </label>
      </div>
    );
  }
}