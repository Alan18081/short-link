import Schema from 'simpl-schema';
import {Meteor} from 'meteor/meteor';

Schema.defineValidationErrorTransform(({message}) => {
  return new Meteor.Error(400,message);
});