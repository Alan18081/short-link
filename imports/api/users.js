import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import Schema from 'simpl-schema';

Accounts.validateNewUser(user => {
    const email = user.emails[0].address;
    try {
        new Schema({
            email: {
                type: String,
                regEx: SimpleSchema.RegEx.Email
            }
        }).validate({
            email
        });
    }
    catch(e) {
        throw new Meteor.Error(400,e.message);
    }
    return true;
});