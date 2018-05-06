import Authenticated from './authenticated';
// as to why we have this funky syntax, see https://github.com/ember-cli/ember-modules-codemod/pull/46
import { inject as service } from "@ember/service";
import { computed } from '@ember/object';

export default Authenticated.extend({
  simpleAuthManager: service(),

  permission: computed('simpleAuthManager', function() {
    return this.get('simpleAuthManager').isAuthenticated();
  }),

  model() {
    console.log(this.get('simpleAuthManager').currentUser);
    return this.get('simpleAuthManager').currentUser;
  }
});
