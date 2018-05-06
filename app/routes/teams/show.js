import Authenticated from '../authenticated';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Authenticated.extend({
  model(params) {
    console.log(params.team_id);
    console.log(params);
    return RSVP.hash({
      team: this.get('store').query('team', { team_id: params.team_id }),
      challenges: A([{
        id: 1,
        title: 'Partayyyy',
        start: new Date()
      }])
    });
  },

  afterModel(params) {
    console.log(params);
  }
});
