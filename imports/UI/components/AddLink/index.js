import React, {Component} from 'react';
import Modal from 'react-modal';

export default class AddLink extends Component {
  state = {
    value: '',
    shown: false,
    error: null
  };
  input = React.createRef();
  submit = event => {
    event.preventDefault();
    const value = this.state.value;
    if(value) {
      Meteor.call('links.create',value,err => {
        if(err) {
          this.setState({
            error: err.reason
          });
        }
        else {
          this.setState({
            value: '',
            shown: false
          })
        }
      });
    }
  };
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({shown: true})}>Add link</button>
        <Modal
          isOpen={this.state.shown}
          contentLabel="Add new link"
          onAfterOpen={() => {
            this.input.current.focus();
          }}
          className="box-view__box"
          overlayClassName="box-view box-view_modal"
        >
          <form onSubmit={this.submit}>
            <h2>Add link</h2>
            <input
              ref={this.input}
              type="text"
              onChange={e => this.setState({value: e.target.value})}
              value={this.state.value}
            />
            {this.state.error && <p>{this.state.error}</p>}
            <button className="button button_fluid">Add</button>
          </form>
          <button className="button button_pill button_fluid" onClick={() => this.setState({shown: false})}>Close</button>
        </Modal>
      </div>
    );
  }
}