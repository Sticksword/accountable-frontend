import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default Route.extend({
  simpleAuthManager: service(),

  beforeModel() {
    this.get('simpleAuthManager').invalidate();
    this.notifyPropertyChange('simpleAuthManager.currentUser.user');
    this.transitionTo('/');
  }
});
