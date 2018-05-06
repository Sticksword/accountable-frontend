import Authenticated from '../authenticated';
import { inject as service } from "@ember/service";

export default Authenticated.extend({
  simpleAuthManager: service(),
  ajax: service(),

  model() {
    console.log(this.get('simpleAuthManager').currentUser);
    // return [{
    //   id: 1,
    //   title: 'Grand Old Mansion',
    //   owner: 'Veruca Salt',
    // }, {
    //   id: 2,
    //   title: 'Urban Living',
    //   owner: 'Mike TV',
    // }, {
    //   id: 3,
    //   title: 'Downtown Charm',
    //   owner: 'Violet Beauregarde',
    // }];
    // return this.get('store').query('group', {
    //   filter: {
    //     username: this.get('simpleAuthManager').currentUser
    //   }
    // }).then(function(groups) {
    //   // Do something with `peters`
    // });
    var url = 'http://e4105cf8.ngrok.io/api/users/' + this.get('simpleAuthManager').currentUser.user.id + '/groups';
    return this.get('ajax').request(url, {
      crossDomain: true,
      method: 'GET',
      contentType: "application/json;charset=UTF-8"
    }).then((results) => {
      console.log(results);
      return results;
    });
  }
});
