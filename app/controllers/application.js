import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from "@ember/service";

export default Controller.extend({
  simpleAuthManager: service(),

  isAuthenticated: computed('simpleAuthManager', function() {
    return this.get('simpleAuthManager').isAuthenticated();
  })
});
