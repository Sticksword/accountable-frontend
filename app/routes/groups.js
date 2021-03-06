import Authenticated from './authenticated';
// as to why we have this funky syntax, see https://github.com/ember-cli/ember-modules-codemod/pull/46
import { inject as service } from "@ember/service";
import { computed } from '@ember/object';

export default Authenticated.extend({
  simpleAuthManager: service(),

  permission: computed('simpleAuthManager.currentUser.user', function() {
    return this.get('simpleAuthManager').isAuthenticated();
  }),
});
