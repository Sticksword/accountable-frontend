import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import { inject as service } from "@ember/service";

export default Route.extend({
  simpleAuthManager: service(),

  permission: computed('simpleAuthManager', function() {
    return this.get('simpleAuthManager').isAuthenticated();
  }),

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
      this.transitionTo('signin');
    }
  }
});
