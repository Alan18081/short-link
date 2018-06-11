import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';

export default (WrappedComponent) => {
    return class extends Component {
        componentDidMount() {
            if(!Meteor.userId()) {
                this.props.history.push('/login');
            }
        }
        render() {
            return <WrappedComponent {...this.props}/>
        }
    }
}