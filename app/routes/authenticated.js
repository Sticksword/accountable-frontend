import Route from '@ember/routing/route';
import { computed } from '@ember/object';

export default Route.extend({
  permission: true,

  canAccessRoute: computed('permission', function() {
    return this.get('permission');
  }),

  beforeModel(transition) {
    if (this.get('canAccessRoute')) {
      // we are ok
      console.log('we are ok');
    } else {
      // we are not ok
      console.log('we are not ok');
      // this.transitionTo('login')
    }
  }
});
