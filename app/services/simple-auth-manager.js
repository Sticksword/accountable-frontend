import Service from '@ember/service';
import { inject as service } from "@ember/service";

export default Service.extend({
  currentUser: null,
  ajax: service(),

  isAuthenticated() {
    return true;
    // if (this.get('currentUser').getUser() == null) {
    //   return false;
    // } else {
    //   return true;
    // }
  },

  authenticate(username, password) {
    let data = JSON.stringify({ "user": { "username": username, "password": password } });
    return this.get('ajax').request('http://8e7d4207.ngrok.io/api/session', {
      crossDomain: true,
      method: 'OPTIONS',
      contentType: "application/json;charset=UTF-8",
      data: { "user": { "username": username, "password": password } }
    }).then((result) => {
      this.set('currentUser', { username: username });
      this.notifyPropertyChange('simpleAuthManager.currentUser');
    });
  },

  // getToken() {
  //   const user = this.get('currentUser').getUser();
  //   if (user == null) {
  //     return '';
  //   } else {
  //     return user.auth_token;
  //   }
  // },

});
