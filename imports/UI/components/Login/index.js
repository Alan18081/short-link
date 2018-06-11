import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

export default class Login extends Component {
    state = {
        errors: [],
        email: '',
        password: ''
    };
    onSubmit = event => {
        event.preventDefault();
        this.setState({
            errors: []
        });
        if (!this.state.email) {
            this.setState({
                errors: this.state.errors.push('Provide email')
            });
            return false;
        }
        if (!this.state.password) {
            this.setState({
                errors: this.state.errors.push('Provide password')
            });
            return false;
        }
        Meteor.loginWithPassword({email: this.state.email},this.state.password,err => {
            console.log('User created');
        });
    };

    render() {
        return (
            <div className="box-view">
              <div className="box-view__box">
                  <form className="box-view__form" onSubmit={this.onSubmit}>
                      <h1>Short Link</h1>
                      <input
                        type="email"
                        value={this.state.email}
                        onChange={e => this.setState({email: e.target.value})}
                        placeholder="Email"
                      />
                      <input
                        type="password"
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})}
                        placeholder="Password"
                      />
                      <ul>
                        {this.state.errors.map(msg => (
                          <li>{msg}</li>
                        ))}
                      </ul>
                      <button className="button button_fluid">Login</button>
                      <button className="button button_link">Create account</button>
                  </form>
              </div>
            </div>
        );
    }
}