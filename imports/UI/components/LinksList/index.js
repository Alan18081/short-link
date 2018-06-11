import React from 'react';
import {Meteor} from 'meteor/meteor';
import LinkItem from '../LinkItem';
import FlipMove from 'react-flip-move';

export default ({links}) => {
  let list = <p>Add some links</p>;
  if(links.length) {
    list = links.map(({url, _id, visible}) => {
      const shortUrl = Meteor.absoluteUrl(_id);
      return <LinkItem
        key={_id}
        shortUrl={shortUrl}
        visible={visible}
        url={url}
      />
    });
  }
  return (
    <FlipMove>
      {list}
    </FlipMove>
  );
};