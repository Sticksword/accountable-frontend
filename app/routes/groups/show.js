import Authenticated from '../authenticated';
import RSVP from 'rsvp';
import { A } from '@ember/array';
import { inject as service } from "@ember/service";
import Ember from 'ember';

export default Authenticated.extend({
  ajax: service(),

  model(params) {
    console.log(params.group_id);
    console.log(params);
    return { id: params.group_id };
    // return RSVP.hash({
      // group: this.get('store').findRecord('group', params.group_id ),
      // challenges: this.get('store').findAll('challenge', params.group_id)
      //   .query('challenge', {
      //   filter: {
      //     name: 'Peter'
      //   }
      // }).then(function(peters) {
      //   // Do something with `peters`
      // })

      // challenges: A([{
      //   id: 1,
      //   title: 'Partayyyy',
      //   start: new Date()
      // }])
    // });

  },

  afterModel(model, transition) {
    console.log('afterModel for show');
    console.log(model);
    // console.log(this.model);
    var url = 'http://e4105cf8.ngrok.io/api/groups/' + model.id + '/challenges';
    return this.get('ajax').request(url, {
      crossDomain: true,
      method: 'GET',
      contentType: "application/json;charset=UTF-8"
    }).then((results) => {
      console.log(results);
      Ember.set(model, 'challenges', results);
    });
  },

  actions: {
    verify: function(challenge) {
      console.log('hello world!');
    }
  }
});
