import Authenticated from '../authenticated';
import { inject as service } from "@ember/service";

export default Authenticated.extend({
  simpleAuthManager: service(),

  model() {
    console.log(this.get('simpleAuthManager').currentUser);
    return [{
      id: 1,
      title: 'Grand Old Mansion',
      owner: 'Veruca Salt',
    }, {
      id: 2,
      title: 'Urban Living',
      owner: 'Mike TV',
    }, {
      id: 3,
      title: 'Downtown Charm',
      owner: 'Violet Beauregarde',
    }];
    // return this.get('store').query('group', {
    //   filter: {
    //     username: this.get('simpleAuthManager').currentUser
    //   }
    // }).then(function(groups) {
    //   // Do something with `peters`
    // });
  }
});
