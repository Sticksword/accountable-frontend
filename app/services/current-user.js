import Service from '@ember/service';

export default Service.extend({
  user: null,

  updateUser(user) {
    this.set('user', user);
    // persist the user's browser so it can be retrieved on reload
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser() {
    const user = this.get('user');
    if (user) {
      return user;
    } else {
      // try to get the user from localStorage
      if (localStorage.user == null) {
        return null;
      } else {
        const foundUser = JSON.parse(localStorage.user);
        this.set('user', foundUser);
        return foundUser;
      }
    }
  },

  signOutUser() {
    this.set('user', null);
    localStorage.removeItem('user');
  }
});
