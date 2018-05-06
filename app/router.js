import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('groups', function() {
    this.route('show', { path: '/:group_id' });
    this.route('new');
  });
  this.route('player-profile');
  this.route('signin');
});

export default Router;
