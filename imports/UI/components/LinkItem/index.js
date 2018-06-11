import React, {Component} from 'react';
import Clipboard from 'clipboard';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class LinkItem extends Component {
  state = {
    justCopied: false
  };
  copyBtn = React.createRef();
  componentDidMount() {
    this.clipboard = new Clipboard(this.copyBtn.current);
    this.clipboard.on('success', () => {
      this.setState({
        justCopied: true
      });
      setTimeout(() => {
        this.setState({
          justCopied: false
        });
      },500);
    });
    this.clipboard.on('error',() => {
      alert('Please, manually copy the link');
    });
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedLast = null;
    if(typeof this.props.lastVisitedAt === 'number') {
      visitedLast = `visited ${moment(this.props.lastVisitedAt).fromNow()}`;
    }
    return <p>{this.props.visitedCount} {visitMessage} ({visitedLast})</p>
  }
  render() {
    const {_id,url,shortUrl,visible} = this.props;
    return (
      <div className="link-item">
        <h3>{url}</h3>
        <p>{shortUrl}</p>
        {this.renderStats()}
        <a href={shortUrl} target="_blank" className="button button_pill">
          Visit
        </a>
        <button className="button button_pill" ref={this.copyBtn} data-clipboard-text={shortUrl}>
          {this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
        <button className="button button_pill" onClick={() => Meteor.call('links.setVisibility',_id,!visible)}>
          {visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
}

LinkItem.propTypes = {
  visible: PropTypes.bool.isRequired,
  shortUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

