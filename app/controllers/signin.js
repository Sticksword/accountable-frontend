import Controller from '@ember/controller';
import { inject as service } from "@ember/service";

export default Controller.extend({
  simpleAuthManager: service(),
  username: null,
  password: null,

  actions: {
    signin: function() {
      const { username, password } = this.getProperties('username', 'password');
      this.get('simpleAuthManager').authenticate(username, password).then(() => {
        this.transitionToRoute('teams');
      }, (err) => {
        alert('Error obtaining token: ' + err.responseText);
      });
    }
  }
});
