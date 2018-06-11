import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import App from '../imports/UI/App';

Meteor.startup(() => {
  Tracker.autorun(() => {
    Session.set('showVisible',true);
    ReactDOM.render(<App/>,document.getElementById('app'));
  });
});
