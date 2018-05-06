import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  buttonText: computed('isAuthenticated', function() {
    return this.get('isAuthenticated') ? 'Sign Out' : 'Sign In';
  }),
});
