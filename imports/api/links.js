import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import Schema from 'simpl-schema';
import shortid from 'shortid';

import '../startup/schema-config';

export const Links  = new Mongo.Collection('links');

if(Meteor.isServer) {
    Meteor.publish('links', function() {
        return Links.find({userId: this.userId});
    });
}

Meteor.methods({
 'links.create'(url) {
    if(!this.userId) {
      throw new Meteor.Error(402)
    }
    new Schema({
      url: {
        type: String,
        label: 'Your link',
        regEx: Schema.RegEx.Url
      }
    }).validate({url});
    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    })
 },
 'links.setVisibility'(id,visible) {
    if(!this.userId) {
      throw new Meteor.Error(402)
    }
    new Schema({
      id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({id,visible});
    Links.update(
      {
        _id: id,
        userId: this.userId
      },
      {
        $set: {
          visible
        }
      }
    );
  },
 'links.trackVisit'(id) {
   new Schema({
     id: {
       type: String,
       min: 1
     }
   }).validate({id});
   Links.update(
     {_id: id,userId: this.userId},
     {
       $set: {lastVisitedAt: new Date().getTime()},
       $inc: {visitedCount: 1}
     }
   )
 }
});